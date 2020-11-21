---
title: Hexo：主题/插入图片/代码折叠等使用技巧
date: 2019-04-20 00:33:42
tags:
---


## 插入图片

### 设置
配置blog\\_config.yml

``` yml
post_asset_folder: true
```
安装插件
``` bash
npm install hexo-asset-image --save
```

html语法
``` html
<div align=center>
<img alt="title" src = "path to xxx.png" width=999 height=999>
</div>
```

上传图片前可以压缩一下  
* 在线压缩图片,在线无损压缩图片-BeJSON.com  
http://www.bejson.com/ui/compress_img/

## markdonw代码折叠

折叠代码：
``` html
<details>
    <summary>点击查看Code</summary>
    <p>
    测试
    </p>
    <pre><code>
    for i in a:
        print(i)
    </code></pre>
</details>
```

效果如下：
<details>
    <summary>点击查看Code</summary>
    <p>
    测试
    </p>
    <pre><code>
    for i in a:
        print(i)
    </code></pre>
</details>


## 代码折叠

目前使用以下脚本  
<html>
<head>
<meta charset="utf-8"> 
<title>title_test</title> 
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
    $(document).on('click', '.fold_hider', function(){
        $('>.fold', this.parentNode).slideToggle();
        $('>:first', this).toggleClass('open');
    });
    $("div.fold").css("display","none");
});
</script>
</head>
<body>
<div>
    <div class="fold_hider">
        <div class="close hider_title">点击显示/隐藏代码</div>
    </div>
    <div class="fold">
        ``` html
        <html>
        <head>
        <meta charset="utf-8"> 
        <title>title_test</title> 
        <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
        </script>
        <script>
        $(document).ready(function(){
            $(document).on('click', '.fold_hider', function(){
                $('>.fold', this.parentNode).slideToggle();
                $('>:first', this).toggleClass('open');
            });
            $("div.fold").css("display","none");
        });
        </script>
        </head>
        <body>
        <div>
            <div class="fold_hider">
                <div class="close hider_title">点击显示/隐藏代码</div>
            </div>
            <div class="fold">
                要隐藏的部分
            </div>
        </div>
        </body>
        </html>
        ```
    </div>
</div>
</body>
</html>

* 如何配置才能让hexo搭建的博客中的代码实现折叠功能？ - 知乎  
https://www.zhihu.com/question/66271897



* 如何在Hexo中对文章md文件分类 - 貌似掉线的博客 - CSDN博客  
https://blog.csdn.net/maosidiaoxian/article/details/85220394


## 引入自定义 js 文件

在画交互图时需要引入 echarts.min.js 文件，文件可以放在以下文件夹

``` path
themes/yilia/source/js
```

将 js 放到其中，在 markdown 文章中直接引用即可

``` html
<script type="text/javascript" src="/js/test.js"></script>
```
