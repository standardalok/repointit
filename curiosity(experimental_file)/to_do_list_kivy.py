from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.textinput import TextInput
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.popup import Popup
from kivy.properties import StringProperty
import json, os
from datetime import datetime
import calendar

SAVE_FILE = "tables_data.json"

def load_all_tables():
    if os.path.exists(SAVE_FILE):
        try:
            with open(SAVE_FILE, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_all_tables(data):
    with open(SAVE_FILE, "w") as f:
        json.dump(data, f, indent=4)

class TableScreen(BoxLayout):
    current_table = StringProperty("")
    all_tables = {}

    def __init__(self, **kwargs):
        super().__init__(orientation='vertical', **kwargs)
        self.all_tables = load_all_tables()
        self.build_controls()
        self.table_area = ScrollView(size_hint=(1, 1))
        self.add_widget(self.table_area)
        self.entries = {}
        self.current_data = {}

    def build_controls(self):
        control_bar = BoxLayout(size_hint_y=None, height=60)
        self.row_input = TextInput(hint_text="Enter row names (comma separated)")
        control_bar.add_widget(self.row_input)

        create_btn = Button(text="Create Table", on_press=self.create_table)
        control_bar.add_widget(create_btn)

        load_btn = Button(text="Load Table", on_press=self.load_table)
        control_bar.add_widget(load_btn)

        save_btn = Button(text="Save", on_press=self.save_progress)
        control_bar.add_widget(save_btn)

        add_row_btn = Button(text="Add Row", on_press=self.add_row)
        control_bar.add_widget(add_row_btn)

        add_col_btn = Button(text="Add Column", on_press=self.add_column)
        control_bar.add_widget(add_col_btn)

        self.add_widget(control_bar)

    def popup_input(self, title, callback):
        box = BoxLayout(orientation='vertical', padding=10)
        input_box = TextInput(multiline=False)
        box.add_widget(input_box)
        btn = Button(text="OK", size_hint_y=None, height=40)
        box.add_widget(btn)
        popup = Popup(title=title, content=box, size_hint=(0.7, 0.4))
        btn.bind(on_press=lambda *a: (popup.dismiss(), callback(input_box.text)))
        popup.open()

    def create_table(self, instance=None, restore_data=None):
        name = None
        if not restore_data:
            name = self.row_input.text.strip()
            if not name:
                return
            row_list = [r.strip() for r in name.split(",") if r.strip()]
            now = datetime.now()
            days_in_month = calendar.monthrange(now.year, now.month)[1]
            self.current_data = {"rows": row_list, "data": {}, "columns": days_in_month}
            self.current_table = f"Table_{len(self.all_tables)+1}"
            self.all_tables[self.current_table] = self.current_data
            save_all_tables(self.all_tables)
        else:
            self.current_data = restore_data

        # Build table
        grid = GridLayout(cols=self.current_data["columns"] + 1, size_hint_y=None)
        grid.bind(minimum_height=grid.setter('height'))
        self.entries = {}

        # Header
        grid.add_widget(Label(text=""))
        for day in range(1, self.current_data["columns"] + 1):
            grid.add_widget(Label(text=str(day), size_hint_y=None, height=30))

        # Rows
        for row_name in self.current_data["rows"]:
            grid.add_widget(Label(text=row_name))
            self.entries[row_name] = []
            for day in range(1, self.current_data["columns"] + 1):
                val = ""
                if row_name in self.current_data["data"] and str(day) in self.current_data["data"][row_name]:
                    val = self.current_data["data"][row_name][str(day)]
                e = TextInput(text=val, multiline=False)
                grid.add_widget(e)
                self.entries[row_name].append(e)

        # Total Row
        grid.add_widget(Label(text="Total", bold=True))
        self.entries["Total"] = []
        for day in range(1, self.current_data["columns"] + 1):
            val = ""
            if "Total" in self.current_data["data"] and str(day) in self.current_data["data"]["Total"]:
                val = self.current_data["data"]["Total"][str(day)]
            e = TextInput(text=val, multiline=False)
            grid.add_widget(e)
            self.entries["Total"].append(e)

        self.table_area.clear_widgets()
        self.table_area.add_widget(grid)

    def load_table(self, instance):
        if not self.all_tables:
            self.popup("No tables saved yet.")
            return
        self.popup_input("Enter table name to load", self.load_named_table)

    def load_named_table(self, name):
        if name not in self.all_tables:
            self.popup(f"No table named {name}")
            return
        self.current_table = name
        self.create_table(restore_data=self.all_tables[name])

    def save_progress(self, instance=None):
        if not self.current_table:
            self.popup("No table loaded.")
            return
        data = {}
        for name, row_entries in self.entries.items():
            d = {}
            for i, entry in enumerate(row_entries, start=1):
                val = entry.text.strip()
                if val:
                    d[str(i)] = val
            data[name] = d
        self.current_data["data"] = data
        self.all_tables[self.current_table] = self.current_data
        save_all_tables(self.all_tables)
        self.popup("Progress saved!")

    def add_row(self, instance):
        if not self.current_table:
            self.popup("Load or create a table first.")
            return
        self.popup_input("Enter new row name", self.do_add_row)

    def do_add_row(self, name):
        if not name:
            return
        if name in self.current_data["rows"]:
            self.popup("Row already exists.")
            return
        self.current_data["rows"].append(name)
        save_all_tables(self.all_tables)
        self.create_table(restore_data=self.current_data)

    def add_column(self, instance):
        if not self.current_table:
            self.popup("Load or create a table first.")
            return
        self.popup_input("Enter number of columns to add", self.do_add_column)

    def do_add_column(self, num):
        try:
            n = int(num)
        except:
            return
        self.current_data["columns"] += n
        save_all_tables(self.all_tables)
        self.create_table(restore_data=self.current_data)

    def popup(self, msg):
        Popup(title="Info", content=Label(text=msg), size_hint=(0.6, 0.4)).open()

class TableApp(App):
    def build(self):
        return TableScreen()

if __name__ == "__main__":
    TableApp().run()
