---
title: Django pyecharts mysql 做的网页
date: 2020-05-14 01:19:02
tags:
---
* VScode连接mysql并进行查询
* 使用openpyxl读excel数据写入mysql数据库
* Django
* pyecharts数据可视化

<!-- more -->

<The rest of contents | 余下全文>

## mysql

初始化数据库，执行后会输出root用户的初始默认密码，如下j!9!KsxXstfL就是初始密码

```bash
C:\Users\win10>D:\mysql-8.0.19-winx64\bin\mysqld.exe --initialize --console
2020-04-22T04:29:54.223007Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: j!9!KsxXstfL
```

安装

```bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysqld.exe install
Service successfully installed.
```

登录MySQL，密码是初始化的默认密码

```bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysql.exe -u root -p
```

修改密码

```bash
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

右键数据库，可创建sql脚本

<img src="Django pyecharts mysql 做的网页\01.png">

右键可执行
`<img src="Django pyecharts mysql 做的网页\02.png">`

<img src="Django pyecharts mysql 做的网页\03.png">

## 使用openpyxl读excel数据写入mysql数据库

```python
# 导入openpyxl包
>>> import openpyxl

# 加载excel文档
>>> wb = openpyxl.load_workbook('lifebill.xlsx') 
# 获取表单sheet名称
>>> wb.sheetnames
# 选择表单sheet
>>> ws = wb['汇总']   

# 选择1行B列的值cell
>>> ws['B1'] 
<Cell '汇总'.B1>
>>> ws['B1'].value
11.88
# 也可以使用cell方法获取行列值
# ws.cell(row=1, column=2, value=10)
>>> ws.cell(4,4).value
11.88
```

## Django学习笔记

参考 Eric Matthes《Python编程：从入门到实践》 第18章。

## 建立项目

### 制定规范

### 建立环境

* 虚拟环境

```shell
conda create -n my_django_env python=3.7
```

* 安装Django

```shell
pip install Django
```

### 创建项目

```shell
(my_django_env)learn_log$ django-admin startproject learning_log .
```

### 创建数据库

```shell
python manage.py migrate
```

### 查看项目

```shell
python manage.py runserver
```

## 创建应用程序

```shell
python manage.py startapp learning_logs
```

* 定义模型
  在 models.py 文件中定义模型

```python
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

```shell
python manage.py makemigrations learning_logs
```

让 Django 迁移项目

```shell
python manage.py migrate
```

* 管理网站

创建超级用户

```shell
python manage.py createsuperuser
```

向管理网站注册模型

在admin.py文件中，手工注册模型。

```python
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

```shell
python manage.py startapp camera_app
```

### 定义url

在 learning_log/urls.py 文件中

```python
urlpatterns = [
    path('admin/', admin.site.urls),
  
    path('', include('learning_logs.urls', namespace='learning_logs')),
    path('', include('camera_app.urls')),
]
```

在 camera_app/urls.py 文件中

```python
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

```python
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

```html
{% extends "camera_app/base.html"%}

{% block content %}
<p>camera_app</p>
<img src="http://127.0.0.1:8000/camtest/video_feed">
{% endblock content %}
```

## 定义url

创建show模块

```bash
python manage.py startapp show
```

<!-- more -->

<The rest of contents | 余下全文>

在项目的settings.py文件中配置

在show文件夹中的views.py文件中定义视图

```python
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("hello")
```

在show文件夹下创建urls.py文件，定义url

```python
from django.urls import include, path
from . import views

urlpatterns = [
    path('show/', views.index, name='show'),
]
```

在项目的urls.py文件中导入show下的所有路径

```python
from django.contrib import admin
from django.urls import path
from django.conf.urls import url,include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('show.urls')),
]
```

启动项目，进行访问。

## 安装pyecharts包

```bash
(env_bill) C:\my-account-bill>pip install pyecharts==1.5.1  -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 添加html模板

新建templates文件夹，放入show.html文件

