---
title: RL学习笔记
date: 2019-05-22 15:56:59
tags:
  - RL
---

## windows安装gym
安装依赖包
``` bash
> pip install pillow ...
```
安装gym和游戏仿真环境Atari
``` bash
> pip install gym
> pip install - -no-index -f https://github.com/Kojoley/atari-py/releases atari_py
```





(root) C:\Users\Administrator\Desktop\DQN-2048-master>python
Python 3.6.3 |Anaconda, Inc.| (default, Oct 15 2017, 03:27:45) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import pandas as pf
>>> import pandas as pd
>>> import numpy as np
>>> table = pd.DateFrame(np.random((3,4)), index=[2,4,6], columns=['a', 'c', 'd', 'd'])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'pandas' has no attribute 'DateFrame'
>>> table = pd.DataFrame(np.random((3,4)), index=[2,4,6], columns=['a', 'c', 'd', 'd'])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'module' object is not callable
>>> table = pd.DateFrame(np.random.random((3,4)), index=[2,4,6], columns=['a', 'c', 'd', 'd'])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'pandas' has no attribute 'DateFrame'
>>> table = pd.DataFrame(np.random.random((3,4)), index=[2,4,6], columns=['a', 'c', 'd', 'd'])
>>> table
          a         c         d         d
2  0.444598  0.907250  0.629258  0.607062
4  0.531954  0.341319  0.477738  0.480921
6  0.102290  0.765902  0.923868  0.159364
>>> table_alist = table.loc[4,:]
>>> table_alist
a    0.531954
c    0.341319
d    0.477738
d    0.480921
Name: 4, dtype: float64
>>> table_alist.max()
0.5319538779267701
>>> table_alist.argmax()
'a'
>>>










* 在Windows下使用OpenAI Gym - HelloGym - 止于至玄 - CSDN博客</br> https://blog.csdn.net/philthinker/article/details/79810249