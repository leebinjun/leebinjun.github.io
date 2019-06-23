---
title: Hexo：yilia主题下使用LaTex添加公式
date: 2019-06-22 22:30:18
tags:
  - hexo
---

## 配置文件中开启mathjax

修改/themes/yilia主题目录下的_config.yml文件,添加支持Mathjax
``` bash
    # 数学公式
    mathjax: true
```

## 安装Kramed
更换Hexo的markdown渲染引擎为hexo-renderer-kramed引擎，后者支持mathjax公式输出。
``` bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```
打开/node_modules/hexo-renderer-kramed/lib/renderer.js，进行如下更改：
``` bash
    // Change inline math rule
    function formatText(text) {
    // Fit kramed's rule: $$ + \1 + $$
    // return text.replace(/`\$(.*?)\$`/g, '$$$$$1$$$$');
    return text;
    }
```
### 停止使用 hexo-math，并安装mathjax包
``` bash
npm uninstall hexo-math --save
npm install hexo-renderer-mathjax --save
```
打开/node_modules/hexo-renderer-mathjax/mathjax.html,更新Mathjax的配置文件
``` bash
    <!-- <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML"></script>
```

### 更改默认转义规则
LaTeX与markdown语法有语义冲突，需要修改\node_modules\kramed\lib\rules\inline.js中的默认规则
``` bash
    var inline = {
        // escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
        escape: /^\\([`*\[\]()# +\-.!_>])/,
        // em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

### 公式输入相关

Mathpix Snip工具：只要截图就能识别公式，手写的公式都能识别，可以方便转换图片的公式到word、markdown和latex文件。  
* Mathpix Snip </br>https://mathpix.com/

基本语法
* 03-用Jupyter编写数学公式 - ds19991999的博客 - CSDN博客 </br>https://blog.csdn.net/ds19991999/article/details/81275580


### VScode下markdown公式预览
安装markwown math扩展插件，重启，预览时使用快捷键 ctrl + shift + p