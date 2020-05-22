---
title: 读研期间花销系统四：Django+pyecharts数据可视化
date: 2020-05-16 00:41:59
tags:
---


## 定义url

创建show模块
``` bash
python manage.py startapp show
```

在项目的settings.py文件中配置

在show文件夹中的views.py文件中定义视图
``` python
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("hello")
```

在show文件夹下创建urls.py文件，定义url
``` python
from django.urls import include, path
from . import views

urlpatterns = [
    path('show/', views.index, name='show'),
]
```

在项目的urls.py文件中导入show下的所有路径
``` python
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
``` bash
(env_bill) C:\my-account-bill>pip install pyecharts==1.5.1  -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 添加html模板

新建templates文件夹，放入show.html文件
``` html
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
``` python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["C:/Users/win10/Desktop/my-account-bill/templates"],
        ...
```

在show文件夹中的views.py文件中定义视图
``` python
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
``` python
urlpatterns = [
    path('show/', views.index, name='show'),
    path('show/1/', views.show),
]
```













安装bootstrap
``` bash
pip install django-bootstrap3
```
设置

