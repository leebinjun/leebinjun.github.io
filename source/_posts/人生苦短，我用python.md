---
title: 人生苦短，我用python
date: 2019-05-16 23:56:01
tags:
  - python
  - jupyter notebook
---
** {{ title }} ** <Excerpt in index | 首页摘要>

Life is short, you need Python 
1989 年，为了打发无所事事的圣诞节假期，Guido 开始写 Python 语言的编译/解释器，Python这个名字来自他所喜欢的电视剧 Monty Python's Flying Circus (一部情景幽默剧)。两年后，Python 第一个版本终于问世。

<!-- more -->
<The rest of contents | 余下全文>

使用conda创建python虚拟环境  
``` bash
> conda create -n your_env_name python=3.6
> activate your_env_name
```

在win10的powershell中无法使用activate指令激活环境，需要进入到cmd中激活环境后再使用vscode打开工作区 
``` bash
> conda env list
> activate py38
(py38) > code C:\my-workplace
```


## 迭代器
迭代器（iterator）是一种对象，它能够用来遍历标准模板库容器中的部分或全部元素，每个迭代器对象代表容器中的确定的地址。

``` python
i = iter(range(10))
next(i)
```
我们简单说迭代器就是访问集合元素，迭代器就是有一个next()方法的对象，而不是通过索引来计数的。

### yield

以生产者消费者模式为例
``` python
def consume():
    while True:
        # consumr协程等待接受数据
        number = yield
        print("开始消费", number)

consumer = consume()
# 让初始化状态的协程先执行起来，在yield处停止
next(consumer)

for num in range(100):
    print("开始生产", num)
    # 发送数据给consumer协程
    consumer.send(num)
```
当协程执行到yield关键字时，会暂停在那一行，等到主线程调用send方法发送了数据，协程才会接到数据继续执行。但是，yield让协程暂停，和线程的阻塞是有本质区别的。协程的暂停完全由程序控制，线程的阻塞状态是由操作系统内核来进行切换。因此，协程的开销远远小于线程的开销。  

* 漫画：什么是协程？  
http://www.sohu.com/a/237171690_465221




## test
Q1: 计算一年的第几天
``` python
import datetime
res = datetime.date(year, month, day) - datetime.date(year-1, 12, 31)
```

Q2: 找最小数
``` python
alist = list(map(int, input().split()))
res = min(alist)
```

Q3: 大于平均值的数的和
``` python
res = sum([i for i in alist if i > sum(alist)/len(alist)])
```

Q4: 数列求和
``` python
res = sum([1/(i*2) for i in range(1, n)])
```




## 云服务器运行Jupyter Notebook

配置云服务器的安全组  
控制台>轻量应用服务器>服务器列表>Ubuntu>安全>防火墙>添加规则

|应用类型 | 协议 | 端口范围 |
|:---------|:--------------------|:----------------|
|自定义 | TCP | 8888/8890 |

安装Jupyter
``` bash
$ apt-get update
$ sudo apt install jupyter-notebook
$ apt-get install python3-pip
$ pip3 install --upgrade pip
$ pip3 install jupyter
```
创建Jupyter默认配置文件
``` bash
$ jupyter notebook --generate-config
```
生成SHA1加密的密钥，保存密钥，如'sha1:XXXXXX'
``` bash
$ python
>>> from notebook.auth import passwd 
>>> passwd()
```
设置密钥，修改配置文件
``` bash
$ sudo vim ~/.jupyter/jupyter_notebook_config.py

    c.NotebookApp.allow_remote_access = True
    c.NotebookApp.ip = '*'
    c.NotebookApp.open_browser = False
    c.NotebookApp.password = u'sha1:XXXXXX'
    c.NotebookApp.port = 8888
```
启动Jupter notebook
``` bash
$ jupyter notebook --ip=0.0.0.0 --no-browser --allow-root
```

## 一些加速技巧

加速查找  
``` python
data = (i**2+1 for i in range(1000000))
%%time
list_data = list(data)
4535251 in list_data

%%time
set_data = set(data)
4535251 in set_data
```

