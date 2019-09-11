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

*  海象运算符:=
赋值的时候同时可以进行运算



