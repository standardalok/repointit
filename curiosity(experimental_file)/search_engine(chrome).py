import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtGui import *

class BrowserTab(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("https://www.google.com"))
        
        layout = QVBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.addWidget(self.browser)
        self.setLayout(layout)

class ChromeBrowser(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chrome Browser")
        self.setWindowIcon(QIcon.fromTheme("web-browser"))
        self.showMaximized()
        
        # Tab widget
        self.tabs = QTabWidget()
        self.tabs.setDocumentMode(True)
        self.tabs.setTabsClosable(True)
        self.tabs.setMovable(True)
        self.tabs.tabCloseRequested.connect(self.close_tab)
        self.tabs.currentChanged.connect(self.current_tab_changed)
        
        self.setCentralWidget(self.tabs)
        
        # Navigation bar
        self.create_navigation_bar()
        
        # Status bar
        self.status = QStatusBar()
        self.setStatusBar(self.status)
        
        # Add first tab
        self.add_new_tab(QUrl("https://www.google.com"), "Home")
        
        # Shortcuts
        QShortcut(QKeySequence("Ctrl+T"), self, self.add_new_tab)
        QShortcut(QKeySequence("Ctrl+W"), self, lambda: self.close_tab(self.tabs.currentIndex()))
        QShortcut(QKeySequence("Ctrl+R"), self, self.reload_page)
        QShortcut(QKeySequence("Ctrl+L"), self, lambda: self.url_bar.setFocus())
        QShortcut(QKeySequence("F11"), self, self.toggle_fullscreen)
        
    def create_navigation_bar(self):
        navbar = QToolBar("Navigation")
        navbar.setIconSize(QSize(20, 20))
        navbar.setMovable(False)
        self.addToolBar(navbar)
        
        # Back button
        back_btn = QAction(QIcon.fromTheme("go-previous", QIcon("⬅")), "Back", self)
        back_btn.triggered.connect(lambda: self.current_browser().back())
        navbar.addAction(back_btn)
        
        # Forward button
        forward_btn = QAction(QIcon.fromTheme("go-next", QIcon("➡")), "Forward", self)
        forward_btn.triggered.connect(lambda: self.current_browser().forward())
        navbar.addAction(forward_btn)
        
        # Reload button
        reload_btn = QAction(QIcon.fromTheme("view-refresh", QIcon("⟳")), "Reload", self)
        reload_btn.triggered.connect(self.reload_page)
        navbar.addAction(reload_btn)
        
        # Home button
        home_btn = QAction(QIcon.fromTheme("go-home", QIcon("🏠")), "Home", self)
        home_btn.triggered.connect(self.navigate_home)
        navbar.addAction(home_btn)
        
        navbar.addSeparator()
        
        # URL bar
        self.url_bar = QLineEdit()
        self.url_bar.setPlaceholderText("Search Google or type a URL")
        self.url_bar.returnPressed.connect(self.navigate_to_url)
        self.url_bar.setStyleSheet("""
            QLineEdit {
                padding: 8px;
                border: 2px solid #e0e0e0;
                border-radius: 20px;
                font-size: 14px;
            }
            QLineEdit:focus {
                border: 2px solid #4285f4;
            }
        """)
        navbar.addWidget(self.url_bar)
        
        navbar.addSeparator()
        
        # New tab button
        new_tab_btn = QAction(QIcon.fromTheme("tab-new", QIcon("+")), "New Tab", self)
        new_tab_btn.triggered.connect(lambda: self.add_new_tab())
        navbar.addAction(new_tab_btn)
        
        # Bookmarks button
        bookmark_btn = QAction(QIcon.fromTheme("bookmark-new", QIcon("⭐")), "Bookmark", self)
        bookmark_btn.triggered.connect(self.add_bookmark)
        navbar.addAction(bookmark_btn)
        
        # Downloads button
        downloads_btn = QAction(QIcon.fromTheme("folder-download", QIcon("⬇")), "Downloads", self)
        downloads_btn.triggered.connect(self.show_downloads)
        navbar.addAction(downloads_btn)
        
        # Menu button
        menu_btn = QAction(QIcon.fromTheme("application-menu", QIcon("☰")), "Menu", self)
        menu_btn.triggered.connect(self.show_menu)
        navbar.addAction(menu_btn)
        
    def current_browser(self):
        if self.tabs.count() > 0:
            return self.tabs.currentWidget().browser
        return None
        
    def add_new_tab(self, qurl=None, label="New Tab"):
        if qurl is None:
            qurl = QUrl("https://www.google.com")
        elif isinstance(qurl, str):
            qurl = QUrl(qurl)
            
        tab = BrowserTab(self)
        browser = tab.browser
        
        i = self.tabs.addTab(tab, label)
        self.tabs.setCurrentIndex(i)
        
        browser.urlChanged.connect(lambda qurl, browser=browser: self.update_url(qurl, browser))
        browser.loadFinished.connect(lambda _, i=i, browser=browser: 
                                     self.tabs.setTabText(i, browser.page().title()[:20]))
        browser.loadProgress.connect(self.update_progress)
        browser.loadStarted.connect(lambda: self.status.showMessage("Loading..."))
        browser.loadFinished.connect(lambda: self.status.showMessage("Ready", 2000))
        
        if qurl:
            browser.setUrl(qurl)
            
    def close_tab(self, i):
        if self.tabs.count() > 1:
            self.tabs.removeTab(i)
        else:
            self.close()
            
    def current_tab_changed(self, i):
        if i >= 0:
            browser = self.current_browser()
            if browser:
                self.update_url(browser.url(), browser)
                self.setWindowTitle(f"{browser.page().title()} - Chrome Browser")
                
    def navigate_to_url(self):
        url = self.url_bar.text()
        
        if not url.startswith("http://") and not url.startswith("https://"):
            if "." in url and " " not in url:
                url = "https://" + url
            else:
                url = "https://www.google.com/search?q=" + url.replace(" ", "+")
                
        browser = self.current_browser()
        if browser:
            browser.setUrl(QUrl(url))
            
    def update_url(self, qurl, browser=None):
        if browser != self.current_browser():
            return
        self.url_bar.setText(qurl.toString())
        self.url_bar.setCursorPosition(0)
        
    def navigate_home(self):
        browser = self.current_browser()
        if browser:
            browser.setUrl(QUrl("https://www.google.com"))
            
    def reload_page(self):
        browser = self.current_browser()
        if browser:
            browser.reload()
            
    def update_progress(self, progress):
        self.status.showMessage(f"Loading... {progress}%")
        
    def add_bookmark(self):
        browser = self.current_browser()
        if browser:
            url = browser.url().toString()
            title = browser.page().title()
            QMessageBox.information(self, "Bookmark Added", 
                                   f"Bookmarked: {title}\n{url}")
            
    def show_downloads(self):
        QMessageBox.information(self, "Downloads", "Downloads folder will open here")
        
    def show_menu(self):
        menu = QMenu(self)
        menu.setStyleSheet("""
            QMenu {
                background-color: white;
                border: 1px solid #ccc;
                padding: 5px;
            }
            QMenu::item {
                padding: 8px 30px;
            }
            QMenu::item:selected {
                background-color: #f0f0f0;
            }
        """)
        
        new_window = menu.addAction("New Window")
        new_window.triggered.connect(lambda: ChromeBrowser().show())
        
        new_incognito = menu.addAction("New Incognito Window")
        
        menu.addSeparator()
        
        history = menu.addAction("History")
        downloads = menu.addAction("Downloads")
        bookmarks = menu.addAction("Bookmarks")
        
        menu.addSeparator()
        
        settings = menu.addAction("Settings")
        help_action = menu.addAction("Help")
        
        menu.addSeparator()
        
        exit_action = menu.addAction("Exit")
        exit_action.triggered.connect(self.close)
        
        menu.exec_(QCursor.pos())
        
    def toggle_fullscreen(self):
        if self.isFullScreen():
            self.showMaximized()
        else:
            self.showFullScreen()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setApplicationName("Chrome Browser")
    app.setStyle("Fusion")
    
    # Set Chrome-like color palette
    palette = QPalette()
    palette.setColor(QPalette.Window, QColor(255, 255, 255))
    palette.setColor(QPalette.WindowText, QColor(0, 0, 0))
    app.setPalette(palette)
    
    browser = ChromeBrowser()
    browser.show()
    sys.exit(app.exec_())