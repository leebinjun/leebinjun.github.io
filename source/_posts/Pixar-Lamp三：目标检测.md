---
title: Pixar-Lamp三：目标检测
date: 2019-08-11 19:51:10
tags:
---

opencv的dnn模块支持直接导入网络模型进行目标检测，以下测试了ssd_caffe和yoloV3两个模型。

<!-- more -->
<The rest of contents | 余下全文>

## 使用caffe

``` python
# Labels of Network.
classNames = { 0: 'background',
    1: 'aeroplane', 2: 'bicycle', 3: 'bird', 4: 'boat',
    5: 'bottle', 6: 'bus', 7: 'car', 8: 'cat', 9: 'chair',
    10: 'cow', 11: 'diningtable', 12: 'dog', 13: 'horse',
    14: 'motorbike', 15: 'person', 16: 'pottedplant',
    17: 'sheep', 18: 'sofa', 19: 'train', 20: 'tvmonitor' }

#Load the Caffe model 
prototxt = r"MobileNetSSD_deploy.prototxt"
weights  = r"MobileNetSSD_deploy.caffemodel"
net = cv2.dnn.readNetFromCaffe(prototxt, weights)

frame_resized = cv2.resize(frame,(300,300)) # resize frame for prediction

# MobileNet requires fixed dimensions for input image(s)
# so we have to ensure that it is resized to 300x300 pixels.
# set a scale factor to image because network the objects has differents size. 
# We perform a mean subtraction (127.5, 127.5, 127.5) to normalize the input;
# after executing this command our "blob" now has the shape:
# (1, 3, 300, 300)
blob = cv2.dnn.blobFromImage(frame_resized, 0.007843, (300, 300), (127.5, 127.5, 127.5), False)
#Set to network the input blob 
net.setInput(blob)
#Prediction of network
detections = net.forward()
```




## 使用darknet

* YOLO: Real-Time Object Detection  
https://pjreddie.com/darknet/yolo/

* YOLO Object Detection with OpenCV and Python  
https://www.arunponnusamy.com/yolo-object-detection-opencv-python.html

``` python
classes_file = r"yolov3.txt"
with open(classes_file, 'r') as f:
    classes = [line.strip() for line in f.readlines()]

configs_file = r"yolov3.cfg", 
weights_file = r"yolov3.weights"
net = cv2.dnn.readNetFromDarknet(configs_file, weights_file)

blob = cv2.dnn.blobFromImage(image, 1/175, (416,416), (0,0,0), True, crop=False)
net.setInput(blob)
outs = net.forward(get_output_layers(net))
```



* ### 问题1:Unknown layer type: shortcut in function cv::dnn::darknet::ReadDarknetFromCfgFile

由于yolo3中的shortcut层还不被当前版本的opencv所支持，所以会报错，升级opencv即可。





