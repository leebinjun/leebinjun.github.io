---
title: Flask学习笔记
date: 2019-07-23 16:29:31
tags:
  - flask
---






### 利用循环的判断语句控制template的渲染
``` html
<head>
  {% if title %}
  <title>{{  title  }}</title>
  {% else %}
  <title>AI Workplace</title>
   {% endif %}
</head>
<body>
  <h1>Welcome to AI Workshop</h1>
  {% for i in range(2) %}
    <img src="{{ url_for('video_feed') }}">
    <p>text {{ i }}</p>
{% endfor %}
</body>
```

### 模板继承和引用
``` html
{% extends "base.html"%}

{% block content %}
{% endblock %}
```



* Basic usage — Flask-Bootstrap 3.3.7.1 documentation  
https://pythonhosted.org/Flask-Bootstrap/basic-usage.html



### 数据库

* Flask-SQLAlchemy — Flask-SQLAlchemy 2.0 documentation  
http://www.pythondoc.com/flask-sqlalchemy/index.html












### ubuntu 虚拟环境

安装Python虚拟环境的virtualenv，执行命令
``` bash
sudo apt-get install python-virtualenv
```
命令会同时安装python-virtualenv和python3-virtualenv  

安装virtualwrapper，virtualwrapper是一个简单方便的管理Python虚拟环境的工具
``` bash
pip3 install virtualenvwrapper
```

配置virtualwrapper的环境变量
``` bash
vim ~/.bashrc
```

Shift + g 到达文本最后，加入以下内容
``` bash
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export WORKON_HOME=~/Envs
source /home/lee/.local/bin/virtualenvwrapper.sh
```
其中 virtualenvwrapper.sh 和 python3 的路径可通过下面命令查看
``` bash
sudo find / -name "virtualenvwrapper.sh"
whereis python  # 查看所有python的路径，不止一个
which python3   # 查看当前使用的python路径
```

执行下面命令，使对~/.bashrc的修改生效
``` bash
source ~/.bashrc
```

新建虚拟环境
``` bash
mkvirtualenv --python=/usr/bin/python3 envname
```

进入虚拟环境
``` bash
$ workon envname
```



安装指定包
``` bash
pip install -r requirements.txt 
```



虚拟化境virtualenv下提升权限

指定python路径
``` bash
(envname)$ which python
/home/username/Envs/envname/bin/python
(envname)$ sudo /home/username/Envs/envname/bin/python server.py
```


退出虚拟环境
``` bash
(envname)$ deactivate
```










* Python-Flask-企业级论坛实战 - 随笔分类 - sellsa - 博客园  
https://www.cnblogs.com/sellsa/category/1244063.html




### URL传参

* ### path形式传参

``` python
@app.route('/article/<article_id>/')    #我们在<>里面写参数名article_id
def article_detail(article_id):         #这里的参数名要和上面的一致，即article_id
    return '您请求的文章是：{}'.format(article_id)
```

限定参数数据类型
``` python
@app.route('/article/<int:article_id>/')
```
这样当我们传递的参数是int类型的时候才能正常访问，其他类型都会返回404  

类型可以设置提下几种：  
* string: 默认的数据类型，接收没有任何斜杠"\   /"的文本
* int: 整数形
* float: 浮点型
* path: 和string类似，但是接受斜杠
* uuid: 只接受uuid字符串
* any: 可以指定多种路径，比如以下例子
``` python
@app.route('/<any(article,blog):url_path>/<id>/')
def item(url_path, id):
    if url_path == 'article':
        return '文章详情：{}'.format(id)
    else:
        return '博客详情：{}'.format(id)
```


* ### ?key=value形式传参

即在浏览器的URL中使用“?key=value”的形式传递参数（多个参数之间使用“&”连接即可），在后台则使用“from flask import request”，然后使用“request.args.get(key)”来获取参数key的值value。
``` python
from flask import Flask, request
...
 
@app.route('/d/')
def d():
    wd = request.args.get('wd')
    return '您传递的参数是: {}'.format(wd)
```
访问127.0.0.1:5000/d/?wd=hello


### URL重定向


url_for使用  
我们之前是通过url来找到对应的视图函数
*  　　/     =>    hello_world  

那么url_for则是通过视图函数找到url
* 　　hello world  =>  /

``` python
from flask import url_for

@app.route('/')
def hello_world():
    return url_for('my_list', page_id=1)

@app.route('/list/<page_id>')
def my_list():
    return 'list page'
```

在flask中，重定向是通过flask.redict(location, code=302)函数来实现的
* location表示需要重定向到的URL,应该配合url_for()函数来使用
* code表示采用哪种重定向，默认是302（临时重定向），也可以改成301来实现永久重定向
``` python
from flask import redirect

@app.route("/redirect")
def test():
    return redirect(url_for('hello'))
```
























