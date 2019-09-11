---
title: leapmotion使用记录
date: 2019-09-04 23:26:36
tags:
---

最近发现leapmotion出了一款体感键盘，大体就是一个薄膜键盘加上一个leapmotion，七夕价在淘宝上才300元，要知道三代的支架都卖300多了，果断入手来学习一下。

<img src="leapmotion使用记录\000.png">

* Developer Support – Leap Motion Support  
https://support.leapmotion.com/hc/en-us/categories/203324688-Developer-Support



# 配置 leapmotion 的 python3 开发环境

官方提供的示例只支持Python2.7，如果在其他python版本的环境下运行，需要自行生成动态链接库文件(linux下为so文件，windows下为dll文件，python的动态模块是pyd文件，其实质为dll文件)，并进行替换。


## 准备
* SWIG  
http://www.swig.org/exec.html  
Download SWIG  
http://www.swig.org/download.html
* Visual Studio
* Leap_Motion_SDK_Windows_2.3.1  
Get Started with Our SDK — Leap Motion Developer  
https://developer.leapmotion.com/get-started

## 使用 SWIG 生成 LeapPython.cpp 文件

相关指令在Leap.i文件中
``` bash
X:\Project>X:\swigwin-4.0.1\swig.exe -c++ -python -o LeapPython.cpp -interface LeapPython Leap.i
```
windows下出现“ Leap.i(991) : Error: Line indented less than expected (line 3 of %pythoncode block) as no line should be indented less than the indentation in line 1 ”的错误。  
最终在linux下运行，生成LeapPython.h和LeapPython.cpp文件。

``` bash
sudo apt-get install swig
swig -c++ -python -o LeapPython.cpp -interface LeapPython Leap.i
```
### 参考
* Nagasaki45/leap_python3: Build LeapMotion binaries for python3  
https://github.com/Nagasaki45/leap_python3


## 创建 C++工程，生成动态链接文件
使用Visual Studio创建C++工程，将SDK中的Leap.h LeapMath.h和刚生成的LeapPython.h文件加入头文件，将LeapPython.cpp文件加入源文件。  

解决方案配置 设置为 Release，解决方案平台 设置为 x64。  
打开 调试->工程属性，进行如下设置

配置属性->常规，目标文件名 设置为LeapPython，项目默认值->配置类型 设置为动态库(.dll);
<img src="leapmotion使用记录\001.png">

配置属性->C/C++->常规，添加python.h文件所在目录，例如"X:\Anaconda3\envs\py36\include";
<img src="leapmotion使用记录\002.png">

配置属性->链接器->输入，添加python36.lib Leap.lib文件的绝对路径，例如"X:\Anaconda3\envs\py36\libs\python36.lib";
<img src="leapmotion使用记录\003.png">

F7创建，生成 LeapPython.dll 文件，重命名为 LeapPython.pyd 文件后进行替换。

## 测试

工程目录组织如下：  
``` 
Test_project  
│  readme.md  
│    
├─lib  
│  └─x64  
│      │  Leap.dll  
│      │  Leap.py  
│      └─ LeapPython.pyd  
│                
└─src  
        Sample.py  
```     

Sample.py 中导入leapmotion模块的语句

``` python
import os, sys, inspect
src_dir = os.path.dirname(inspect.getfile(inspect.currentframe()))
arch_dir = '../lib/x64' if sys.maxsize > 2**32 else '../lib/x86'
sys.path.insert(0, os.path.abspath(os.path.join(src_dir, arch_dir)))
import Leap 
```

运行Sample.py文件，即可以看到不断输出的手势信息。


### 参考
*  Setting Up a Project — Leap Motion Python SDK v3.2 Beta documentation  
https://developer-archive.leapmotion.com/documentation/python/devguide/Project_Setup.html




# Leapmotion 的 Web开发，使用 JavaScript

* Javascript | Leap Motion Developers  
https://developer-archive.leapmotion.com/javascript

``` html
<script src="js/leap-0.6.4.min.js"></script>
```

运行官方JavaScript示例，结果如图

<img src="leapmotion使用记录\Leap Motion JavaScript Sample.png">










# Box2Djs
Box2D是一个用于模拟2D刚体物体的C++引擎。它集成了大量的物理力学和运动学的计算，并将物理模拟过程封装到类对象中，将对物体的操作，以简单友好的接口提供给开发者。  
Box2DJS是Box2D物理引擎的JavaScript端口。

* Box2DJS - Physics Engine for JavaScript  
http://box2d-js.sourceforge.net/
* Box2DJS教程--目录总览 | Here. There.  
https://godbasin.github.io/2017/02/17/box2d-tutorial-0-catalog/


使用以下步骤将刚体添加到世界中:  
* I 创建一个刚体定义，它将持有刚体信息，例如刚体的位置信息。  
* II 创建一个形状，它将决定刚体的显示形状。
* III. 创建一个夹具,将形状附加到刚体定义上。
* IV. 创建刚体在世界中的实体,使用夹具。

## 参考博客
* HTML5之2D物理引擎 Box2D for javascript Games 系列 第一部分 - 池中物willian - 博客园  
https://www.cnblogs.com/willian/p/5477922.html
* HTML5之2D物理引擎 Box2D for javascript Games 系列 第二部分 - 池中物willian - 博客园  
https://www.cnblogs.com/willian/p/5478539.html



### 旋转关节(revolute-joint)  
使用基类b2RevoluteJointDef创建一个旋转关节，设定铰接点，及旋转关节连接的是哪两个物体之后即可将其放入到世界里。
``` javascript
        var jointDef = new b2RevoluteJointDef();
        //网上都是用anchorPoint获取anchor，web版没有这个函数，所以自己new一个，然后initialize（bodyA，bodyB，b2Vec2）定义传值就好了
        var anchor = new b2Vec2();
        anchor.Set(13,12);
        jointDef.Initialize(carBody,whell,anchor);
        world.CreateJoint(jointDef);
```
* box2d-jquery的b2RevoluteJointDef - OSCHINA  
https://www.oschina.net/question/190778_119881










