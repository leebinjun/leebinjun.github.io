---
title: keras版本yolov3使用和训练
date: 2019-08-14 22:40:26
tags:
  - yolo
---

## 准备
安装tensorflow和keras

下载yolov3代码
* qqwweee/keras-yolo3: A Keras implementation of YOLOv3 (Tensorflow backend) 
https://github.com/qqwweee/keras-yolo3


## 使用

下载权重文件
* https://pjreddie.com/media/files/yolov3.weights

<!-- more -->
<The rest of contents | 余下全文>

将darknet下的yolov3文件转换成keras适用的h5文件
``` bash
python convert.py yolov3.cfg yolov3.weights model_data/yolo.h5
```

运行测试程序
``` bash
python yolo.py
```

## 训练
需要新建和生成一些文件夹和文件，主要目录如下
``` html
\KREAS-YOLOV3-MASTER
│  2007_test.txt
│  2007_train.txt
│  2007_val.txt
│  voc_annotation.py
│  yolov3.cfg
│  train.py
│  yolo.py
│  
├─model_data
│      voc_classes.txt
│      yolo_anchors.txt
│      
├─VOCdevkit
│  └─VOC2007
│      │  Main_files_generate.py
│      │  
│      ├─Annotations
│      │      xxxxxx.xml
│      │      
│      ├─ImageSets
│      │  ├─Layout
│      │  ├─Main
│      │  │      test.txt
│      │  │      train.txt
│      │  │      trainval.txt
│      │  │      val.txt
│      │  │      
│      │  └─Segmentation
│      ├─JPEGImages
│      │      xxxxxx.jpg
│      │      
│      ├─SegmentationClass
│      └─SegmentationObject
├─logs
│  └─000
└─yolo3
    │  model.py
    │  utils.py
    └─ __init__.py
```

在工程下新建一个文件夹VOCdevkit，该文件夹下新建文件夹VOC2007，在目录VOCdevkit/VOC2007/下面新建五个的文件夹：
* JPEGImages    存放图片文件xxx.jpg
* Annotation    存放标签文件xxx.xml
* ImageSet      该目录下还有三个文件：Layout Main Segmentation
* SegmentationClass
* SegmentationObject

其中，Annotation文件夹下的标签文件文件，可以使用工具labelImg生成。

ImageSet/Main文件夹下的四个txt文件，由 VOCdevkit/VOC2007/Main_files_generate.py 生成。

``` python
import os
import random
 
trainval_percent = 0.2
train_percent = 0.8
xmlfilepath = 'Annotations'
txtsavepath = 'ImageSets\Main'
total_xml = os.listdir(xmlfilepath)
 
num = len(total_xml)
list = range(num)
tv = int(num * trainval_percent)
tr = int(tv * train_percent)
trainval = random.sample(list, tv)
train = random.sample(trainval, tr)
 
ftrainval = open('ImageSets/Main/trainval.txt', 'w')
ftest = open('ImageSets/Main/test.txt', 'w')
ftrain = open('ImageSets/Main/train.txt', 'w')
fval = open('ImageSets/Main/val.txt', 'w')
 
for i in list:
    name = total_xml[i][:-4] + '\n'
    if i in trainval:
        ftrainval.write(name)
        if i in train:
            ftest.write(name)
        else:
            fval.write(name)
    else:
        ftrain.write(name)
 
ftrainval.close()
ftrain.close()
fval.close()
ftest.close()
```

生成的数据集不能供yolov3直接使用，需要运行voc_annotation.py，在根目录下生成yolo3所需的2007_train.txt，2007_val.txt，2007_test.txt文件。  
在 voc_annotation.py 文件中根据你的数据集修改：
``` python
classes = ["holothurian", "scallop", "starfish", "echinus"]
```

修改yolo3.cfg文件中的参数，可以搜索[yolo]，其共出现三次，每次都按下图修改
``` python
[convolutional]
size=1
stride=1
pad=1
filters=27  # 修改为 3*(5+len(classes))
activation=linear

[yolo]
mask = 3,4,5
anchors = 10,13,  16,30,  33,23,  30,61,  62,45,  59,119,  116,90,  156,198,  373,326
classes=4 # 修改为要识别的类别数量
num=9
jitter=.3
ignore_thresh = .5
truth_thresh = 1
random=0 # 显存小的话改为0
```

修改model_data下的voc_classes.txt为自己训练的类别
``` txt
holothurian
scallop
starfish
echinus
```

创建logs/000/目录，该目录用于存放训练得到的模型。

