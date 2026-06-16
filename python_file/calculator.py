import customtkinter as ctk

app=ctk.CTk()
app.title("calculator")
app.geometry("500x600")

def button_click():
    print("button clicked")


result_frame=ctk.CTkFrame(
    app,
    width=480,
    height=170,
    corner_radius=10,
    border_width=2
    )
result_frame.pack(pady=5,side="top",anchor="n")

button_frame=ctk.CTkFrame(
    app,
    width=480,
    height=410,
    corner_radius=10,
    border_width=2
)
button_frame.pack(pady=10,side="bottom")

button1=ctk.CTkButton(
    )


app.mainloop()
