---
title: tkinter学习笔记
date: 2019-05-11 14:28:52
tags:
  - tkinter
  - python
---

## tkinter 可以使用的颜色

<div align=center>
<img src = "tkinter学习笔记/color.png" width=600 height=300>
</div>


## tkinter python（图形开发界面）
Tkinter 是 Python 的标准 GUI 库。Python 使用 Tkinter 可以快速的创建 GUI 应用程序。Tk和Tkinter可以在大多数的Unix平台下使用，同样可以应用在Windows和Macintosh系统里。由于 Tkinter 是内置到 python 的安装包中、只要安装好 Python 之后就能 import Tkinter 库、而且 IDLE 也是用 Tkinter 编写而成、对于简单的图形界面 Tkinter 还是能应付自如。
``` bash
#!/usr/bin/python
# -*- coding: UTF-8 -*-
import tkinter as tk
top = tk.Tk()
# 进入消息循环
top.mainloop()
```

## tkinter 常用控件

• tk.Tk()  
• tk.Lable()   
• tk.button()   
• tk.Entry()  
• tk.Text()  
• tk.Radiobutton()  
• tk.Scale()  
• tk.Canvas()  

### 标签
可以显示文本和位图

### 按键
按钮组件用于在 Python 应用程序中添加按钮，按钮上可以放上文本或图像，按钮可用于监听用户行为，能够与一个 Python 函数关联，当按钮被按下时，自动调用该函数。
``` bash
windows = tk.Tk()
windows.title('hello')
windows.geometry('200x100')

var = tk.StringVar()
lable = tk.Label(windows, textvariable=var, bg='green', font=('Arial', 15), width=15, height=2)
lable.pack()

on_hit = False
def hit_me():
    global on_hit
    if on_hit == False:
        var.set('u hit me')
        on_hit = True
    else:
        on_hit = False
        var.set('')

button = tk.Button(windows, text='hit me', command=hit_me, width=15, height=2)
button.pack()

windows.mainloop()
```

### 画布
``` bash
windows = tk.Tk()
windows.title('hey')
windows.geometry("200x200")

convas = tk.Canvas(windows, bg='blue', height=100, width=200).pack()
image_file = tk.PhotoImage(file='ins.gif')
image = canvas.creat_image(10, 10, anchor='nw', image=image_file)
def hi():
    pass

button = tk.Button(windows, text='hi', command=hi).pack()

windows.mainloop()
```
### 弹窗



* Python Tkinter教程（GUI图形界面开发教程） </br>http://c.biancheng.net/python/tkinter/
* Tkinter GUI 教程系列 | 莫烦Python </br>https://morvanzhou.github.io/tutorials/python-basic/tkinter/