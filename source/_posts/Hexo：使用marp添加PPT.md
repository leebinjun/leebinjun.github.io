---
title: Hexo：使用marp添加PPT
date: 2020-03-31 00:06:23
tags:
---


## 使用marp添加PPT

### marp
* Marp: Markdown Presentation Ecosystem  
https://marp.app/


在 themes\yilia\_config.yml 中添加 PPT 菜单
``` yml
menu:
  主页: /
  随笔: /tags/随笔/
  相册: /photos/
  PPT: /slides/
```

在 source\slides 文件夹下，生成ppt目录
```
---
title: slides
---

<style>
table th:first-of-type {
    width: 1cm;
}
table th:nth-of-type(2) {
    width: 5cm;
}
</style>


|NO.|Links|
|:-:|:-:|
|1|[test1](https://binjun.xyz/slides/index/test1.html)|
|2|[test2](https://binjun.xyz/slides/index/test2.html)|
```

在 source\slides\index 文件夹下，放置用于存放ppt图片的test文件夹和对应test.md文件

首先上传ppt图片到github上，使用github作为图床  

然后修改test.md文件中图片位置，利用marp生成对应html  
``` 
---
marp: true
theme: base
---
![bg](https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/master/slides/index/coreXY/幻灯片1.PNG)
---
```

最后将html文件放在source\slides\index 文件夹下  


