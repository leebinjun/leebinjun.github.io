---
title: Ubuntu 16.04 python3.5 编译caffe
date: 2019-08-09 22:59:00
tags:
---
<Excerpt in index | 首页摘要>

## 参考博客
* （ubuntu16.04）关于caffe+python3.5（非anaconda安装）编译的一些问题 - qwrqwrqwer的博客 - CSDN博客  
https://blog.csdn.net/qwrqwrqwer/article/details/79224402

<!-- more -->
<The rest of contents | 余下全文>


## 安装依赖库
``` bash
sudo apt-get install libprotobuf-dev libleveldb-dev libsnappy-dev libopencv-dev libhdf5-serial-dev protobuf-compiler
sudo apt-get install libboost-all-dev
sudo apt-get install libopenblas-dev liblapack-dev libatlas-base-dev
sudo apt-get install libgflags-dev libgoogle-glog-dev liblmdb-dev
sudo apt-get install git build-essential
sudo apt-get install python-pip python-numpy
sudo pip install protobuf
sudo pip install scikit-image
```

由于python版本是3.5，而scikit-image会默认安装3.1版本的matplotlib依赖包，此时会报错：
Beginning with Matplotlib 3.1, Python 3.6 or above is required.
故先指定3.0.1版本安装matplotlib，再安装scikit-image
``` bash
sudo pip install matplotlib==3.0.1
sudo pip install scikit-image
```

## 下载源码
``` bash
mkdir caffe_ssd
cd caffe-ssd
git clone https://github.com/weiliu89/caffe
ls
cd caffe/
git checkout ssd
```

## 配置Makefile文件
``` bash
cp Makefile.config.example Makefile.config 
vim Makefile.config
```

``` cfg
# Uncomment to use Python 3 (default is Python 2)
PYTHON_LIBRARIES := boost_python3 python3.5m
PYTHON_INCLUDE := /usr/include/python3.5m \
                /usr/lib/python3.5/dist-packages/numpy/core/include
```

* ### 问题1：ld cannot find lboost_python3
``` bash
root@iZuf65tz0h4uslpujhakmfZ:~/Workplace/caffe_ssd/caffe# locate boost_python
/usr/lib/x86_64-linux-gnu/libboost_python-py27.a
/usr/lib/x86_64-linux-gnu/libboost_python-py27.so
/usr/lib/x86_64-linux-gnu/libboost_python-py27.so.1.58.0
/usr/lib/x86_64-linux-gnu/libboost_python-py35.a
/usr/lib/x86_64-linux-gnu/libboost_python-py35.so
/usr/lib/x86_64-linux-gnu/libboost_python-py35.so.1.58.0
/usr/lib/x86_64-linux-gnu/libboost_python.a
/usr/lib/x86_64-linux-gnu/libboost_python.so
```
修改Makefile.config文件
``` cfg
PYTHON_LIBRARIES := boost_python-py35 python3.5m
```

* ### 问题2：fatal error: hdf5.h: No such file
``` bash
root@hello:~# locate hdf5.h
/usr/include/hdf5/serial/hdf5.h
```
修改Makefile.config文件，增加相应路径/usr/include/hdf5/serial/
``` cfg
INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /usr/include/hdf5/serial/
```
修改Makefile文件
``` cfg
LIBRARIES += glog gflags protobuf boost_system boost_filesystem m hdf5_serial_hl hdf5_serial
```

## 编译
``` bash
sudo make all
sudo make test
sudo make runtest
sudo make pycaffe
sudo make pytest 
```

## 修改环境变量
最后将caffe的 python 文件夹的路径加入环境变量：
``` bash
sudo gedit ~/.bashrc
```
在文件末尾加入：
``` cfg
export PYTHONPATH=/path/to/caffe/python
```
然后：
``` bash
source ~/.bashrc
```

## 测试
``` bash
git clone https://github.com/chuanqi305/MobileNet-SSD
python demo

```
<img src="Ubuntu-16-04-python3-5-编译caffe\001.jpg">



