---
title: 象棋残局机器人三：分类模型retrain
date: 2019-05-29 00:27:39
tags:
  - tensorflow
  - 迁移学习
---
** {{ title }} ** <Excerpt in index | 首页摘要>
基于InceptionV3和mobileNet模型重新训练自己的图片分类模型。
<!-- more -->
<The rest of contents | 余下全文>


## 迁移学习

图片分类模型往往有数以万计的参数，而从头开始训练需要大量的带标签训练数据、强大的算力和更多时间，利用迁移学习，可以在前人优秀图片分类模型的基础上，非常快捷有效地重新训练出新的图像分类器。  
通常来说，迁移学习的策略有两种。
* Finetuning（微调）  
包括在基础数据集上使用预训练网络，并在目标数据集上训练所有层。
* Freeze and Train（冻结和训练）  
包括仅冻结并训练最后一层，其他层不变（权重不更新）；也可以冻结前几层，微调其他层，这是由于有些证据表明CNN的前几层有纹理滤镜和彩色斑点。

## 流程
1. predo.py，准备自己要分类的图片训练样本；
2. retrain.py，下载inception v3/mobileNet模型及训练图片分类器；
3. label_image.py，测试模型预测结果。

### 预处理
``` python
import os
import cv2

path = "./data"
files = os.listdir(path) 
# print(files)
for f in files: 
    print(f)
    cnt = 0
    data_list = os.listdir(path+'/'+f)
    # print(data_list[:4])
    for data in data_list:
        data_file_path = path+'/'+f+'/'+data 
        # img = cv2.imread(data_file_path)
        # img_resize = cv2.resize(img, (300, 300))
        # cv2.imwrite(path+'/'+f+'/'+"{:04d}.jpg".format(cnt), img_resize)
        newname = path+'/'+f+'/'+"{:04d}.jpg".format(cnt)
        os.rename(data_file_path, newname)
        cnt += 1
    #     if cnt == 2:
    #         break
    # break
```

### retrain
* tensorflow/retrain.py at c565660e008cf666c582668cb0d0937ca86e71fb · tensorflow/tensorflow  
https://github.com/tensorflow/tensorflow/blob/c565660e008cf666c582668cb0d0937ca86e71fb/tensorflow/examples/image_retraining/retrain.py

源码分析  
* TensorFlow学习笔记：Inception_v3源码分析 - 简书  
https://www.jianshu.com/p/feecdcdef8a0
``` bash
# By default: Inception v3
python retrain.py
# mobileNet
python retrain.py --image_dir ./daata --architecture mobilenet_1.0_224
```
可以提前下载模型文件到./tmp/imagenet文件夹下。
* Google AI Blog: MobileNets: Open-Source Models for Efficient On-Device Vision  
https://ai.googleblog.com/2017/06/mobilenets-open-source-models-for.html

### 测试
``` python
import tensorflow as tf
import os
import numpy as np
import re
import shutil

lines = tf.gfile.GFile('./tmp/output_labels.txt').readlines()
uid_to_human = {}
#一行一行读取数据
for uid,line in enumerate(lines) :
    #去掉换行符
    line=line.strip('\n')
    uid_to_human[uid] = line
 
def id_to_string(node_id):
    if node_id not in uid_to_human:
        return ''
    return uid_to_human[node_id]
 
#创建一个图来存放google训练好的模型
with tf.gfile.FastGFile('./tmp/output_graph.pb', 'rb') as f:
    graph_def = tf.GraphDef()
    graph_def.ParseFromString(f.read())
    tf.import_graph_def(graph_def, name='')
 
with tf.Session() as sess:
    softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
    #遍历目录
    for root,dirs,files in os.walk('./test/'):
        # print("root[-1]:", root[-1]) # 类别
        # print("files:", files)
        
        for file in files:
            print(root+"/"+file)
            #载入图片
            image_data = tf.gfile.FastGFile(root+"/"+file, 'rb').read()
            predictions = sess.run(softmax_tensor,{'DecodeJpeg/contents:0': image_data})#图片格式是jpg格式
            predictions = np.squeeze(predictions)#把结果转为1维数据
 
            #打印图片路径及名称
            image_path = os.path.join(root,file)
            # print(image_path)
            # #显示图片
            # img=Image.open(image_path)
            # plt.imshow(img)
            # plt.axis('off')
            # plt.show()
 
            # 打印结果
            top_k = predictions.argsort()[::-1]
            # print(top_k)
            for node_id in top_k:     
                # 获取分类名称
                human_string = id_to_string(node_id)
                # 获取该分类的置信度
                score = predictions[node_id]
                print('%s (score = %.5f)' % (human_string, score))
            
            # 将识别错误文件保存到bad文件夹
            if id_to_string(top_k[0]) != root[-1]:
                old_path = root + "/" + file
                name, _ = file.split('.')
                new_path = r'./bad' + '/' + name + '_' + id_to_string(top_k[0]) + '_' + str(predictions[top_k[0]]) +'.jpg' 
                shutil.copyfile(old_path, new_path)

```

## 问题汇总
### 1. 使用mobileNet时 TypeError: Cannot interpret feed_dict key as Tensor: The name 'DecodeJpeg/contents:0' refers to a Tensor which does not exist. The operation, 'DecodeJpeg/contents', does not exist in the graph.

* TypeError: Cannot interpret feed_dict key as Tensor: The name 'DecodeJpeg/contents:0' refers to a Tensor which does not exist. The operation, 'DecodeJpeg/contents', does not exist in the graph. · Issue #12250 · tensorflow/tensorflow  
https://github.com/tensorflow/tensorflow/issues/12250

打印图的参数名称
``` python
tensor_name_list = [tensor.name for tensor in tf.get_default_graph().as_graph_def().node]
print(tensor_name_list)
```
修改输入为第一个tensor的名称
``` python
# inceptionV3
# image_data = tf.gfile.FastGFile(image_path, 'rb').read()
# predictions = sess.run(softmax_tensor, {'DecodeJpeg/contents:0': image_data}) #图片格式是jpg格式
# predictions = np.squeeze(predictions) #把结果转为1维数据

# mobileNet
image_data = tf.gfile.FastGFile(image_path, 'rb').read()
image_data = sess.run(tf.expand_dims(tf.image.resize_images(
    tf.image.decode_jpeg(image_data), [128, 128], method=np.random.randint(0,3)), 0))
predictions = sess.run(softmax_tensor, {'input:0': image_data}) #图片格式是jpg格式
predictions = np.squeeze(predictions) #把结果转为1维数据
```
### 2. 分类速度太慢： 0.8s一张图，32个棋子大概需要20多秒
对于棋子分类任务来说，输入是一张28*28的3通道图片，无论使用InceptionV3还是mobileNet_128模型都过于“厚重”，最终手写一个小的卷积网络，通过两层卷积+两层全连接来实现棋子分类。
<div align=center>
<img src='象棋残局机器人三：分类模型retrain\001.png' width=600 height=300>
</div>
<div align=center>
<img src='象棋残局机器人三：分类模型retrain\002.png' width=600 height=300>
</div>


## 参考资料

* 浅谈迁移学习图像分类 - weixin_33805743的博客 - CSDN博客  
https://blog.csdn.net/weixin_33805743/article/details/87426423

