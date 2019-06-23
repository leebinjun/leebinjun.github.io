---
title: Scikit-Learn学习笔记
date: 2019-05-02 20:56:38
tags:
  - sklearn
---
** {{ title }}：** <Excerpt in index | 首页摘要>

## 选择学习方法
Sklearn官网提供了一个流程图
<div align=center>
<img src = "Scikit-Learn学习笔记\machine_learning_map.png" width=600 height=300>
</div>
<!-- more -->
<The rest of contents | 余下全文>


## 通用学习模式
### 导入模块
``` python
import numpy as np
from sklearn import datasets
from sklearn.cross_validation import train_test_split
from sklearn.neighbors import KNeighborsClassifier
```
### 加载数据
``` python
iris = datasets.load_iris()
iris_X = iris.data
iris_y = iris.target 
print(iris_X[:2,:])
print(iris_y)
```
### 划分训练集和测试集
``` python
X_train, X_test, y_train, y_test = train_test_split(iris_X, iris_y, test_size = 0.3)
```
### 创建模型，训练，预测
``` python
knn = KNeighborsClassifier()
knn.fit(X_train, y_train)
print(knn.predict(X_test))
print(y_test)
```
### 模型保存和加载
* method 1: pickle

``` python
import pickle
from sklearn.externals import joblib
# save
with open('clf.pickle', 'wb') as f:
    pickle.dump(model, f)
# restore
with open('clf.pickle', 'rb') as f:
    model = pickle.load(f)
```

* method 2: joblib

``` python
from sklearn.externals import joblib
# save
joblib.dump(model, 'clf.plk')
# restore
model2 = joblib.load('clf.plk')
```

## datasets数据库 
### sklearn.datasets
* API Reference — scikit-learn 0.20.3 documentation  
https://scikit-learn.org/stable/modules/classes.html#module-sklearn.datasets

### Sklearn的数据表示
* 数据表
* 特征矩阵
* 目标数组
``` python
# 用seaborn加载数据
import seaborn as sns
iris = sns.load_dataset('iris')
iris.head()
# 可视化
%matplotlib inline
import seaborn as sns; sns.set()
sns.pairplot(iris, hue='species', size=1.5);
# 抽取特征矩阵和目标数组
X_iris = iris.drop('species', axis=1)
X_iris.shape
y_iris = iris['species']
y_iris.shape
```

## Sklearn评估器API
### 步骤 
(1)选择模型类;  
(2)配置模型超参数(hyperparameter);  
(3)整理数据，获取特征矩阵和目标数组;  
(4)调用模型实例的fit()方法对数据进行拟合;  
(5)对新数据应用模型:有监督用predict()预测标签,无监督用transform()或predict()转换或推断数据性质。

## model
### 属性  
model.intercept_  
model.coef_  
### 功能  
model.predict  
model.score  

## 模型验证

## 数据预处理
### 标准化
### 缺失值
### 特征工程



## 参考博客
* jakevdp/PythonDataScienceHandbook: Python Data Science Handbook: full text in Jupyter Notebooks  
https://github.com/jakevdp/PythonDataScienceHandbook  
* 莫烦Python  
https://morvanzhou.github.io/  
* 使用sklearn做单机特征工程 - jasonfreak - 博客园  
https://www.cnblogs.com/jasonfreak/p/5448385.html

