---
title: Hikey970使用记录三：USB转串口驱动安装
date: 2019-05-22 09:54:51
tags:
  - Hikey970
---
** {{ title }}：** <Excerpt in index | 首页摘要> 
hello hikey!  
USB转串口驱动安装    
* 3. usb转串口驱动安装 · Hikey 970 开发板使用教程 </br>https://doc.bwbot.org/zh-cn/books-online/hikey970-doc/topic/485.html
<!-- more -->
<The rest of contents | 余下全文>


安装USB转串口驱动需要编译对应的驱动程序,方法如下。

## 下载linux内核源码
``` bash
$ git clone --single-branch -b hikey970-v4.9 --depth=1 https://github.com/96boards-hikey/linux
$ cd linux
$ ls
$ git checkout hikey970-v4.9
```

## 配置内核源代码
获取内核配置文件
``` bash
cp /proc/config.gz ~/
gzip -d ~/config.gz
```
进入内核源代码文件夹
``` bash
cd ~/linux
```
将内核配置文件复制到此处
``` bash
make mrproper
cp ~/config .config
sudo chmod 666 .config
```
配置内核文件
``` bash
sudo apt-get install libncurses5-dev
sudo apt-get install bc
make menuconfig
```
内核配置界面如下,Device Drivers-->USB Support --> USB Serial Converter Support 将其设置成M。编译内核module有两种模式，一种是直接编译到内核里面，另一种是编译成独立的.ko文件module。我们采用的是.ko的模式。这样不用重新编译内核更加方便。 继续进入此选项将想要编译的驱动设置成M，如果不清楚自己的型号可以全部设置成M 设置完成后选择保存，之后再退出此界面  
<img src="Hikey970使用记录三：USB转串口驱动安装\01.png" witdh=600 height=300>
<img src="Hikey970使用记录三：USB转串口驱动安装\02.png" witdh=600 height=300>
<img src="Hikey970使用记录三：USB转串口驱动安装\03.png" witdh=600 height=300>

## 编译驱动module
``` bash
make modules_prepare
sudo make -j4 modules # 需要执行这个才会生成modules.order,modules.builtin
sudo make M=drivers/usb/serial
```
编译完成之后可以在drivers/usb/serial中看到生成了许多.ko文件,这些就是我们需要的驱动文件。

## 安装驱动module
创建module文件目录
``` bash
sudo mkdir -p /lib/modules/$(uname -r)/kernel/drivers/usb/serial/
sudo cp drivers/usb/serial/*.ko /lib/modules/$(uname -r)/kernel/drivers/usb/serial/
```
复制depmod依赖文件
``` bash
sudo cp ~/linux/modules.order /lib/modules/$(uname -r)/
sudo cp ~/linux/modules.builtin /lib/modules/$(uname -r)/
```
生成对应文件
``` bash
cd /lib/modules/$(uname -r)
sudo depmod -a
```
加载驱动
``` bash
sudo modprobe pl2303
```

## 测试驱动

查看驱动是否正常加载
``` bash
$ lsmod
```
可以看到pl2303驱动已经成功加载,这时再插上U转串试一下
``` bash
$ ls /dev/tty*
```
<img src="Hikey970使用记录三：USB转串口驱动安装\04.png" witdh=600 height=300>
  
## 自动加载驱动
修改 /etc/modules文件 在其中加入想要加载的内核模块的名称，比如对于我的设备就是pl2303。文件内容如下  
``` bash
$ sudo vim /etc/modules

    # /etc/modules: kernel modules to load at boot time.
    #
    # This file contains the names of kernel modules that should be loaded
    # at boot time, one per line. Lines beginning with "#" are ignored.
    pl2303
```
保存退出，下次在系统启动时就会自动加载这个驱动了。


## 串口测试
``` bash
$ pip3 install pyserial
$ python
>>> import serial
```

## 问题记录

### 明明已经安装matplotlib 还是报错ImportError: No module named 'matplotlib'
``` bash
$ sudo apt-get install python-matplotlib
```
### sudo python 下找不到模块
<img src="Hikey970使用记录三：USB转串口驱动安装\03.png" witdh=600 height=300>
在.py文件中添加sys.path
``` bash
$ vim serial_test.py
    import sys
    sys.path.append("/home/shunya/.local/lib/python3.5/site-packages")
$ sudo python serial_test.py
```


## 参考资料
* 3. usb转串口驱动安装 · Hikey 970 开发板使用教程 </br>https://doc.bwbot.org/zh-cn/books-online/hikey970-doc/topic/485.html

