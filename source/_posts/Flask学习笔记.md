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