加速函数  
``` python
%%time
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
fib(30)
```
大量重复计算，时间复杂度为$O(2^n)$  
* 用缓存机制加速递归函数  
``` python
%%time
from functools import lru_cache
@lru_cache(100)
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
fib(30)
```
* 用循环机制代替递归函数  
``` python
%%time
def fib(n):
    if n in (1,2):
        return n
    a, b = 1, 1
    for i in range(2,n):
        a, b = b, a+b
    return b
fib(30)
```
* 使用map代替推导式进行加速  
``` python 
%%time
alist = [i**2 for i in range(1000)]
%%time
alist = map(lambda x: x**2, range(1000))
```
* 使用filter代替推导式进行加速  
``` python 
%%time
alist = [i for i in range(1000) if i%7==0]
%%time
alist = filter(lambda x: x%7==0, range(1000))
```

使用np.where代替if  
``` python
%%time
relu = lambda x:np.where(x>0, x, 0)
array_b = relu(array_a)
```

应用多线程加速IO密集型任务  
应用多进程加速CPU密集型任务  




### 

* 03-用Jupyter编写数学公式 - ds19991999的博客 - CSDN博客  
https://blog.csdn.net/ds19991999/article/details/81275580





### numpy

布尔矩阵转0/1矩阵
``` python
import numpy as np
import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data

# 载入数据集
mnist = input_data.read_data_sets("MNIST_data", one_hot = True) 

A =  mnist.train.images[1]
# 得到布尔矩阵
B = (A==0)
# 法1：布尔矩阵转0/1矩阵
C= B.astype(int)
# 法2：布尔矩阵转0/1矩阵
C = B+0
```


## 一些奇淫巧技

*  print 打印带有颜色的信息
``` python
# 从colorama中导入init，使显示颜色生效
from colorama import init
init(autoreset=True)

print(esc('0;31;40') + 'Error:'+esc() + 'important')
def esc(code=0):
    return f'\033[{code}m'
def print_color(str='', color='0;37;40'):
    print(esc(color) + str + esc(), end='')

print_color('Error:', color='0;31;40')
print('important')
```
可以设置的参数
``` txt
-------------------------------------------
-------------------------------------------
字体色     |       背景色     |      颜色描述
-------------------------------------------
30        |        40       |       黑色
31        |        41       |       红色
32        |        42       |       绿色
33        |        43       |       黃色
34        |        44       |       蓝色
35        |        45       |       紫红色
36        |        46       |       青蓝色
37        |        47       |       白色
-------------------------------------------
-------------------------------
显示方式     |      效果
-------------------------------
0           |     终端默认设置
1           |     高亮显示
4           |     使用下划线
5           |     闪烁
7           |     反白显示
8           |     不可见
-------------------------------

e.g.
print('\033[1;35;0m字体变色，但无背景色 \033[0m')  # 有高亮 或者 print('\033[1;35m字体有色，但无背景色 \033[0m')
print('\033[1;45m 字体不变色，有背景色 \033[0m')  # 有高亮
print('\033[1;35;46m 字体有色，且有背景色 \033[0m')  # 有高亮
print('\033[0;35;46m 字体有色，且有背景色 \033[0m')  # 无高亮
```

* 实现一个进度条
``` python
from time import sleep

def progress(percent=0, width=30):
    left = width * percent // 100
    right = width - left
    print('\r[', '#' * left, ' ' * right, ']',
          f' {percent:.0f}%',
          sep='', end='', flush=True)

for i in range(101):
    progress(i)
    sleep(0.1)
```


## python3.8 里的一些功能

* f-string里的'='
``` python
a = 5
print(f"{a=}")
```

*  海象运算符:=
赋值的时候同时可以进行运算





## 《Effective Python：编写高质量Python代码的59个有效方法》

