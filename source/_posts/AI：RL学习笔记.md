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

``` bash
(root) C:\Users\Administrator\Desktop\DQN-2048-master>python
Python 3.6.3 |Anaconda, Inc.| (default, Oct 15 2017, 03:27:45) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import pandas as pd
>>> import numpy as np
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

```


* 深度增强学习（DRL）漫谈 - 从DQN到AlphaGo - 世事难料，保持低调 - CSDN博客  
https://blog.csdn.net/jinzhuojun/article/details/52752561

* 深度增强学习DDPG（Deep Deterministic Policy Gradient）算法源码走读 - 世事难料，保持低调 - CSDN博客  
https://blog.csdn.net/jinzhuojun/article/details/82556127


* 在Windows下使用OpenAI Gym - HelloGym - 止于至玄 - CSDN博客  
https://blog.csdn.net/philthinker/article/details/79810249

## AI通关超级马里奥

在windows下编译运行lua源程序 - weixin_38527697的博客 - CSDN博客 https://blog.csdn.net/weixin_38527697/article/details/80718168

基于NEAT算法的马里奥AI实现 - 小天狼星的博客 - CSDN博客 https://blog.csdn.net/qq_37913997/article/details/81871589

aleju/mario-ai: Playing Mario with Deep Reinforcement Learning https://github.com/aleju/mario-ai

BitTigerLab/ArtificialIntelligent/RetroContest at master · Fabsqrt/BitTigerLab https://github.com/Fabsqrt/BitTigerLab/tree/master/ArtificialIntelligent/RetroContest

openai/retro: Retro Games in Gym https://github.com/openai/retro#gym-retro

BitTigerLab/README.md at master · Fabsqrt/BitTigerLab https://github.com/Fabsqrt/BitTigerLab/blob/master/ArtificialIntelligent/Mario/README.md

NeuroEvolution of Augmenting Topologies http://www.cs.ucf.edu/~kstanley/neat.html

CodeReclaimers/neat-python: Python implementation of the NEAT neuroevolution algorithm https://github.com/CodeReclaimers/neat-python

NEAT 监督学习 - 进化算法 Evolutionary Algorithm | 莫烦Python https://morvanzhou.github.io/tutorials/machine-learning/evolutionary-algorithm/4-02-neat-supervised-learning/

沁原的硅谷创新课 002 如何训练人工智能游戏高手？OpenAI、Gym Retro、DQN、PPO、TensorFlow - YouTube https://www.youtube.com/watch?v=cZa_xot8Wdc&list=PL34eqMVgn4cjnvak8FtJysKd6Ke_T5Lsl&index=2

