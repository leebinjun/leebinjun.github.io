---
title: 门禁人脸检测和识别四：keras人脸表情分类
date: 2019-07-11 10:23:58
tags:
  - keras
---
** {{ title }} ** <Excerpt in index | 首页摘要>

* Keras:基于Python的深度学习库 - Keras中文文档  
https://keras-cn.readthedocs.io/en/latest/
<!-- more -->
<The rest of contents | 余下全文>

### 人脸表情分类模型

``` python
#载入keras分类模型
classifier = load_model('./simple_CNN.985-0.66.hdf5')
#对图像进行分类预测
prediction = classifier.predict(ing_gray) 
```


### 模型结构的可视化

安装库
``` bash
pip install pydot
pip install pydot_ng
```

windows下，下载安装graphviz，并配置环境变量  
* Download  
http://www.graphviz.org/download/
将graphviz安装目录下的bin文件夹添加到Path环境变量中

解决“`pydot` failed to call GraphViz.”问题
查看pydot源码 
``` python
>>> import pydot
>>> pydot.__version__
'1.4.1'
>>> pydot.__file__
'J:\\Anaconda3\\envs\\env\\lib\\site-packages\\pydot.py'
```
修改pydot.py源码如下
``` python

def get_executable_extension():
    # type: () -> str
    if is_windows():
        # return '.bat' if is_anacoda() else '.exe'
        return '.exe'
    else:
        return ''
```

生成模型结构的图片
``` python 
from keras.utils.vis_utils import plot_model
model = load_model(".\simple_CNN.530-0.65.hdf5")
plot_model(model, to_file='model.png',show_shapes=True)
```

模型结构
<img src="门禁人脸检测和识别四：keras人脸表情分类\model.png">