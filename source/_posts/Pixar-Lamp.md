---
title: Pixar Lamp
date: 2019-05-14 19:25:43
tags:
  - python
---
** {{ title }} ** <Excerpt in index | 首页摘要>
做个跳跳灯！
<!-- more -->
<The rest of contents | 余下全文>

# 设计思路

### 2018年3月
<div align=center>
<img src = "Pixar-Lamp\设计思路.png" width=1000 height=800>
</div>

### 2019年5月
<div align=center>
<img src = "Pixar-Lamp\设计思路-201905.png" width=1000 height=800>
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

姿态点检测
<div align=center>
<img src = "Pixar-Lamp\001.jpg" width=200 height=200>
</div>

* Ilovepose </br>http://ilovepose.luohuank.xin/
* 如何评价卡内基梅隆大学的开源项目 OpenPose？ - 知乎 </br>https://www.zhihu.com/question/59750782
* 基于OpenPose的人体姿态检测 - yph001的博客 - CSDN博客 </br>https://blog.csdn.net/yph001/article/details/83218839






## 单人姿态估计

### 综述
* 【极市】张锋-2D单人人体姿态估计及其应用_腾讯视频 </br>https://v.qq.com/x/page/w0543yfwrhq.html
* PowerPoint Template</br> http://static.extremevision.com.cn/donkey_84b48a46-86f7-4db3-a5fd-87b0f8e6389a.pdf
* MPII Human Pose Database </br> http://human-pose.mpi-inf.mpg.de/#results

应用
* 人机交互
* 行人再识别 person re-id
* 行为识别

问题
* 遮挡
* 复杂背景
* 光照
* 复杂姿态
* 多尺度
* 拍摄角度

### 方法

* 多尺度、多分辨率
* 基于Residual Block
* 扩大感受野
* 预处理
* 后处理

传统方法
* 基于图结构(Pictorial Structures)
* DPM(形变部件模型)目标价侧算法  
DPM算法采用了改进后的HOG特征，SVM分类器和滑动窗口（Sliding Windows）检测思想，针对目标的多视角问题，采用了多组件（Component）的策略，针对目标本身的形变问题，采用了基于图结构（Pictorial Structure）的部件模型策略。此外，将样本的所属的模型类别，部件模型的位置等作为潜变量（Latent Variable），采用多示例学习（Multiple-instance Learning）来自动确定。

基于深度学习的方法
* 直接回归坐标 
  * CNN多阶段 

* 通过热力图回归坐标
  * CNN+图模型

#### Deep Pose
* CNN分类效果好，能不能直接用CNN回归关节坐标
* 2014， Szegedy
* AlesNet

#### 迭代误差反馈模型
* 让网络学习到一个多阶段反馈的模型
* 2016

#### 双源CNN
* 给网络添加先验知识
* Fuan xiaochuan
* 2015


#### CNN
* 由于人的尺度是不一样的，能不能让网络客服这一问题，并学习到关节与关节之间的关系(pair wise relation)？
* Yann lecun
* 2014
* CNN+图模型

#### DCNN
* CNN+树状结构图模型
* 2016
* Wang xiaogang

#### CPM
* 卷积姿态机 + 大卷积核提升感受野 + 多阶段回归
* 2016

#### hourglass
* 堆叠的沙漏模型 + 极大提升感受野 + 多阶段回归
* 2016

#### 
* 图模型太慢，直接使用卷积核来实现
* 树状结构的特征学习
* 2016


#### Efficient Concolutional Network
* 关注efficience
* 2016

 






## 参考博客
- 如何评价卡内基梅隆大学的开源项目 OpenPose？ - 知乎   
https://www.zhihu.com/question/59750782
- CMU-Perceptual-Computing-Lab/openpose: OpenPose: Real-time multi-person keypoint detection library for body, face, hands, and foot estimation   
https://github.com/CMU-Perceptual-Computing-Lab/openpose
- 人体姿态估计数据集整理（Pose Estimation/Keypoint） - 上善若水 - CSDN博客   
https://blog.csdn.net/guo1988kui/article/details/84321581
- openpose实时多人2D姿态估计 - weixin_41441682的博客 - CSDN博客   
https://blog.csdn.net/weixin_41441682/article/details/81357369#
- 人体姿态估计资源大列表（Human Pose Estimation） - xiaolouhan的博客 - CSDN博客   
https://blog.csdn.net/xiaolouhan/article/details/84321148
- 新人求教如何从头学习人体姿态估计 - Ilovepose http://ilovepose.luohuank.xin/t/66
论文解析与翻译：《Stacked Hourglass Networks for Human Pose Estimation》 - qq_38522972的博客 - CSDN博客  
https://blog.csdn.net/qq_38522972/article/details/82958077
- 人体姿态估计资源大列表（Human Pose Estimation） - weixin_38367817的博客 - CSDN博客  
https://blog.csdn.net/weixin_38367817/article/details/86522569
- 人体姿态估计综述（Human Pose Estimation Overview） - 青青韶华 - CSDN博客   
https://blog.csdn.net/qq_36165459/article/details/78320535?locationNum=10&fps=1
- 人体姿态估计（人体关键点检测）分类与经典方法分析（附GitHub地址） - ls83776736的博客 - CSDN博客  
https://blog.csdn.net/ls83776736/article/details/87991515
MPII Human Pose Database http://human-pose.mpi-inf.mpg.de/#results



* 3 机械手臂从零开始 写动态环境 (机器学习实战 教程教学 tutorial) - YouTube</br>https://www.youtube.com/watch?v=T5QlePZ4s3U&list=PLXO45tsB95cL8HTAlqkrmKLN_VSjlq4J8&index=3







# ReID


行人智能认知
* 行人检测
* 行人分割&背景替换
* 谷歌关键点检测&姿态识别
* 行人跟踪/MOT
* 动作识别
* 行人属性结构化
* 跨境追踪&行人再识别/ReID



