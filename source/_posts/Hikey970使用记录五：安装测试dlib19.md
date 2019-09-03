---
title: Hikey970使用记录五：安装测试dlib19
date: 2019-08-19 00:02:20
tags:
---


## 安装
安装相关依赖
``` bash
sudo apt install build-essential cmake pkg-config
sudo apt install libboost-dev libopenblas-dev
```

下载安装包并安装
```
wget http://dlib.net/files/dlib-19.17.tar.bz2
tar -jxvf dlib-19.17.tar.bz2
cd dlib-19.17
python setup.py install
```

## 测试
``` bash
import dlib
```



