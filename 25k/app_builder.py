import customtkinter as ctk
import json
import os
from datetime import datetime

class NoteApp:
    def __init__(self, root):
        self.root = root
        self.root.title("CustomTkinter Notes")
        self.root.geometry("800x600")

        # Set appearance and theme
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")

        # File to store notes
        self.notes_file = "notes.json"
        self.notes = self.load_notes()
        self.current_note = None

        # Create UI
        self.create_ui()

    def create_ui(self):
        # Configure grid layout
        self.root.grid_columnconfigure(0, weight=1)
        self.root.grid_columnconfigure(1, weight=3)
        self.root.grid_rowconfigure(0, weight=1)

        # Create sidebar for note list
        self.sidebar = ctk.CTkFrame(master=self.root)
        self.sidebar.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

        # Configure sidebar grid
        self.sidebar.grid_columnconfigure(0, weight=1)
        self.sidebar.grid_rowconfigure(0, weight=0)  # Title
        self.sidebar.grid_rowconfigure(1, weight=0)  # New note button
        self.sidebar.grid_rowconfigure(2, weight=1)  # Note list

        # Sidebar title
        sidebar_title = ctk.CTkLabel(
            master=self.sidebar,
            text="Notes",
            font=("Helvetica", 20)
        )
        sidebar_title.grid(row=0, column=0, padx=10, pady=10)

        # New note button
        new_note_button = ctk.CTkButton(
            master=self.sidebar,
            text="New Note",
            command=self.new_note
        )
        new_note_button.grid(row=1, column=0, padx=10, pady=10, sticky="ew")

        # Note list (scrollable)
        self.note_list_frame = ctk.CTkScrollableFrame(
            master=self.sidebar,
            label_text="Your Notes"
        )
        self.note_list_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nsew")

        # Create main content area
        self.content = ctk.CTkFrame(master=self.root)
        self.content.grid(row=0, column=1, padx=10, pady=10, sticky="nsew")

        # Configure content grid
        self.content.grid_columnconfigure(0, weight=1)
        self.content.grid_rowconfigure(0, weight=0)  # Title input
        self.content.grid_rowconfigure(1, weight=1)  # Note content
        self.content.grid_rowconfigure(2, weight=0)  # Buttons

        # Note title input
        self.title_var = ctk.StringVar()
        self.title_entry = ctk.CTkEntry(
            master=self.content,
            placeholder_text="Note Title",
            textvariable=self.title_var,
            font=("Helvetica", 16),
            width=400
        )
        self.title_entry.grid(row=0, column=0, padx=20, pady=20, sticky="ew")

        # Note content textbox
        self.content_textbox = ctk.CTkTextbox(
            master=self.content,
            width=600,
            height=400,
            font=("Helvetica", 14)
        )
        self.content_textbox.grid(row=1, column=0, padx=20, pady=10, sticky="nsew")

        # Button frame
        button_frame = ctk.CTkFrame(master=self.content, fg_color="transparent")
        button_frame.grid(row=2, column=0, padx=20, pady=20, sticky="ew")

        # Save and delete buttons
        self.save_button = ctk.CTkButton(
            master=button_frame,
            text="Save",
            command=self.save_note,
            width=120
        )
        self.save_button.grid(row=0, column=0, padx=10, pady=10)

        self.delete_button = ctk.CTkButton(
            master=button_frame,
            text="Delete",
            command=self.delete_note,
            fg_color="#FF5555",
            hover_color="#AA3333",
            width=120
        )
        self.delete_button.grid(row=0, column=1, padx=10, pady=10)

        # Populate note list
        self.update_note_list()

        # Initially disable delete button if no note is selected
        self.delete_button.configure(state="disabled")

    def load_notes(self):
        if os.path.exists(self.notes_file):
            try:
                with open(self.notes_file, "r") as f:
                    return json.load(f)
            except:
                return {}
        return {}

    def save_notes_to_file(self):
        with open(self.notes_file, "w") as f:
            json.dump(self.notes, f, indent=4)

    def update_note_list(self):
        # Clear existing list
        for widget in self.note_list_frame.winfo_children():
            widget.destroy()

        # Add notes to list
        if not self.notes:
            no_notes_label = ctk.CTkLabel(
                master=self.note_list_frame,
                text="No notes yet",
                text_color="gray"
            )
            no_notes_label.pack(pady=10)
        else:
            for note_id, note in sorted(self.notes.items(), key=lambda x: x[1]["timestamp"], reverse=True):
                note_button = ctk.CTkButton(
                    master=self.note_list_frame,
                    text=note["title"] if note["title"] else "Untitled",
                    command=lambda id=note_id: self.load_note(id),
                    fg_color="transparent",
                    text_color=("black", "white"),
                    hover_color=("gray90", "gray20"),
                    anchor="w",
                    height=30
                )
                note_button.pack(pady=2, padx=5, fill="x")

    def new_note(self):
        # Clear inputs
        self.title_var.set("")
        self.content_textbox.delete("1.0", "end")

        # Create new note ID
        self.current_note = datetime.now().strftime("%Y%m%d%H%M%S")

        # Enable save button, disable delete button
        self.save_button.configure(state="normal")
        self.delete_button.configure(state="disabled")

    def load_note(self, note_id):
        if note_id in self.notes:
            self.current_note = note_id
            note = self.notes[note_id]

            # Set title and content
            self.title_var.set(note["title"])
            self.content_textbox.delete("1.0", "end")
            self.content_textbox.insert("1.0", note["content"])

            # Enable buttons
            self.save_button.configure(state="normal")
            self.delete_button.configure(state="normal")

    def save_note(self):
        if self.current_note:
            title = self.title_var.get()
            content = self.content_textbox.get("1.0", "end-1c")

            # Save to notes dictionary
            self.notes[self.current_note] = {
                "title": title,
                "content": content,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }

            # Save to file
            self.save_notes_to_file()

            # Update note list
            self.update_note_list()

            # Enable delete button
            self.delete_button.configure(state="normal")

    def delete_note(self):
        if self.current_note and self.current_note in self.notes:
            # Remove from dictionary
            del self.notes[self.current_note]

            # Save to file
            self.save_notes_to_file()

            # Update note list
            self.update_note_list()

            # Clear inputs and disable buttons
            self.title_var.set("")
            self.content_textbox.delete("1.0", "end")
            self.current_note = None
            self.save_button.configure(state="disabled")
            self.delete_button.configure(state="disabled")

if __name__ == "__main__":
    app = ctk.CTk()
    note_app = NoteApp(app)
    app.mainloop()