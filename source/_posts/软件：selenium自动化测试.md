---
title: selenium自动化测试
date: 2019-11-26 22:13:42
tags:
  - import 
---

# 什么是Selemium？

Selenium 是一个用于Web应用程序测试的工具。  
Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。  

* Selenium 官网：http://seleniumhq.org/
* Selenium Github 主页：https://github.com/SeleniumHQ/selenium

* 文档：https://python-selenium-zh.readthedocs.io/zh_CN/latest/

<!-- more -->
<The rest of contents | 余下全文>

# 安装
``` cmd
pip install selenium
```

## chrome driver的安装

查看chrome版本
``` title
chrome://version/
```
<img src = "selenium自动化测试\001.png" >

按照chrome版本下载对应的driver  

* http://chromedriver.storage.googleapis.com/index.html

将chromedriver.exe复制到Chrome浏览器安装目录  

将浏览器环境变量添加到path：打开开始菜单->我的电脑（或计算机）->系统属性->高级系统设置->环境变量，编辑用户变量里的path，


# 测试

声明并调用浏览器
``` python
from selenium import webdriver
browser = webdriver.Chrome()
```

访问网页
``` python
from selenium import webdriver#导入库
browser = webdriver.Chrome()#声明浏览器
url = 'https:www.baidu.com'
browser.get(url)#打开浏览器预设网址
print(browser.page_source)#打印网页源代码
browser.close()#关闭浏览器
```

## 实例：讲课竞赛的刷评论者


``` python
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

nicks = ["赵", "钱"]
coms = ["孙老师加油！", "李老师冲鸭！！！"]

option = Options()
option.add_experimental_option('w3c', False)
driver = webdriver.Chrome(options=option)

for i in range(len(nicks)):

    driver.get("http://348hf7.v.vote8.cn/m?Topic_2899179_Page=1")
    wait = WebDriverWait(driver, 9)
    nickname = wait.until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "#tbNickname")
    ))
    comment = wait.until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "#tbCommentContent")
    ))
    submit = wait.until(EC.element_to_be_clickable(
        (By.CSS_SELECTOR, "#btnPostComment")
    ))
    # 评论
    nickname.clear()
    comment.clear()
    nickname.send_keys(nicks[i])
    comment.send_keys(coms[i])
    time.sleep(1)
    submit.click()
    time.sleep(10)
    # 点击“确认”
    sure = wait.until(EC.element_to_be_clickable(
        (By.CSS_SELECTOR, "#pnlAlertModal")
    ))
    sure_btn = sure.find_element_by_xpath('//*[@id="pnlAlertModal"]/div/div/div[2]/a')
    sure_btn.click()

    time.sleep(20)

driver.close()
```


* selenium使用WebDriverWait报错 Cannot call non W3C standard command while in W3C mode问题解决 - weixin_44885008的博客 - CSDN博客  
https://blog.csdn.net/weixin_44885008/article/details/100523337

* 基于python的selenium定位和操作页面元素的一些方法 - shuaiashuai - 博客园  
https://www.cnblogs.com/jcshuaiashuai/p/10372616.html










