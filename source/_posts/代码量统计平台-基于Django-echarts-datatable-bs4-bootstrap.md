---
title: '代码量统计平台:定时作业、数据大屏和钉钉机器人'
date: 2022-09-24 15:32:52
tags:
---

# codecode

## 代码统计相关

![](image/readme/1648966424737.png)

<!-- more -->
<The rest of contents | 余下全文>

## Django

### MVC

Django项目由一系列应用程序组成，新建monthReport应用

```bash
python manage.py startapp month_report 
```

数据库迁移

```
python manage.py makemigrations

python manage.py migrate
```

启动

``` bash
python manage.py runserver 0.0.0.0:8001 --insecure
```

### 问题

* 解决Invalid HTTP_HOST header: 'xxx.xx.xxx.xxx:8000'. You may need to add 'xxx.xx' to ALLOWED_HOSTS！-CSDN博客
  https://blog.csdn.net/lezeqe/article/details/83820621

## Docker服务器部署

服务器用了两个镜像，一个用于mysql数据库的，另一个用于django服务。

### 搭建mysql服务

mysql镜像使用服务器上原有的镜像mysql:1.0
创建并启动了一个叫xxxx-mysql容器

```bash
docker run -p 3309:3306 --name xxxx-mysql -e MYSQL_ROOT_PASSWORD=****** -d mysql:1.0
```

进入sql数据库创建用户和相关数据库code

```bash
docker exec -it xxxx-mysql bash
> mysql -uroot -p******
> grant all privileges on *.* to 'xxxx'@'%' identified by '******' with grant option;
#  *.*是 数据库名.表名,数据库名为*表示所有数据库，表名为*表示所有表，*.*是表示root权限，即满权限
#  %是 主机名，表示本地和远程均可连接，localhost表示仅允许本地连接，
#  flush privileges；表示刷新权限，使授权生效
> CREATE DATABASE code;
```

* 使用Docker搭建MySQL服务 - sablier - 博客园
  https://www.cnblogs.com/sablier/p/11605606.html

### 搭建djongo服务

服务器不具有联网功能，所以需要在本地打包镜像上传到服务器。

准备Dockerfile和requirements.txt文件

```Dockerfile
# Pure Python

FROM python:3.7
LABEL author="xxxx"

# RUN apt-get update

ENV PYTHONIOENCODING=utf-8

# Build folder
RUN mkdir -p /deploy/app
WORKDIR /deploy/app
COPY /requirements.txt /deploy/app/requirements.txt
RUN pip install -r requirements.txt

CMD ["/bin/bash"]
```

requirements.txt文件生成

```bash
pip freeze > requirements.txt
```

本地打包镜像

```bash
docker build -t imagexxx:latest .
docker save imagexxx:latest -o imagexxx.tar
```

![](image/readme/1638794164288.png)

上传镜像到服务器，部署

```bash
  cd /data/xxxx/
  ls
  # 加载镜像
  docker load -i image20211204001_37_1.tar
  # 查看镜像
  docker image ls
  # 创建并启动code容器
  docker run -it -p 8000:8000 --name code -v /data/xxxx/codecode:/deploy/app image20211204001:3.7
  # 查看所有的容器
  docker ps -a
  # 启动code容器
  docker start code
  # 进入code容器
  docker attach code
  # 停止mysql容器
  docker stop xxxx-mysql
```

![](image/readme/1638795079680.png)

```bash
> python manage.py runserver 0.0.0.0:8001
```

attach进入容器，使用Ctrl+c退出容器后会发送一个SINKILL信号停止容器运行，如果不想容器退出，可以使用CTRL+p CTRL+q.

### 搭建redis服务

* Docker 安装 Redis | 菜鸟教程
  https://www.runoob.com/docker/docker-install-redis.html

```bash
# 拉取官方最新镜像
docker pull redis:latest
# 查看本地镜像
docker image ls
# 运行容器
docker run -itd --name xxxx-redis -p 6379:6379 redis:latest
# 进入容器并通过redis-cli连接测试
docker exec -it xxxx-redis /bin/bashs # win10
docker exec -it xxxx-redis bash # linux
root@bf719c39c2cf:/data# redis-cli
127.0.0.1:6379> set test 1
OK
# 设置redis密码
127.0.0.1:6379> config set requirepass ********
OK
# 查看redis密码
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "********"
```

在settings.py文件中添加CACHE配置

```py
CACHES = {
  "default":{
    "BACKEND":"django_redis.cache.RedisCache",
    "LOCATION":"redis://127.0.0.1:6379/1",  # DB设为1
    "TIMEOUT":None,  # 永久缓存，默认300秒
    "OPTIONS":{
      "CLIENT_CLASS":"django_redis.client.DefaultClient",
      "PASSWORD":"******" # 密码
    }
  }
}
```

测试缓存是否成功

```py
(base) D:\Workplace\codecode>activate my_django_env

(my_django_env) D:\Workplace\codecode>python manage.py shell
Python 3.7.11 (default, Jul 27 2021, 09:42:29) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from django.core.cache import cache 
>>> cache.set('v', '123', 60*60)
True
>>> cache.has_key('V')        
False
>>> cache.has_key('v') 
True
>>> cache.get('v')   
'123'
>>>
```

