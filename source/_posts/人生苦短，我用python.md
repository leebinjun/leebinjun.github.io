---
title: 人生苦短，我用python
date: 2019-05-16 23:56:01
tags:
  - python
  - jupyter notebook
---
** {{ title }}：** <Excerpt in index | 首页摘要>

Life is short, you need Python 
1989 年，为了打发无所事事的圣诞节假期，Guido 开始写 Python 语言的编译/解释器，Python这个名字来自他所喜欢的电视剧 Monty Python's Flying Circus (一部情景幽默剧)。两年后，Python 第一个版本终于问世。

<!-- more -->
<The rest of contents | 余下全文>



## 迭代器
迭代器（iterator）是一种对象，它能够用来遍历标准模板库容器中的部分或全部元素，每个迭代器对象代表容器中的确定的地址。

``` bash
i = iter(range(10))
next(i)
```
我们简单说迭代器就是访问集合元素，迭代器就是有一个next()方法的对象，而不是通过索引来计数的。


## test
Q1: 计算一年的第几天
``` bash
import datetime
res = datetime.date(year, month, day) - datetime.date(year-1, 12, 31)
```

Q2: 找最小数
``` bash
alist = list(map(int, input().split()))
res = min(alist)
```

Q3: 大于平均值的数的和
``` bash
res = sum([i for i in alist if i > sum(alist)/len(alist)])
```

Q4: 数列求和
``` bash
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
``` bash
data = (i**2+1 for i in range(1000000))
%%time
list_data = list(data)
4535251 in list_data

%%time
set_data = set(data)
4535251 in set_data
```

加速函数  
``` bash
%%time
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
fib(30)
```
* 用缓存机制加速递归函数  
``` bash
%%time
from functools import lru_cache
@lru_cache(100)
def fib(n):
    return(1 if n in (1,2) else fib(n-1)+fib(n-2))
fib(30)
```
* 用循环机制代替递归函数  
``` bash
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
``` bash 
%%time
alist = [i**2 for i in range(1000)]
%%time
alist = map(lambda x: x**2, range(1000))
```
* 使用filter代替推导式进行加速  
``` bash 
%%time
alist = [i for i in range(1000) if i%7==0]
%%time
alist = filter(lambda x: x%7==0, range(1000))
```

使用np.where代替if  
``` bash
%%time
relu = lambda x:np.where(x>0, x, 0)
array_b = relu(array_a)
```

应用多线程加速IO密集型任务  
应用多进程加速CPU密集型任务  



### 

* 03-用Jupyter编写数学公式 - ds19991999的博客 - CSDN博客 </br>https://blog.csdn.net/ds19991999/article/details/81275580