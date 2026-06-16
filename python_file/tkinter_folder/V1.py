from tkinter import *

window=Tk()#window creation

#---------#window edition section----------
window.geometry("800x500+100+100")
icon=PhotoImage(file="D:\\Coding\\python_file\\tkinter_folder\\a1.png")
window.iconphoto(True,icon)
window.title("Calculator By Alok")
window.config(bg="#bf2a45")
window.resizable(False,True)
#---------#window edition section----------

#---------experiment---------------------#
def creation_of_button():
    for i in range(0,9):
        number=str(i)
        button=Button(window,text="button"+number,width=10,height=2)
        for j in range(3):
            for w in range(3):
                print("empty")
        button.grid(column=j,row=w)
#---------experiment---------------------#
#-------frame creation--------------------#
f1=Frame(
    window,
    width=500,
    height=100)
f1.pack()
f2=Frame(
    window,
    bd=10,
    width=500,
    height=700)
f2.pack(fill=BOTH)
#-------frame creation--------------------#

#--------creation_of_button()-------------#

entry=Entry(f1,text="Entry",width=80,font=("Arial",40),bd=10)
entry.pack()

button1=Button(f2,text="hello this is 1",width=15,height=7,font=("Lucida Console",9),overrelief="ridge",activebackground="purple",activeforeground="white",cursor="hand2")
button1.grid(column=1,row=1)

button2=Button(f2,text="Button2",width=15,height=7,font=("Lucida Console",9),overrelief="flat",activebackground="purple",activeforeground="white",cursor="dot")
button2.grid(column=2,row=1)

button3=Button(f2,text="Button3",width=15,height=7,font=("Lucida Console",9),overrelief="groove",activebackground="purple",activeforeground="white",cursor="dot")
button3.grid(column=3,row=1)

button4=Button(f2,text="Button4",width=15,height=7,font=("Lucida Console",9),overrelief="sunken",activebackground="purple",activeforeground="white",cursor="dot")
button4.grid(column=1,row=2)

button5=Button(f2,text="Button5",width=15,height=7,font=("Lucida Console",9),overrelief="solid",activebackground="purple",activeforeground="white",cursor="dot")
button5.grid(column=2,row=2)

button6=Button(f2,text="Button6",width=15,height=7,font=("Lucida Console",9),overrelief="raised",activebackground="purple",activeforeground="white",cursor="dot")
button6.grid(column=3,row=2)

button7=Button(f2,text="Button7",width=15,height=7,font=("Lucida Console",9),overrelief="groove",activebackground="purple",activeforeground="white",cursor="dot")
button7.grid(column=1,row=3)

button8=Button(f2,text="Button8",width=15,height=7,font=("Lucida Console",9),overrelief="groove",activebackground="purple",activeforeground="white",cursor="dot")
button8.grid(column=2,row=3)

button9=Button(f2,text="Button9",width=15,height=7,font=("Lucida Console",9),overrelief="groove",activebackground="purple",activeforeground="white",cursor="dot")
button9.grid(column=3,row=3)
#--------creation_of_button()-------------#


window.mainloop()#window loop ends