![](image/readme/1638963468079.png)

### Docker常用命令

```bash
# 删除镜像
$ docker rmi image_id
# 停止容器
$ docker stop container_name
# 删除容器
$ docker rm container_id
```


## 前端相关

### Bootstrap

下载地址:

* https://v3.bootcss.com/getting-started/#download

选择第二个,下载带有源码的bootstrap

* Django中引入bootstrap的方法_grfstc的博客-CSDN博客_bootstrap django
  https://blog.csdn.net/grfstc/article/details/124581471


## 定时作业

### APScheduler

``` bash
pip install django-apscheduler
```

* Django定时任务四种实现方法总结_Yale曼陀罗的博客-CSDN博客_django 定时任务
  https://blog.csdn.net/weixin_42782150/article/details/123212604


## 404相关

当debug=Fasle时，如果仍希望静态资源应用程序提供静态资源，Django提供了insecure参数来强制处理静态资源，但是这样处理静态资源效率非常低，而且极不安全。因此，仅用于本地开发，不要在生产环境中使用。

``` bash
python manage.py runserver 0.0.0.0:8001 --insecure
```

## python

### json 和 dict

``` python
data = "{'小曹': 208, '小李': 0, '小邓': 196, '小张': 18, '小付': 143, '小郭': 3, '小王': 154, '小白': 6, '小刘': 70, '小德': 13}"
data = data.replace("'",'"')
adict = json.loads(data)
ajson = json.dumps(adict)
```

### datetime

``` python 

    # datetime.datetime
    # 获取当天
    dt = datetime.datetime.now()

    # string转date
    dt = datetime.datetime.fromtimestamp(time.mktime(time.strptime("2022-07-20","%Y-%m-%d"))) 

    # 5天前
    dt - datetime.timedelta(days=5)

    # date转String
    dt.strftime("%Y-%m-%d")    

    # 获取星期
    dt.weekday() + 1

```


# 可视化大屏

## 技术准备

* pyecharts
* Django
* Jquery/JS
* HTML+CSS

## 技术实现

### 0. 明确设计和展示内容

### 1. Pyecharts制作可视化大屏

1.1 使用pyecharts.charts.Page生成Demo

``` python
    page.render(r'.\fine_report\templates\test.html')
    return render(request, 'test.html', {})
```

1.2 调整布局，保存chart_config.json文件，并利用它生成最终展示页面的静态版本 report.html

``` python
    page.render(r'.\fine_report\templates\test.html')
    # return render(request, 'test.html', {})

    page.save_resize_html(r'.\fine_report\templates\test.html', cfg_file=r'.\fine_report\templates\chart_config.json', dest=r'.\fine_report\templates\report.html')

    return render(request, 'report.html', {})
```

* 全文3000字，Pyecharts制作可视化大屏全流程 - 知乎
  https://zhuanlan.zhihu.com/p/438014813

### 2. ajax动态刷新数据

2.1 Django定时任务，定时更新数据库数据

2.2 修改report.html，添加ajax访问后台刷新数据脚本

* 使用Django利用pyecharts进行Ajax异步请求_Alex抱着爆米花的博客-CSDN博客
  https://blog.csdn.net/qq_41080854/article/details/114639603


# 每日定时发送钉钉图片到群聊

## 思路

1. 访问内网网页，使用wkhtmltoimage生成图片。

3. 上传图片到外网服务器上。

2. 钉钉机器人自动发送图片链接到群聊。 

## 环境准备

### 外网图片服务器

使用阿里云免费一个月的ECS，启动一个django WEB应用，用于接收图片并展示。

云服务器配置安全组规则，端口使用80，使用其他端口时使用公司电脑访问被拒绝。

启动Django项目并使其在后台一直运行

``` bash
nohup python3 manage.py runserver 0.0.0.0:80 &
```

### 本地作业应用

``` bash
conda create --name ding_env python=3.7.11
conda activate ding_env

# django
pip install Django==3.2.9
pip install django-apscheduler==0.6.2

pip install requests==2.28.1
pip install requests-toolbelt==0.9.1

# imgkit
pip install imgkit
pip install pdfkit

```

### Django项目创建和启动

``` bash
# 创建项目
django-admin startproject dingrobot
# 创建应用
python manage.py startapp daily_picture

# 数据库迁移
python manage.py makemigrations
python manage.py migrate

# 启动
python manage.py runserver 127.0.0.1:8009
```

## 技术细节

### 定时作业使用django-apscheduler

* Django定时任务四种实现方法总结_Yale曼陀罗的博客-CSDN博客_django 定时任务
  https://blog.csdn.net/weixin_42782150/article/details/123212604

### 钉钉机器人相关

* 钉钉机器人文档说明
  https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
  https://open.dingtalk.com/document/robots/customize-robot-security-settings
  https://open.dingtalk.com/document/robots/custom-robot-access

### 图片生成

放弃了pyechats渲染方案，使用WKHTMLTOPDF将HTML转成图片

* 【Python】Python将HTML转成图片、PDF - 灰信网（软件开发博客聚合）
  https://www.freesion.com/article/73311337680/
