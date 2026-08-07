import tkinter as tk
root = tk.Tk()
root.title('Application Title')
root.geometry('800x600+100+50') # WxH+X+Y (X,Y = screen offset)
root.minsize(300, 200) # minimum resize limit
root.maxsize(1920, 1080) # maximum resize limit
root.resizable(True, False) # resizable(width, height)
root.configure(bg='#1a1a2e') # background colour
root.attributes('-alpha', 0.95) # window transparency (0.0–1.0)
root.attributes('-fullscreen', False)
root.attributes('-topmost', True) # always on top
root.mainloop()
