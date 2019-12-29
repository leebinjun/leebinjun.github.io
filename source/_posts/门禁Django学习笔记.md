---
title: 门禁Django学习笔记
date: 2019-12-03 15:57:16
tags:
---

参考 Eric Matthes《Python编程：从入门到实践》 第18章。

<!-- more -->
<The rest of contents | 余下全文>

## 建立项目

### 制定规范

### 建立环境
* 虚拟环境
``` shell
conda create -n my_django_env python=3.7
```
* 安装Django
``` shell
pip install Django
```
### 创建项目
``` shell
(my_django_env)learn_log$ django-admin startproject learning_log .
```
### 创建数据库
``` shell
python manage.py migrate
```

### 查看项目
``` shell
python manage.py runserver
```

## 创建应用程序
``` shell
python manage.py startapp learning_logs
```

* 定义模型
在 models.py 文件中定义模型
``` python
# Create your models here.
class Topic(models.Model):
    """用户学习的主题"""
    text = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """返回模型的字符串表示"""
        return self.text
```

* 激活模型

打开settings.py, 将应用程序添加到 INSTALLED_APPS 元组中  

对 应用程序 调用 makemigrations, 让Django确定如何修改数据库
``` shell
python manage.py makemigrations learning_logs
```

让 Django 迁移项目
``` shell
python manage.py migrate
```

* 管理网站

创建超级用户
``` shell
python manage.py createsuperuser
```

向管理网站注册模型

在admin.py文件中，手工注册模型。
``` python
# Register your models here.
from learning_logs.models import Topic

admin.site.register(Topic)
```


* Django Shell

## 创建网页

定义URL、编写视图和编写模板

### 定义URL  

### 编写视图  

### 编写模板  

## 实例：实时监控

### 创建应用程序
``` shell
python manage.py startapp camera_app
```

### 定义url

在 learning_log/urls.py 文件中
``` python
urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include('learning_logs.urls', namespace='learning_logs')),
    path('', include('camera_app.urls')),
]
```

在 camera_app/urls.py 文件中
``` python
# from django.urls import path
from django.urls import include, path
from . import views

urlpatterns = [
    # 相机
    path('camtest/', views.camtest, name='camtest'),
    path('camtest/video_feed/', views.video_feed),
]
```

### 编写视图  

在 camera_app/views.py 文件中
``` python
from django.shortcuts import render
from django.http import StreamingHttpResponse

import cv2
# 调用camera包
from .camera import Camera

# Create your views here.

def gen(camera):
    """Video streaming generator function."""
    # cap = cv2.VideoCapture(0)
    # ret, img = cap.read()
    
    while True:
        # ret, img = cap.read()
        frame = camera.get_frame()

        # 图像处理
        # ret, img = detector.detect(frame, is_save=True)
        img = frame

        # cv2.imshow("", img)
        # cv2.waitKey(10)
        # # encode as a jpeg image and return it
        img = cv2.imencode('.jpg', img)[1].tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

def video_feed(request):
    """Video streaming route. Put this in the src attribute of an img tag."""
    # cap = Camera()
    # cap.set_video_source(0)
    return StreamingHttpResponse(gen(Camera()), content_type='multipart/x-mixed-replace; boundary=frame')

def camtest(request):
    return render(request, 'camera_app/camtest.html')

```

### 编写模板  


在 camera_app/templates/camera_app/camtest.html 文件中
``` html
{% extends "camera_app/base.html"%}

{% block content %}
<p>camera_app</p>
<img src="http://127.0.0.1:8000/camtest/video_feed">
{% endblock content %}
```