训练
``` python
"""
Retrain the YOLO model for your own dataset.
"""
import numpy as np
import keras.backend as K
from keras.layers import Input, Lambda
from keras.models import Model
from keras.callbacks import TensorBoard, ModelCheckpoint, EarlyStopping
 
from yolo3.model import preprocess_true_boxes, yolo_body, tiny_yolo_body, yolo_loss
from yolo3.utils import get_random_data
 
 
def _main():
    annotation_path = '2007_train.txt'
    log_dir = 'logs/000/'
    classes_path = 'model_data/voc_classes.txt'
    anchors_path = 'model_data/yolo_anchors.txt'
    class_names = get_classes(classes_path)
    anchors = get_anchors(anchors_path)
    input_shape = (416,416) # multiple of 32, hw
    model = create_model(input_shape, anchors, len(class_names) )
    train(model, annotation_path, input_shape, anchors, len(class_names), log_dir=log_dir)
 
def train(model, annotation_path, input_shape, anchors, num_classes, log_dir='logs/'):
    model.compile(optimizer='adam', loss={
        'yolo_loss': lambda y_true, y_pred: y_pred})
    logging = TensorBoard(log_dir=log_dir)
    checkpoint = ModelCheckpoint(log_dir + "ep{epoch:03d}-loss{loss:.3f}-val_loss{val_loss:.3f}.h5",
        monitor='val_loss', save_weights_only=True, save_best_only=True, period=1)
    batch_size = 10
    val_split = 0.1
    with open(annotation_path) as f:
        lines = f.readlines()
    np.random.shuffle(lines)
    num_val = int(len(lines)*val_split)
    num_train = len(lines) - num_val
    print('Train on {} samples, val on {} samples, with batch size {}.'.format(num_train, num_val, batch_size))
 
    model.fit_generator(data_generator_wrap(lines[:num_train], batch_size, input_shape, anchors, num_classes),
            steps_per_epoch=max(1, num_train//batch_size),
            validation_data=data_generator_wrap(lines[num_train:], batch_size, input_shape, anchors, num_classes),
            validation_steps=max(1, num_val//batch_size),
            epochs=500,
            initial_epoch=0)
    model.save_weights(log_dir + 'trained_weights.h5')
 
def get_classes(classes_path):
    with open(classes_path) as f:
        class_names = f.readlines()
    class_names = [c.strip() for c in class_names]
    return class_names
 
def get_anchors(anchors_path):
    with open(anchors_path) as f:
        anchors = f.readline()
    anchors = [float(x) for x in anchors.split(',')]
    return np.array(anchors).reshape(-1, 2)
 
def create_model(input_shape, anchors, num_classes, load_pretrained=False, freeze_body=False,
            weights_path='model_data/yolo_weights.h5'):
    K.clear_session() # get a new session
    image_input = Input(shape=(None, None, 3))
    h, w = input_shape
    num_anchors = len(anchors)
    y_true = [Input(shape=(h//{0:32, 1:16, 2:8}[l], w//{0:32, 1:16, 2:8}[l], \
        num_anchors//3, num_classes+5)) for l in range(3)]
 
    model_body = yolo_body(image_input, num_anchors//3, num_classes)
    print('Create YOLOv3 model with {} anchors and {} classes.'.format(num_anchors, num_classes))
 
    if load_pretrained:
        model_body.load_weights(weights_path, by_name=True, skip_mismatch=True)
        print('Load weights {}.'.format(weights_path))
        if freeze_body:
            # Do not freeze 3 output layers.
            num = len(model_body.layers)-7
            for i in range(num): model_body.layers[i].trainable = False
            print('Freeze the first {} layers of total {} layers.'.format(num, len(model_body.layers)))
 
    model_loss = Lambda(yolo_loss, output_shape=(1,), name='yolo_loss',
        arguments={'anchors': anchors, 'num_classes': num_classes, 'ignore_thresh': 0.5})(
        [*model_body.output, *y_true])
    model = Model([model_body.input, *y_true], model_loss)
    return model
def data_generator(annotation_lines, batch_size, input_shape, anchors, num_classes):
    n = len(annotation_lines)
    np.random.shuffle(annotation_lines)
    i = 0
    while True:
        image_data = []
        box_data = []
        for b in range(batch_size):
            i %= n
            image, box = get_random_data(annotation_lines[i], input_shape, random=True)
            image_data.append(image)
            box_data.append(box)
            i += 1
        image_data = np.array(image_data)
        box_data = np.array(box_data)
        y_true = preprocess_true_boxes(box_data, input_shape, anchors, num_classes)
        yield [image_data, *y_true], np.zeros(batch_size)
 
def data_generator_wrap(annotation_lines, batch_size, input_shape, anchors, num_classes):
    n = len(annotation_lines)
    if n==0 or batch_size<=0: return None
    return data_generator(annotation_lines, batch_size, input_shape, anchors, num_classes)
 
if __name__ == '__main__':
    _main()
```


## 参考博客
* windows10+keras下的yolov3的快速使用及自己数据集的训练 - wangzhwsme的博客 - CSDN博客  
https://blog.csdn.net/u012746060/article/details/81183006


## 问题记录

### 问题1：运行voc_label时报错 difficult = obj.find('difficult').text AttributeError: 'NoneType' object has no ...
* VOC2007_xml格式，属性示例  
https://blog.csdn.net/w5688414/article/details/78489064

``` python    
# difficult = obj.find('difficult').text
cls = obj.find('name').text
if cls not in classes: # or int(difficult)==1:
    continue
```

## 问题2：anchor设置
* YOLO-v3模型参数anchor设置 - m_buddy的博客 - CSDN博客  
https://blog.csdn.net/m_buddy/article/details/82926024
修改相应文件路径，运行根目录下的 kmeans.py 文件

``` bash
(base) C:\Users\Administrator\Desktop\keras-yolo3-master>python kmeans.py
K anchors:
 [[ 27  24]
 [ 37  35]
 [ 47  49]
 [ 58  37]
 [ 66  57]
 [ 84  79]
 [131 105]
 [204 164]
 [377 289]]
Accuracy: 76.86%
```

