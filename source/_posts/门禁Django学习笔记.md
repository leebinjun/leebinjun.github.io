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

打开settings.py, 将 应用程序 添加到 INSTALLED_APPS 元组中  

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






## mysql





### 问题1：mysql由于找不到vcruntime140.dll，无法继续执行代码

不要相信光下载一个dll放到system32文件夹然后注册一下就能搞定的这种办法，下载安装微软常用运行库合集。  

* MySQL:由于找不到VCRUNTIME140_1.dll，无法继续执行代码。重新安装程序可能会解决此问题_数据库_Read by heart-CSDN博客  
https://blog.csdn.net/weixin_42545675/article/details/104108216


初始化数据库，执行后会输出root用户的初始默认密码，如下j!9!KsxXstfL就是初始密码
``` bash
C:\Users\win10>D:\mysql-8.0.19-winx64\bin\mysqld.exe --initialize --console
2020-04-22T04:29:54.223007Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: j!9!KsxXstfL
```

安装
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysqld.exe install
Service successfully installed.
```

登录MySQL，密码是初始化的默认密码
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysql.exe -u root -p
```

修改密码
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysqladmin.exe -u root -p password
Enter password:   //这里输入上面的v:gNXSw5FTkw
New password:    //重新输入新密码
Confirm new password: //重新输入新密码
```

## 使用 Visual Studio Code 链接 MySql 数据库并进行查询

VScode 安装插件：
* MySQL
* MySQL Syntax

在文件菜单可以添加数据库连接。

### 问题2：vscode 链接 mysql，报错MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol

* MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol - 今晚打老虎i2016 - 博客园  
https://www.cnblogs.com/Jiangchuanwei/p/10238958.html

原因：登录数据库的客户端跟mysql8.0不兼容了，mysql8.0密码认证采用了新的密码格式

解决办法：在系统mysql终端输入下面命令
```
//password 是你的数据库账户密码，root和host也是
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```



右键数据库，可创建sql脚本


右键可执行


