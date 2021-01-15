---
title: Hexo：使用marp添加PPT
date: 2020-03-31 00:06:23
tags:
---


## 使用marp添加PPT

### hexo相关设置

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

### Marp相关语法

* Marp: Markdown Presentation Ecosystem  
  https://marp.app/

如果是之前已经做好的ppt，可以使用WPS直接将每页ppt转成图片。

记得上传ppt图片到图床上，这里的图床可以使用github或者七牛云等。  

将每页图片的地址插入到md文本中，利用marp生成对应html。  

最后将html文件放在source\slides\index 文件夹下。  

``` md
---
marp: true
theme: base
---
![bg](https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/master/slides/index/coreXY/幻灯片1.PNG)
---
```

### 使用七牛云作为图床

对于已认证的个人用户，七牛云提供了10GB存储、10GB下载流量和10万次PUT/月100万次GET/月的免费额度，对于博客的使用是完全足够的。

* 七牛云
  https://portal.qiniu.com

目前七牛云提供的测试域名只有30天有效期，所以我们需要绑定自己的域名进行访问。
对于未备案的域名，**存储区域**只能选择国外，并使用**自定义源站域名**绑定域名。

* 存储空间域名管理 - 七牛开发者中心
  https://developer.qiniu.com/kodo/kb/5859/domain-name-to-access-the-storage-space

自定义源站域名时，使用二级域名img.binjun.xyz

在阿里云配置域名的CNAME记录解析，记录值填写七牛云提供的地址，以保证能正常访问空间。

* 如何配置域名的 CNAME - 七牛开发者中心
  https://developer.qiniu.com/fusion/kb/1322/how-to-configure-cname-domain-name

配置好后使用**nslookup 域名**测试。

``` bash
C:\Users\user>nslookup img.binjun.xyz
服务器:  acca-ad-p-2.acca.com.cn
Address:  10.1.2.172

DNS request timed out.
    timeout was 2 seconds.
非权威应答:
名称:    as-gate-io.qiniu.com
Addresses:  23.248.173.8
          23.248.173.13
          23.248.173.7
Aliases:  img.binjun.xyz
          iovip-as0.qbox.me
```

#### Hexo七牛同步插件

* 压缩图 -在线图片压缩工具(jpg、png、gif)无损压缩50%
  https://www.yasuotu.com/

* Hexo七牛同步插件
  https://github.com/gyk001/hexo-qiniu-sync

* 使用七牛为Hexo存储图片等资源 | 跬步
  http://yuchen-lea.github.io/2016-01-21-use-qiniu-store-file-for-hexo/