本书赞誉
译者序
前　　言
致　　谢
第1章　用Pythonic方式来思考 1
第1条：确认自己所用的Python版本 1
第2条：遵循PEP 8风格指南 3
第3条：了解bytes、str与unicode的区别 5
第4条：用辅助函数来取代复杂的表达式 8
第5条：了解切割序列的办法 10
第6条：在单次切片操作内，不要同时指定start、end和stride 13
第7条：用列表推导来取代map和f?ilter 15
第8条：不要使用含有两个以上表达式的列表推导 16
第9条：用生成器表达式来改写数据量较大的列表推导 18
第10条：尽量用enumerate取代range 20
第11条：用zip函数同时遍历两个迭代器 21
第12条：不要在for和while循环后面写else块 23
第13条：合理利用try/except/else/f?inally结构中的每个代码块 25
第2章　函数 28
第14条：尽量用异常来表示特殊情况，而不要返回None 28
第15条：了解如何在闭包里使用外围作用域中的变量 30
第16条：考虑用生成器来改写直接返回列表的函数 35
第17条：在参数上面迭代时，要多加小心 37
第18条：用数量可变的位置参数减少视觉杂讯 41
第19条：用关键字参数来表达可选的行为 43
第20条：用None和文档字符串来描述具有动态默认值的参数 46
第21条：用只能以关键字形式指定的参数来确保代码明晰 49
第3章　类与继承 53
第22条：尽量用辅助类来维护程序的状态，而不要用字典和元组 53
第23条：简单的接口应该接受函数，而不是类的实例 58
第24条：以@classmethod形式的多态去通用地构建对象 62
第25条：用super初始化父类 67
第26条：只在使用Mix-in组件制作工具类时进行多重继承 71
第27条：多用public属性，少用private属性 75
第28条：继承collections.abc以实现自定义的容器类型 79
第4章　元类及属性 84
第29条：用纯属性取代get和set方法 84
第30条：考虑用@property来代替属性重构 88
第31条：用描述符来改写需要复用的@property方法 92
第32条：用__getattr__、__getattribute__和__setattr__实现按需生成的属性 97
第33条：用元类来验证子类 102
第34条：用元类来注册子类 104
第35条：用元类来注解类的属性 108
第5章　并发及并行 112
第36条：用subprocess模块来管理子进程 113
第37条：可以用线程来执行阻塞式I/O，但不要用它做平行计算 117
第38条：在线程中使用Lock来防止数据竞争 121
第39条：用Queue来协调各线程之间的工作 124
第40条：考虑用协程来并发地运行多个函数 131
第41条：考虑用concurrent.futures来实现真正的平行计算 141
第6章　内置模块 145
第42条：用functools.wraps定义函数修饰器 145
第43条：考虑以contextlib和with语句来改写可复用的try/f?inally代码 148
第44条：用copyreg实现可靠的pickle操作 151
第45条：应该用datetime模块来处理本地时间，而不是用time模块 157
第46条：使用内置算法与数据结构 161
第47条：在重视精确度的场合，应该使用decimal 166
第48条：学会安装由Python开发者社区所构建的模块 168
第7章　协作开发 170
第49条：为每个函数、类和模块编写文档字符串 170
第50条：用包来安排模块，并提供稳固的API 174
第51条：为自编的模块定义根异常，以便将调用者与API相隔离 179
第52条：用适当的方式打破循环依赖关系 182
第53条：用虚拟环境隔离项目，并重建其依赖关系 187
第8章　部署 193
第54条：考虑用模块级别的代码来配置不同的部署环境 193
第55条：通过repr字符串来输出调试信息 195
第56条：用unittest来测试全部代码 198
第57条：考虑用pdb实现交互调试 201
第58条：先分析性能，然后再优化 203
第59条：用tracemalloc来掌握内存的使用及泄漏情况 208

* 《Effective Python：编写高质量Python代码的59个有效方法》([美]布雷特·斯拉特金)【摘要 书评 试读】- 京东图书  
https://item.jd.com/11864820.html


## python数据科学手册

* jakevdp/PythonDataScienceHandbook: Python Data Science Handbook: full text in Jupyter Notebooks  
https://github.com/jakevdp/PythonDataScienceHandbook
