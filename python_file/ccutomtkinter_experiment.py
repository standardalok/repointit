import customtkinter as ctk

app = ctk.CTk()
app.title("Responsive Layout")
app.geometry("600x400")


for i in range(3):
    for j in range(3):
        button = ctk.CTkButton(app, text=f"Button {i},{j}")
        button.grid(row=i, column=j, padx=5, pady=5, sticky="nsew")

# Configure grid weights to make it responsive
for i in range(3):
    app.grid_columnconfigure(i, weight=1)
    app.grid_rowconfigure(i, weight=1)

app.mainloop()