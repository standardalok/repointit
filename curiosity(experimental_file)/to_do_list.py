import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
from datetime import datetime
import calendar
import json
import os

SAVE_FILE = "tables_data.json"

def load_all_tables():
    """Load all saved tables from JSON file."""
    if os.path.exists(SAVE_FILE):
        try:
            with open(SAVE_FILE, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_all_tables():
    """Save all tables to disk."""
    try:
        with open(SAVE_FILE, "w") as f:
            json.dump(all_tables, f, indent=4)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to save tables:\n{e}")

def create_table(row_names, restore_data=None):
    """Draw a table in the UI."""
    global entries, row_list, days_in_month
    entries = []
    row_list = row_names

    for widget in canvas_frame.winfo_children():
        widget.destroy()

    now = datetime.now()
    year, month = now.year, now.month
    days_in_month = calendar.monthrange(year, month)[1]
    if restore_data and "columns" in restore_data:
        days_in_month = restore_data["columns"]

    # Header row
    tk.Label(canvas_frame, text="", bg="lightgray", font=('Arial', 10, 'bold'),
             borderwidth=1, relief="solid", width=12).grid(row=0, column=0)
    for day in range(1, days_in_month + 1):
        tk.Label(canvas_frame, text=str(day), bg="lightgray", font=('Arial', 10, 'bold'),
                 borderwidth=1, relief="solid", width=5).grid(row=0, column=day)

    # Main data rows
    for r, name in enumerate(row_names, start=1):
        tk.Label(canvas_frame, text=name, bg="#f0f0f0", font=('Arial', 10),
                 borderwidth=1, relief="solid", width=12).grid(row=r, column=0)
        row_entries = []
        for day in range(1, days_in_month + 1):
            e = tk.Entry(canvas_frame, width=5, justify="center")
            e.grid(row=r, column=day)
            if restore_data and name in restore_data.get("data", {}) and str(day) in restore_data["data"][name]:
                e.insert(0, restore_data["data"][name][str(day)])
            row_entries.append(e)
        entries.append(row_entries)

    # Total row
    total_row = len(row_names) + 1
    tk.Label(canvas_frame, text="Total", bg="lightgray", font=('Arial', 10, 'bold'),
             borderwidth=1, relief="solid", width=12).grid(row=total_row, column=0)
    total_entries = []
    for day in range(1, days_in_month + 1):
        e = tk.Entry(canvas_frame, width=5, justify="center")
        e.grid(row=total_row, column=day)
        if restore_data and "Total" in restore_data.get("data", {}) and str(day) in restore_data["data"]["Total"]:
            e.insert(0, restore_data["data"]["Total"][str(day)])
        total_entries.append(e)
    entries.append(total_entries)

    canvas.update_idletasks()
    canvas.config(scrollregion=canvas.bbox("all"))

def on_create_table():
    """Create new table with user-specified rows."""
    table_name = simpledialog.askstring("New Table", "Enter a name for this table:")
    if not table_name:
        return
    if table_name in all_tables:
        messagebox.showwarning("Exists", f"Table '{table_name}' already exists!")
        return
    rows_input = row_entry.get().strip()
    if not rows_input:
        return
    rows = [r.strip() for r in rows_input.split(",") if r.strip()]
    all_tables[table_name] = {"rows": rows, "data": {}, "columns": calendar.monthrange(datetime.now().year, datetime.now().month)[1]}
    save_all_tables()
    update_table_list()
    table_select.set(table_name)
    create_table(rows)

def on_load_table():
    """Load the selected table."""
    table_name = table_select.get()
    if not table_name or table_name not in all_tables:
        messagebox.showwarning("No Table", "Select a table to load.")
        return
    t = all_tables[table_name]
    create_table(t["rows"], restore_data=t)
    row_entry.delete(0, tk.END)
    row_entry.insert(0, ", ".join(t["rows"]))

def on_delete_table():
    """Delete selected table."""
    table_name = table_select.get()
    if not table_name or table_name not in all_tables:
        messagebox.showwarning("No Table", "Select a table to delete.")
        return
    if messagebox.askyesno("Delete Table", f"Are you sure you want to delete '{table_name}'?"):
        del all_tables[table_name]
        save_all_tables()
        update_table_list()
        for widget in canvas_frame.winfo_children():
            widget.destroy()
        messagebox.showinfo("Deleted", f"Table '{table_name}' deleted.")

def on_save_progress():
    """Save current table data."""
    table_name = table_select.get()
    if not table_name:
        messagebox.showwarning("No Table", "Please select or create a table first.")
        return

    data = {}
    for name, row_entries in zip(row_list + ["Total"], entries):
        d = {}
        for day in range(1, len(row_entries) + 1):
            v = row_entries[day - 1].get()
            if v:
                d[str(day)] = v
        data[name] = d

    all_tables[table_name] = {"rows": row_list, "data": data, "columns": len(entries[0])}
    save_all_tables()
    messagebox.showinfo("Saved", f"Progress for '{table_name}' saved successfully!")

def on_add_row():
    """Add a new row to the currently loaded table."""
    table_name = table_select.get()
    if not table_name or table_name not in all_tables:
        messagebox.showwarning("No Table", "Please load or create a table first.")
        return
    new_row = simpledialog.askstring("Add Row", "Enter new row name:")
    if not new_row:
        return

    # Add to table definition
    if new_row in all_tables[table_name]["rows"]:
        messagebox.showwarning("Exists", f"Row '{new_row}' already exists!")
        return

    all_tables[table_name]["rows"].append(new_row)
    save_all_tables()
    create_table(all_tables[table_name]["rows"], restore_data=all_tables[table_name])
    messagebox.showinfo("Added", f"Row '{new_row}' added to '{table_name}'.")

def on_add_column():
    """Add more columns (days) to the current table."""
    table_name = table_select.get()
    if not table_name or table_name not in all_tables:
        messagebox.showwarning("No Table", "Please load or create a table first.")
        return
    num = simpledialog.askinteger("Add Columns", "Enter number of new columns to add:", minvalue=1)
    if not num:
        return
    current_cols = all_tables[table_name].get("columns", calendar.monthrange(datetime.now().year, datetime.now().month)[1])
    new_cols = current_cols + num
    all_tables[table_name]["columns"] = new_cols
    save_all_tables()
    create_table(all_tables[table_name]["rows"], restore_data=all_tables[table_name])
    messagebox.showinfo("Added", f"{num} new columns added to '{table_name}'.")

def update_table_list():
    """Refresh dropdown list."""
    menu = table_menu["menu"]
    menu.delete(0, "end")
    for t in all_tables.keys():
        menu.add_command(label=t, command=lambda name=t: table_select.set(name))
    if all_tables:
        first = list(all_tables.keys())[0]
        table_select.set(first)
    else:
        table_select.set("")

# ---- Main window setup ----
root = tk.Tk()
root.title("Multi-Person Table Manager (with Add Row/Column Feature)")

entries, row_list, days_in_month = [], [], 0

# Load all saved tables
all_tables = load_all_tables()

# Controls
top_frame = tk.Frame(root)
top_frame.pack(pady=10)

tk.Label(top_frame, text="Enter row names (comma separated):").grid(row=0, column=0, padx=5)
row_entry = tk.Entry(top_frame, width=40)
row_entry.grid(row=0, column=1, padx=5)

tk.Button(top_frame, text="Create Table", command=on_create_table, bg="#4CAF50", fg="white").grid(row=0, column=2, padx=5)
tk.Button(top_frame, text="Save Progress", command=on_save_progress, bg="#2196F3", fg="white").grid(row=0, column=3, padx=5)

# Table selection
tk.Label(top_frame, text="Select Table:").grid(row=1, column=0, padx=5, pady=5)
table_select = tk.StringVar()
table_menu = ttk.OptionMenu(top_frame, table_select, None)
table_menu.grid(row=1, column=1, padx=5)
tk.Button(top_frame, text="Load Table", command=on_load_table).grid(row=1, column=2, padx=5)
tk.Button(top_frame, text="Delete Table", command=on_delete_table, bg="#f44336", fg="white").grid(row=1, column=3, padx=5)

# Add Row/Column buttons
tk.Button(top_frame, text="Add Row", command=on_add_row, bg="#FF9800", fg="white").grid(row=2, column=2, padx=5, pady=5)
tk.Button(top_frame, text="Add Column", command=on_add_column, bg="#9C27B0", fg="white").grid(row=2, column=3, padx=5, pady=5)

# Scrollable canvas area
table_outer = tk.Frame(root)
table_outer.pack(fill="both", expand=True, padx=10, pady=10)

canvas = tk.Canvas(table_outer)
canvas.pack(side="left", fill="both", expand=True)

y_scroll = tk.Scrollbar(table_outer, orient="vertical", command=canvas.yview)
y_scroll.pack(side="right", fill="y")
x_scroll = tk.Scrollbar(root, orient="horizontal", command=canvas.xview)
x_scroll.pack(side="bottom", fill="x")

canvas.configure(yscrollcommand=y_scroll.set, xscrollcommand=x_scroll.set)
canvas_frame = tk.Frame(canvas)
canvas.create_window((0, 0), window=canvas_frame, anchor="nw")

# Populate dropdown with existing tables
update_table_list()

root.mainloop()
