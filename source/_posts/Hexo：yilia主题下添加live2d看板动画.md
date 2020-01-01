---
title: 'Hexo：yilia主题下添加live2d看板动画'
date: 2020-01-01 19:09:10
tags:
  - hexo
---

<div align=center>
<img src = "Hexo：yilia主题下添加live2d看板动画\01.png">
</div>

<!-- more -->
<The rest of contents | 余下全文>

## 安装依赖项
``` bash
$ npm install --save hexo-helper-live2d
```

## 下载模型
* hexo live2d插件 2.0 ! | 幻想帖  
https://huaji8.top/post/live2d-plugin-2.0/

选好对应的模型，使用 “npm install 模型的包名” 来安装
``` bash
$ npm install live2d-widget-model-wanko
```

## 配置信息

在主题下的_config.yml文件中添加相关配置信息
``` yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-wanko
  display:
    position: right
    width: 300
    height: 600
  mobile:
    show: true
  react:
    opacity: 0.7
```
