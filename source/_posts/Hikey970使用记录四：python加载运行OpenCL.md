---
title: Hikey970使用记录四：python加载运行OpenCL
date: 2019-06-08 10:39:59
tags:
  - pyopencl
---

## 参考资料


* Python 并行计算 - SoftStar的专栏 - CSDN博客</br>https://blog.csdn.net/u011532367/article/details/51008993


## 安装
``` bash
$ sudo apt-get install opencl-dev
$ pip3 install pybind11
$ pip3 install pyopencl
$ sudo apt-get install clinfo
$ sudo clinfo
```
测试结果
<img src="Hikey970使用记录四：python加载运行OpenCL\001.png" witdh=400 height=200>


## 问题记录
import pyopencl as cl  
ImportError: No module named 'numpy.core._multiarray_umath'
terminate called after throwing an instance of 'std::runtime_error'
  what():  numpy failed to initialize
Aborted

查看numpy的当前版本
``` bash
pip show numpy
```
更新numpy的版本
``` bash
pip  install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade numpy
```

## 参考资料
* python - TensorFlow GPU比CPU更慢 - SegmentFault 思否 
https://segmentfault.com/q/1010000012693363
* https://discuss.96boards.org/search?q=opencl
* https://community.arm.com/cn/f/discussions/13001/hikey960-arm-gpu
