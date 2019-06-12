---
title: Hikey970使用记录
date: 2019-05-12 11:16:12
tags:
  - Hikey970
---
** {{ title }}：** <Excerpt in index | 首页摘要>
hello hikey!
Hikey970使用记录一：ubuntu16.04下烧写lebian系统  
Hikey970使用记录二：编译安装opencv4.0.0  
Hikey970使用记录三：USB转串口驱动安装  
<!-- more -->
<The rest of contents | 余下全文>

Hikey970使用记录一：[ubuntu16.04下烧写lebian系统](https://leebinjun.github.io/2019/05/22/Hikey970%E4%BD%BF%E7%94%A8%E8%AE%B0%E5%BD%95%E4%B8%80%EF%BC%9Aubuntu16-04%E4%B8%8B%E7%83%A7%E5%86%99lebian%E7%B3%BB%E7%BB%9F/)

Hikey970使用记录二：[编译安装opencv4.0.0](https://leebinjun.github.io/2019/05/22/Hikey970%E4%BD%BF%E7%94%A8%E8%AE%B0%E5%BD%95%E4%BA%8C%EF%BC%9A%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85opencv4-0-0/)  

Hikey970使用记录三：[USB转串口驱动安装](https://leebinjun.github.io/2019/05/22/Hikey970%E4%BD%BF%E7%94%A8%E8%AE%B0%E5%BD%95%E4%B8%89%EF%BC%9AUSB%E8%BD%AC%E4%B8%B2%E5%8F%A3%E9%A9%B1%E5%8A%A8%E5%AE%89%E8%A3%85/)


Hikey970使用记录四：[python加载运行OpenCL](https://leebinjun.github.io/2019/06/08/Hikey970%E4%BD%BF%E7%94%A8%E8%AE%B0%E5%BD%95%E5%9B%9B%EF%BC%9Apython%E5%8A%A0%E8%BD%BD%E8%BF%90%E8%A1%8COpenCL/)



## 问题记录 
### apt-get 安装时出现dpkg: error processing package XXX的问题
``` bash
$ sudo mv /var/lib/dpkg/info/ /var/lib/dpkg/info_backup/
$ sudo mkdir /var/lib/dpkg/info/
```
* Ubuntu在apt-get 安装时出现dpkg: error processing package XXX的问题 - tnaig的博客 - CSDN博客 </br>https://blog.csdn.net/tnaig/article/details/78497792


* Linux应用环境实战13：我该如何备份系统 - ichsonx的专栏 - CSDN博客 </br>https://blog.csdn.net/ichsonx/article/details/49387855

### hub集线器和MobaXterm终端的冲突
hikey970的USB口有限，插上hub集线器(鼠标、键盘、摄像头)，终端会掉线。  
应该是供电问题，hub最好单独供电。


## 常用指令 

截图
``` bash
sudo apt-get install scrot
sudo scrot
```

pip指定安装源安装
``` bash
sudo pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple XXX
```
