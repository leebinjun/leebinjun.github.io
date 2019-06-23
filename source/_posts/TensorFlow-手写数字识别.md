---
title: TensorFlow 手写数字识别
date: 2019-04-26 10:13:08
tags:
  - tensorflow
---

## tensorflow基础

### 基本概念

tensorflow是一个编程系统，使用图(graphs)来表示计算任务，在会话(Seeeion)的context中执行graphs，graphs中的节点称为op(operation)，一个op获得零个或多个Tensor，执行计算产生零个或多个Tensor，Tensor可以看做n维数组或列表，图必须在会话中启动，通过变量(Variable)维护装填，使用feed和fetch可以为任意的操作赋值获从中获取数据。

* TensorFlow Core  |  TensorFlow  
https://tensorflow.google.cn/tutorials?tdsourcetag=s_pcqq_aiomsg

* 优化器 Optimizer 加速神经网络训练 (深度学习) Speed up neural network training process (deep learning) - YouTube  
https://www.youtube.com/watch?v=UlUGGB7akfE&list=PLXO45tsB95cKI5AIlf5TxxFPzb-0zeVZ8&index=18&app=desktop









