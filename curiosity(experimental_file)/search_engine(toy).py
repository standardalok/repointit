# simple_qt_browser.py
import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLineEdit, QToolBar, QAction
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl

class Browser(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Simple Qt Browser")
        self.resize(1024, 768)

        # Web view (the main browser area)
        self.view = QWebEngineView()
        self.setCentralWidget(self.view)

        # Toolbar with back, forward, reload, and address bar
        navtb = QToolBar("Navigation")
        self.addToolBar(navtb)

        back_btn = QAction("Back", self)
        back_btn.triggered.connect(self.view.back)
        navtb.addAction(back_btn)

        forward_btn = QAction("Forward", self)
        forward_btn.triggered.connect(self.view.forward)
        navtb.addAction(forward_btn)

        reload_btn = QAction("Reload", self)
        reload_btn.triggered.connect(self.view.reload)
        navtb.addAction(reload_btn)

        # Address bar
        self.urlbar = QLineEdit()
        self.urlbar.returnPressed.connect(self.navigate_to_url)
        navtb.addWidget(self.urlbar)

        # Update the address bar when URL changes (so you see the current URL)
        self.view.urlChanged.connect(self.update_urlbar)

        # Load a default page
        self.view.load(QUrl("https://google.com"))

    def navigate_to_url(self):
        q = QUrl(self.urlbar.text())
        if q.scheme() == "":
            q.setScheme("http")
        self.view.load(q)

    def update_urlbar(self, q):
        self.urlbar.setText(q.toString())

if __name__ == '__main__':
    app = QApplication(sys.argv)
    browser = Browser()
    browser.show()
    sys.exit(app.exec_())

