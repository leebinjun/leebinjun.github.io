---
title: 树莓派3b 编译安装OpenCV-4.0.0 for Python3
date: 2019-04-20 21:14:22
tags: 
  - opencv
  - raspberry
  - python
---

## 准备

### 调整SWAP分区

``` bash
$ cd /var && ls
```
卸载swap文件
``` bash
$ sudo swapoff swap
```
查看一下
``` bash
$ htop
```
创建一个更大的swap文件
``` bash
$ sudo dd if=/dev/zero of=swap bs=1M count=2048
```
装载新的swap文件
``` bash
$ sudo mkswap swap 
$ sudo swapopen swap 
```
可以在htop中看到新的swap分区大小为2GB，完成

### 相关依赖

``` bash
$ sudo apt-get install build-essential cmake pkg-config
$ sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
$ sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
$ sudo apt-get install libxvidcore-dev libx264-dev
$ sudo apt-get install libgtk2.0-dev
$ sudo apt-get install libatlas-base-dev gfortran
$ sudo apt-get install python2.7-dev python3-dev
```

安装numpy
``` bash
$ pip3 install numpy
```

### 下载opencv源码
``` bash
$ cd Documents/
$ wget https://github.com/opencv/opencv/archive/4.0.0.zip
$ unzip 4.0.0.zip
$ wget https://github.com/opencv/opencv_contrib/archive/4.0.0.zip
$ unzip 4.0.0.zip
```

## 编译

### 进入虚拟环境
``` bash
$ cd python-env
$ pyvenv py35
$ source python-env/py35/bin/activate
```

### 设置编译环境
安装cmake-qt-gui，使用图形界面
``` bash
$ cd Documents/opencv-4.0.0/
$ mkdir build
$ cd build/
$ sudo apt-get install cmake-qt-gui
$ (venv) pi@raspberrypi:~/Documents/opencv-4.0.0/build $ cmake-gui
```

选择源文件路径，编译文件夹选择刚才新建的build文件夹
点击左下角Configure，第一次完成是红色的，再点一次就变成白色了，如图</br>

<img src = "树莓派3b 编译安装OpenCV-4.0.0 for Python3/01.png" width=600 height=300>

然后查找OPENCV_EXTRA_MODULES_PATH项，将OpenCV_Contrib-4.0.0的路径填进去，点击Configure，如图

<img src = "树莓派3b 编译安装OpenCV-4.0.0 for Python3/02.png" width=600 height=300>

这样OpenCV_Contrib-4.0.0就被添加进去了，然后我们修改关于Python的参数，在查找栏键入PYTHON：取消BIULD_opencv_python2，勾选INSTALL_PYTHON_EXMAPLES，这样就设置为编译Python3的版本了，再次点击Configure，如图：
<img src = "树莓派3b 编译安装OpenCV-4.0.0 for Python3/03.png" width=600 height=300>

然后就可以生成编译文件了，点击Generate</br>

### 编译
键入下述命令开始编译，有风扇-j4，没风扇-j2-j3
``` bash
$ make -j4
```
安装
``` bash
$ sudo make install 
$ sudo ldconfig
```
因编译后的库文件cv2.so被输出为 cv2.cpython-35m-arm-linux-gnueabihf.so，这将导致该模块在Python3中无法import进来
``` bash
$ sudo cp /usr/local/python/cv2/python-3.5/cv2.cpython-35m-arm-linux-gnueabihf.so /usr/local/lib/python3.5/dist-packages
$ cd /usr/local/lib/python3.5/dist-packages/
$ sudo mv cv2.cpython-35m-arm-linux-gnueabihf.so cv.so
$ ln -s /usr/local/lib/python3.5/dist-packages/cv2.so cv2.so
```

## 参考博客 

* Raspberry Pi-树莓派搭建基于Python3和OpenCV实现的解魔方机器人-爱板网论坛 - 电子工程师学习交流园地</br>http://www.eeboard.com/bbs/thread-99451-1-1.html
* 树莓派3b编译安装完整OpenCV-3.4.1 for Python3 - 爱板网经验频道 - Eeboard爱板网</br>https://jingyan.eeboard.com/article/76476
* 树莓派安装opencv调用cv2时提示ModuleNotFoundError: NO module named 'cv'的解决方法 - Mrkinte的博客 - CSDN博客</br>https://blog.csdn.net/Mrkinte/article/details/85058507



