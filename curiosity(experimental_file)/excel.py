import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import csv

class SpreadsheetApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Spreadsheet App")
        self.root.geometry("1000x600")
        
        # High contrast color scheme
        self.bg_color = "#1a1a2e"
        self.fg_color = "#eee"
        self.cell_bg = "#16213e"
        self.cell_fg = "#fff"
        self.header_bg = "#0f3460"
        self.header_fg = "#fff"
        self.selected_bg = "#e94560"
        self.button_bg = "#533483"
        self.button_fg = "#fff"
        
        self.root.configure(bg=self.bg_color)
        
        self.rows = 30
        self.cols = 15
        self.cells = {}
        self.cell_data = {}
        
        self.create_menu()
        self.create_toolbar()
        self.create_spreadsheet()
        
    def create_menu(self):
        menubar = tk.Menu(self.root, bg=self.header_bg, fg=self.header_fg)
        self.root.config(menu=menubar)
        
        file_menu = tk.Menu(menubar, tearoff=0, bg=self.cell_bg, fg=self.cell_fg)
        menubar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="New", command=self.new_file)
        file_menu.add_command(label="Open", command=self.open_file)
        file_menu.add_command(label="Save", command=self.save_file)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self.root.quit)
        
        edit_menu = tk.Menu(menubar, tearoff=0, bg=self.cell_bg, fg=self.cell_fg)
        menubar.add_cascade(label="Edit", menu=edit_menu)
        edit_menu.add_command(label="Clear All", command=self.clear_all)
        
    def create_toolbar(self):
        toolbar = tk.Frame(self.root, bg=self.bg_color, pady=5)
        toolbar.pack(side=tk.TOP, fill=tk.X)
        
        tk.Button(toolbar, text="New", command=self.new_file, 
                 bg=self.button_bg, fg=self.button_fg, padx=10).pack(side=tk.LEFT, padx=5)
        tk.Button(toolbar, text="Open", command=self.open_file, 
                 bg=self.button_bg, fg=self.button_fg, padx=10).pack(side=tk.LEFT, padx=5)
        tk.Button(toolbar, text="Save", command=self.save_file, 
                 bg=self.button_bg, fg=self.button_fg, padx=10).pack(side=tk.LEFT, padx=5)
        tk.Button(toolbar, text="Clear", command=self.clear_all, 
                 bg=self.button_bg, fg=self.button_fg, padx=10).pack(side=tk.LEFT, padx=5)
        
    def create_spreadsheet(self):
        container = tk.Frame(self.root, bg=self.bg_color)
        container.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        canvas = tk.Canvas(container, bg=self.bg_color, highlightthickness=0)
        scrollbar_y = tk.Scrollbar(container, orient=tk.VERTICAL, command=canvas.yview)
        scrollbar_x = tk.Scrollbar(container, orient=tk.HORIZONTAL, command=canvas.xview)
        
        scrollable_frame = tk.Frame(canvas, bg=self.bg_color)
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar_y.set, xscrollcommand=scrollbar_x.set)
        
        # Column headers
        tk.Label(scrollable_frame, text="", bg=self.header_bg, fg=self.header_fg, 
                width=5, height=2, relief=tk.RAISED).grid(row=0, column=0, sticky="nsew")
        
        for col in range(self.cols):
            header = chr(65 + col) if col < 26 else chr(64 + col // 26) + chr(65 + col % 26)
            tk.Label(scrollable_frame, text=header, bg=self.header_bg, fg=self.header_fg,
                    width=12, height=2, relief=tk.RAISED, font=("Arial", 10, "bold")).grid(
                        row=0, column=col+1, sticky="nsew")
        
        # Row headers and cells
        for row in range(self.rows):
            tk.Label(scrollable_frame, text=str(row+1), bg=self.header_bg, fg=self.header_fg,
                    width=5, height=1, relief=tk.RAISED, font=("Arial", 10, "bold")).grid(
                        row=row+1, column=0, sticky="nsew")
            
            for col in range(self.cols):
                cell = tk.Entry(scrollable_frame, bg=self.cell_bg, fg=self.cell_fg,
                              insertbackground=self.cell_fg, width=12,
                              relief=tk.SOLID, borderwidth=1, font=("Arial", 10))
                cell.grid(row=row+1, column=col+1, sticky="nsew", padx=1, pady=1)
                self.cells[(row, col)] = cell
                
                cell.bind("<FocusIn>", lambda e, r=row, c=col: self.on_focus(r, c))
                cell.bind("<FocusOut>", lambda e, r=row, c=col: self.on_focus_out(r, c))
        
        scrollbar_y.pack(side=tk.RIGHT, fill=tk.Y)
        scrollbar_x.pack(side=tk.BOTTOM, fill=tk.X)
        canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
    def on_focus(self, row, col):
        self.cells[(row, col)].config(bg=self.selected_bg, fg="#fff")
        
    def on_focus_out(self, row, col):
        self.cells[(row, col)].config(bg=self.cell_bg, fg=self.cell_fg)
        self.cell_data[(row, col)] = self.cells[(row, col)].get()
        
    def new_file(self):
        if messagebox.askyesno("New File", "Clear all data and start new?"):
            self.clear_all()
            
    def clear_all(self):
        for cell in self.cells.values():
            cell.delete(0, tk.END)
        self.cell_data.clear()
        
    def save_file(self):
        filename = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("CSV files", "*.csv"), ("All files", "*.*")]
        )
        if filename:
            try:
                with open(filename, 'w', newline='') as f:
                    writer = csv.writer(f)
                    for row in range(self.rows):
                        row_data = []
                        for col in range(self.cols):
                            row_data.append(self.cells[(row, col)].get())
                        writer.writerow(row_data)
                messagebox.showinfo("Success", "File saved successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to save file: {str(e)}")
                
    def open_file(self):
        filename = filedialog.askopenfilename(
            filetypes=[("CSV files", "*.csv"), ("All files", "*.*")]
        )
        if filename:
            try:
                self.clear_all()
                with open(filename, 'r') as f:
                    reader = csv.reader(f)
                    for row_idx, row_data in enumerate(reader):
                        if row_idx >= self.rows:
                            break
                        for col_idx, value in enumerate(row_data):
                            if col_idx >= self.cols:
                                break
                            self.cells[(row_idx, col_idx)].insert(0, value)
                messagebox.showinfo("Success", "File loaded successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to open file: {str(e)}")

if __name__ == "__main__":
    root = tk.Tk()
    app = SpreadsheetApp(root)
    root.mainloop()