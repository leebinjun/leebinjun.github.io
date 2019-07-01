---
title: Hikey970使用记录一：ubuntu16.04下烧写lebian系统
date: 2019-05-22 09:53:43
tags:
  - Hikey970
---
** {{ title }}：** <Excerpt in index | 首页摘要>
hello hikey!
ubuntu16.04下烧写lebian系统  
<!-- more -->
<The rest of contents | 余下全文>

# ubuntu16.04下烧写lebian系统
## 准备 
* hikey970 开发板
* 开发板电源 12V2A
* ubuntu16.04 主机
* type-C 数据线

## 安装

安装安卓fastboot  
``` bash
$ sudo apt-get install android-tools-adb
$ sudo apt-get install android-tools-fastboot
```

## 下载镜像  
* LeMaker | The Single Board Computers Community  
 http://www.lemaker.org/product-hikey970-download-86.html

``` bash
$ cd Workplace/
$ mkdir hikey970work
$ cd hikey970work/
$ wget http://mirror.lemaker.org/hikey970-lebian-9.tar.gz
$ tar -xzvf hikey970-lebian-9.tar.gz
$ cd hikey970-lebian-9/
```

版本的镜像有语法错误，要进行修改一下三个文件
* flash-all-binaries.sh
* flash-minimum-binaries.sh
* /binaries/recovery-flash.sh
``` bash
$ cat flash-all-binaries.sh
    #/bin/bash
    ...
$ vim flash-all-binaries.sh
    #!/bin/bash
    ...
```

## 烧写
先把板子上的开关1-4拨为On Off On Off  
连接typeC线到板子上(注意是HDMI和USB口中间的那个typec口，而不是debug口)  
开发板上电

``` bash
~/Workplace/hikey970work/hikey970-lebian-9$ sudo ./flash-all-binaries.sh
```
等待刷机完成(100s)

## 刷入分区补丁

默认的系统分区很小，所以需要打一个补丁
* 分区补丁下载</br>https://www.bwbot.org/s/GWciA9
从上面的的下载地址下载补丁，之后解压。 把解压后的内容复制到 hikey970-lebian-9 文件夹内，执行

``` bash
sudo fastboot flash boot boot-hikey970.uefi.2.img
sudo fastboot flash userdata hikey970-lebian9-tf.img
```

## 启动系统
断开板子的电源，然后把开关拨至on off off off。给板子连接上鼠标键盘网线和显示器。然后给板子上电。 等待系统启动完成。正常情况下应该可以看到登陆界面。用户名和密码都是shunya。

## 调整分区

运行下面的指令调整分区

``` bash
$ sudo resize2fs /dev/sdd15
```

这样能够把系统分区扩展到20G，剩下的需要用gparted扩展

``` bash
$ sudo apt-get install gparted
$ sudo gparted-pkexec # 注意此指令只能再外接显示器的情况下才能运行
```
在GParted工具中，首先选择60G的硬盘，再点击未分配分区上一个分区进行resize，注意增加分区大小或者合并只能是相邻的分区，如果不是连续，发现中间有swap分区可先删除，然后把未分配的空间全部扩展到最后一个分区，最后应用就可以了。
``` bash
shunya@hikey970:~$ df -h
```
可以看到系统空间已经增大到50G了

## 更换国内源
修改源文件
``` bash
$ sudo vim /etc/apt/sources.list

    # deb http://mirrors.ustc.edu.cn/debian/ xenial main restricted universe multiverse
    deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free
    deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free
    deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free
    deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free
    deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free
    deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free
    deb https://mirrors.tuna.tsinghua.edu.cn/debian-security/ stretch/updates main contrib non-free
    deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security/ stretch/updates main contrib non-free
    # deb http://http.debian.net/debian/ stretch main contrib non-free
    # deb-src http://mirrors.ustc.edu.cn/debian/ xenial main restricted universe multiverse
    # deb-src http://http.debian.net/debian/ stretch main contrib non-free
    # deb http://security.debian.org/ stretch/updates main contrib non-free
    # deb-src http://security.debian.org/ stretch/updates main contrib non-free
    # deb http://http.debian.net/debian/ stretch-updates main contrib non-free
    # deb-src http://security.ubuntu.com/ubuntu xenial-security main
    # deb https://packages.debian.org/zh-tw/jessie/ xenial-security main
    # deb-src https://packages.debian.org/zh-tw/jessie/ xenial-security main
    # deb-src http://http.debian.net/debian/ stretch-updates main contrib non-free
    # deb-src http://security.ubuntu.com/ubuntu xenial-security main
    # deb-src http://security.ubuntu.com/ubuntu xenial-security universe
    deb http://ftp.ports.debian.org/debian-ports/ sid main
    # deb-src http://ftp.ports.debian.org/debian-ports/ sid main
    deb http://debian.nctu.edu.tw/debian-ports/ sid main
    # deb-src debian.nctu.edu.tw/debian-ports/ sid main
    # deb https://packages.debian.org/ stretch main contrib non-free
```
更新
``` bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

## 参考资料
* 引言 · Hikey 970 开发板使用教程  
https://doc.bwbot.org/en/books-online/hikey970-doc/
* hikey970学习-005 update image guide 镜像升级指南 - Mingyong_Zhuang的技术博客 - CSDN博客  
https://blog.csdn.net/qqqzmy/article/details/82667142
* Ubuntu 使用Gparted工具扩大第一分区方法步骤 - zalebool - 博客园  
https://www.cnblogs.com/zalebool/p/5814907.html




