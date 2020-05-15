---
title: 读研期间花销系统二：使用openpyxl读excel数据写入mysql数据库
date: 2020-05-14 01:21:14
tags:
---



## openpyxl学习笔记

``` python
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




