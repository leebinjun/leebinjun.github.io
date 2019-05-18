---
title: Pixar Lamp
date: 2019-05-14 19:25:43
tags:
  - python
---
** {{ title }}：** <Excerpt in index | 首页摘要>
做个跳跳灯！
<!-- more -->
<The rest of contents | 余下全文>

# 设计思路

<div align=center>
<img src = "Pixar-Lamp\设计思路.png" width=1000 height=800>
</div>


# 准备

``` bash
> conda create -n lamp python=3.6
> activate lamp
> pip install numpy
> pip install pandas
> pip install scipy
> pip install tensorflow
> pip install baidu-aip
> pip install pyserial
> pip install opencv-python
> pip install opencv-contrib-python
```


调用华为api
* huaweicloud/huaweicloud-sdk-python-frs https://github.com/huaweicloud/huaweicloud-sdk-python-frs

坐姿检测
* 如何评价卡内基梅隆大学的开源项目 OpenPose？ - 知乎 </br>https://www.zhihu.com/question/59750782
* 基于OpenPose的人体姿态检测 - yph001的博客 - CSDN博客 </br>https://blog.csdn.net/yph001/article/details/83218839