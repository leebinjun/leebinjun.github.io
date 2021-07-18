---
title: 桌面冰球机器人
date: 2019-06-07 00:48:20
tags:

  + opencv
  + arduino

---

## 说明

* 桌上冰球机器人 opencv3 + arduino mega2560  

https://blog.csdn.net/x_a_little_story/article/details/88747280

在闲鱼上面发现这个机器人感觉得很有趣，如果使用强化学习做人机对战是一个很好的项目。  
查到了资料发现代码模型都很全，就按开源项目的设计和代码在端午小假期DIY了一个。  
目前还是个人工智障，主要有以下问题待解决：

* 笔记本性能不够，帧数最多只到9，反应速度不够快；
* 电机没有加Y轴，所以理论上只能防守；
* 机械结构上做了一些trick，比如倾斜“场地”和封死机器人的“球门”；
* 算法上还是常规几何推理的方法，并没有想好怎么使用RL，大概可以参考一下gym里的breakout？

## Demo

<div align=center>
<img src = "桌面冰球机器人\001.gif" width=600 height=350>
</div>

## 参考资料

感谢故里草木深和JJulio两位前辈提供的资料。  

* 桌上冰球机器人 opencv3 + arduino mega2560  

https://blog.csdn.net/x_a_little_story/article/details/88747280

* JJulio/AHRobot: Air Hockey Robot Project  

https://github.com/JJulio/AHRobot
