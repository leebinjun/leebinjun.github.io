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




### 问题1：Win10 PowerShell无法激活Anaconda环境

查看conda版本为4.5.6
``` bash
conda --version
```
升级一下，升级后版本为4.8.3
``` bash
conda update conda
```
Win + X 组合键调出PowerShell管理员模式，重启shell
``` bash
conda init powershell
```
关闭PowerShell后重试，成功。
``` bash
(base) PS C:\Users\win10\Desktop> conda env list
# conda environments:
#
base                  *  C:\ProgramData\Anaconda3
env_bill                 C:\ProgramData\Anaconda3\envs\env_bill
py38                     C:\ProgramData\Anaconda3\envs\py38

(base) PS C:\Users\win10\Desktop> conda activate env_bill
(env_bill) PS C:\Users\win10\Desktop> code
```
