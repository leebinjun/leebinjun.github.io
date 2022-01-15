---
title: 使用labelImg制作数据集
date: 2019-10-09 20:21:20
tags:
---

## 安装


下载源码
``` cmd 
git clone https://github.com/tzutalin/labelImg.git
```
* tzutalin/labelImg: LabelImg is a graphical image annotation tool and label object bounding boxes in images  
https://github.com/tzutalin/labelImg


我使用的Python版本是Python3.6

安装依赖包
``` cmd
pip install pyqt5 -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install pyqt5-tools -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install lxml -i https://pypi.tuna.tsinghua.edu.cn/simple
```

在文件夹中，pyrcc编译资源文件
``` cmd
C:\Users\Administrator\Desktop\labelImg-master>pyrcc5 -o libs/resources.py resources.qrc
```
在libs文件夹中生成resources.py文件，或生成resource.py文件后移动到libs文件夹，否则会报下面的错
``` cmd
Traceback (most recent call last):
  File "labelImg.py", line 29, in <module>
    from libs.resources import *
ModuleNotFoundError: No module named 'libs.resources'
```

运行
``` cmd
C:\Users\Administrator\Desktop\labelImg-master>python labelImg.py
```