```html
<!DOCTYPE html>
<html>
 
<head>
    <meta charset="utf-8">
    <title>MY-ECharts</title>
    <script src="http://oog4yfyu0.bkt.clouddn.com/echarts.min.js"></script>
    <script src="http://oog4yfyu0.bkt.clouddn.com/echarts-gl.js"></script>
    <script type="text/javascript " src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
    <script type="text/javascript " src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
    <script type="text/javascript " src="http://oog4yfyu0.bkt.clouddn.com/wordcloud.js"></script>
</head>
 
<body>
  <!-- {{data|safe}} -->
</body>
 
</html>
```

在项目的settings.py文件中配置templates文件路径

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["C:/Users/win10/Desktop/my-account-bill/templates"],
        ...
```

在show文件夹中的views.py文件中定义视图

```python
def show(request):

    # V1 版本开始支持链式调用
    bar = (
        Bar()
        .add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
        .add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
        .add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
        .set_global_opts(title_opts=opts.TitleOpts(title="某商场销售情况"))
    )
    # bar.render()
    data = {'data': bar.render_embed()}
    return render(request, 'show.html', data)
```

在show文件夹下创建urls.py文件，定义url

```python
urlpatterns = [
    path('show/', views.index, name='show'),
    path('show/1/', views.show),
]
```

安装bootstrap

```bash
pip install django-bootstrap3
```

设置

### 问题1：mysql由于找不到vcruntime140.dll，无法继续执行代码

不要相信光下载一个dll放到system32文件夹然后注册一下就能搞定的这种办法，下载安装微软常用运行库合集。

* MySQL:由于找不到VCRUNTIME140_1.dll，无法继续执行代码。重新安装程序可能会解决此问题_数据库_Read by heart-CSDN博客
  https://blog.csdn.net/weixin_42545675/article/details/104108216

### 问题2：vscode 链接 mysql，报错MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol

* MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol - 今晚打老虎i2016 - 博客园
  https://www.cnblogs.com/Jiangchuanwei/p/10238958.html

原因：登录数据库的客户端跟mysql8.0不兼容了，mysql8.0密码认证采用了新的密码格式

解决办法：在系统mysql终端输入下面命令

```
//password 是你的数据库账户密码，root和host也是
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

## SQL语句

查看前1000个数据

```sql
SELECT * FROM `my_bill`.`dailybill_dailybill` LIMIT 1000;
```

将表1数据复制到表2

* Mysql复制表结构、表数据的方法_Mysql_脚本之家
  https://www.jb51.net/article/73187.htm

```sql
insert into dailybill_dailybill(id,
                                date,
                                breakfast,
                                lunch    ,
                                dinner   ,
                                fruit    ,
                                drink    ,
                                snack    ,
                                wash     ,
                                phone    ,
                                text )
    select  td.id,
            td.date,
            td.breakfast,
            td.lunch   ,
            td.dinner  ,
            td.fruit   ,
            td.drink   ,
            td.snack   ,
            td.wash    ,
            td.phone   ,
            "l"
    from tb_daily as td where td.id < 1080;
```

查找包含switch的数据

```sql
SELECT * FROM `my_bill`.`consumebill_consumebill` where goods like "%switch%";
```

按日期排序

```sql
SELECT * FROM `my_bill`.`consumebill_consumebill` ORDER BY date;
```

降序

```sql
SELECT * FROM `my_bill`.`consumebill_consumebill` ORDER BY date DESC;
```

### 问题1：Win10 PowerShell无法激活Anaconda环境

查看conda版本为4.5.6

```bash
conda --version
```

升级一下，升级后版本为4.8.3

```bash
conda update conda
```

Win + X 组合键调出PowerShell管理员模式，重启shell

```bash
conda init powershell
```

关闭PowerShell后重试，成功。

```bash
(base) PS C:\Users\win10\Desktop> conda env list
# conda environments:
#
base                  *  C:\ProgramData\Anaconda3
env_bill                 C:\ProgramData\Anaconda3\envs\env_bill
py38                     C:\ProgramData\Anaconda3\envs\py38

(base) PS C:\Users\win10\Desktop> conda activate env_bill
(env_bill) PS C:\Users\win10\Desktop> code
```
