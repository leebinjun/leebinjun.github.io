---
title: Hexo：Hello Hexo 使用hexo+github搭建个人博客
date: 2019-04-19 22:30:18
tags:
  - hexo
toc: true
---
** {{ title }} ** <Excerpt in index | 首页摘要>
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

<!-- more -->

<The rest of contents | 余下全文>

# 使用hexo+github搭建个人博客

## 准备

* 注册github账号

安装软件

* git：版本控制系统，利用git可以将代码托管到github上
  http://git-scm.com/
* node.js：JavaScript 运行环境，npm是随同nodejs一起安装的包管理工具
  http://nodejs.org/

查看是否安装成功

```bash
$ git --version
git version 2.28.0.windows.1
$ npm -v
6.14.6
$ node -v
v12.18.3
```

## 部署

### 安装hexo

```bash
$ npm install hexo-cli -g

安装hexo-deployer-git工具
$ npm install hexo-deployer-git --save

npm install 慢的话 显示当前的镜像网址
$ npm get registry 
使用淘宝的镜像网址
$ npm config set registry http://registry.npm.taobao.org

```

### 静态博客搭建

```bash
$ hexo init blog
$ cd blog
$ npm install
$ hexo s
```

浏览器访问：http://localhost:4000/
按Ctrl+C停止

### 配置到GitHub

在github上创建仓库，仓库名称为：用户名.github.io
配置blog\\_config.yml中的deploy

```yml
deploy:
  type: git
  repo: git@github.com:your_github_user_name/your_github_user_name.github.io.git
  branch: master
```

在远程仓库配置SSH公钥来进行认证

```bash
验证ssh key
$ ssh -T git@github.com

在本地hexo init生成的文件夹中初始化git仓库
$ git init

将本地仓库和远程仓库连接
$ git remote add origin git@github.com:your_github_user_name/your_github_user_name.github.io.git
```

### 网站部署

```bash
$ hexo new "My New Post"   //新建页面
$ cls                      //清屏
$ hexo clean               //清除缓存文件db.json和已生成的静态文件public
$ hexo g(generate)         //生成网站静态文件到默认设置的public文件夹
$ hexo s(server)           //开启服务器预览网址
$ hexo d(deploy)           //部署网站到设定的仓库
```

hexo其他命令

```
$ hexo help                   查看帮助
$ hexo version                查看Hexo的版本
```

## 主题

### 挑选主题

* Themes | Hexo https://hexo.io/themes/
* Themes · hexojs/hexo Wiki https://github.com/hexojs/hexo/wiki/Themes

常用的主题是next主题。

## 添加主题

复制主题到themes目录下

```bash
cd themes && git clone https://github.com/maochunguang/black-blue(主题地址)
```

配置blog\\_config.yml，修改对应主题目录名

```yml
theme: 主题名称
```

## 绑定域名

### 在域名的解析设置中添加记录

<img src='Hexo：Hello Hexo\000.png'>

| 参数     | 值                              | 说明                     |
| :------- | :------------------------------ | :----------------------- |
| 记录类型 | CNAME                           |                          |
| 主机记录 | @                               | 域名前缀 @直接解析主域名 |
| 解析路线 | 默认                            |                          |
| 记录值   | your_github_user_name.github.io |                          |
| TTL      | 10分钟                          | 缓存时间                 |

### 在github添加自定义域名

<img src='Hexo：Hello Hexo\001.png'>

### 配置hexo的_config.yml

```yml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://www.yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```

### 上传CNAME文件

在/hexo/source目录下，新建一个CNAME文件，内容为域名，上传更新


# Hexo：主题/插入图片/代码折叠等使用技巧

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

# Hexo：yilia主题下添加背景音乐播放器

## 配置config文件

在站点根目录下的_config.yml中添加如下配置

``` yml
aplayer:
  enanble: true
```

## 添加播放器样式

修改themes/yilia/layout/_partial/left-col.ejs文件，添加下面代码

``` html
<% if(theme.aplayer.enable) { %>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
    <!-- // 这里div的样式是笔者自己修改过的，你可以直接使用APlayer官方的原配置： -->
    <div id="aplayer" style="position:absolute;left:0;top:0;"></div>
    <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/color-thief-don@2.0.2/src/color-thief.js"></script>
    <script>
        const ap = new APlayer({
        container: document.getElementById('aplayer'),
        autoplay: false, //自动播放
        listFolded: true, //播放列表默认折叠
        listMaxHeight: 90, //播放列表最大高度
        order: 'list', //音频循环顺序, 可选值: 'list', 'random'
        loop: 'all', //音频循环播放, 可选值: 'all', 'one', 'none'
        theme: '#e9e9e9', //切换音频时的主题色，优先级低于audio.theme
        preload: 'none', //音频预加载，可选值: 'none', 'metadata', 'auto'
        mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
        lrcType: 3, //歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式）
        volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
        // mini: true,
        // fixed: true, //吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
        audio: [
        {
            name: 'City Of Stars',
            artist: 'Ryan Gosling',
            lrc: 'data:application/octet-stream;base64,WzAwOjE5LjgyXUNpdHkgb2Ygc3RhcnMsClswMDoyMy4wMV1hcmUgeW91IHNoaW5pbmcganVzdCBmb3IgbWU/ClswMDoyOS42NV1DaXR5IG9mIHN0YXJzLApbMDA6MzIuNzRddGhlcmUncyBzbyBtdWNoIHRoYXQgSSBjYW4ndCBzZWUuClswMDozOS4yOF1XaG8ga25vd3MsClswMDo0Mi4zN11pcyB0aGlzIHRoZSBzdGFydCBvZiBzb21ldGhpbmcgd29uZGVyZnVsIGFuZCBuZXcsClswMDo0OS42Nl1vciBvbmUgbW9yZSBkcmVhbSB0aGF0IEkgY2Fubm90IG1ha2UgdHJ1ZT8K',
            cover: 'https://p4.music.126.net/zqGxChorQDtXQxNoT45hww==/3426078245816925.jpg?param=300x300',
            url: 'https://music.163.com/song/media/outer/url?id=421203025.mp3'
        },
        ]
        });
    
        //实现切换音频时，根据音频的封面图片自适应主题色
        const colorThief = new ColorThief();
        const setTheme = (index) => {
        if (!ap.list.audios[index].theme) {
            colorThief.getColorAsync(ap.list.audios[index].cover, function(color) {
            ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
            });
        }
        };
        setTheme(ap.list.index);
        ap.on('listswitch', (data) => {
        setTheme(data.index);
        });
    </script>
<% } %>
```

其中歌曲的url为如下格式,xxx处替换相应的id号

``` txt
https://music.163.com/song/media/outer/url?id=xxxxxxxxx.mp3
```

歌曲的歌词文件lrc和封面地址cover可以通过[音乐直链搜索工具](https://music.liuzhijin.cn/)获取。

## Reference

* Hexo 全局添加 APlayer 音乐播放器 | Clay的技术博客  
https://www.techgrow.cn/posts/cfdad023.html

* 音乐直链搜索|音乐在线试听 - by 刘志进实验室  
https://music.liuzhijin.cn/

* 如何获取网易云音乐播放外链 - 知乎  
https://zhuanlan.zhihu.com/p/104569759


# Hexo：yilia主题下添加live2d看板动画

<div align=center>
<img src='Hexo：Hello Hexo\002.png'>
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
    width: 200 # 宽度
    height: 400 # 高度
    hOffset: 50 #水平偏移
    vOffset: -95 #垂直偏移
  mobile:
    show: false # 在移动端取消显示
  react:
    opacity: 0.7
```

# Hexo：yilia主题下添加相册功能

参考Lawlite的博客 
* Hexo+Github实现相册功能 | Lawlite的博客  
http://www.lawlite.me/2017/04/13/Hexo-Github%E5%AE%9E%E7%8E%B0%E7%9B%B8%E5%86%8C%E5%8A%9F%E8%83%BD/



## 创建图床，用于储存相册

在leebinjun.github.io仓库新建data分支，专门用于存储图片。
``` shell
git branch data
git checkout data
```

在data分支创建photos_backup文件夹，用于作为图床存放相册图片。

在photos文件夹放入原始图片，运行py文件处理原图，在min_photos文件夹生成图标文件，并生成data.json文件。

``` python
def cut_photo():
    """裁剪算法
    ----------
    调用Graphics类中的裁剪算法，将src_dir目录下的文件复制到des_dir下裁剪成正方形
    """
    src_dir, des_dir = "photos_backup/photos/", "photos_backup/min_photos/"
    if directory_exists(src_dir) and directory_exists(des_dir):
        file_list = list_img_file(src_dir)
        file_list_des = list_img_file(des_dir)
        # print file_list
        if file_list:
            for infile in file_list:
                if infile not in file_list_des:
                    img = Image.open(src_dir+infile)
                    g = Graphics(infile=src_dir+infile, outfile=des_dir+infile)
                    g.cut_by_ratio()
                else:
                    file_list.remove(infile)
        else:
            pass
    else:
        print("source directory not exist!")     
    
    # 进行压缩
    compress('4', des_dir, des_dir, file_list)

if __name__ == "__main__":
    
    print_help()
    resize_photo()       # 压缩图片，不大于1080P，保存到photos文件夹下
    cut_photo()          # 裁剪图片，裁剪成正方形,并压缩，保存到mini_photos文件夹下
    # git_operation()    # 提交到github仓库
    handle_photo()       # 将文件处理成json格式，存到博客仓库中    
```

## 博客操作

在博客的source文件夹下建立一个photos文件夹
``` cmd
hexo new page photos
```

由于之前hexo插入图片对blog\\_config.yml进行过配置

``` yml
post_asset_folder: true
```

photos文件夹会自动生成一个index.md文件和一个同名文件夹

清空photos文件夹，放入相关样式文件，如下

* leebinjun.github.io/source/photos at dev · leebinjun/leebinjun.github.io  
https://github.com/leebinjun/leebinjun.github.io/tree/dev/source/photos

<!-- <img src = "Hexo：yilia主题下添加相册功能\0.png"> -->
<img src='Hexo：Hello Hexo\003.png'>


修改ins.js文件，主要render函数相关路径
``` js
 var render = function render(res) {
      var ulTmpl = "";
      for (var j = 0, len2 = res.list.length; j < len2; j++) {
        var data = res.list[j].arr;
        var liTmpl = "";
        for (var i = 0, len = data.link.length; i < len; i++) {

          var minSrc = 'https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/data/photos_backup/min_photos/' + data.link[i];
          var src = 'https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/data/photos_backup/photos/' + data.link[i];
          var type = data.type[i];
          // var target = src + (type === 'video' ? '.mp4' : '.jpg');
          var target = src;
          // src += '.jpg';

          liTmpl += '<figure class="thumb" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">\
                <a href="' + src + '" itemprop="contentUrl" data-size="640x640" data-type="' + type + '" data-target="' + target + '">\
                  <img class="reward-img" data-type="' + type + '" data-src="' + minSrc + '" src="empty.png" itemprop="thumbnail" onload="lzld(this)">\
                </a>\
                <figcaption style="display:none" itemprop="caption description">' + data.text[i] + '</figcaption>\
            </figure>';
        }
        ulTmpl = ulTmpl + '<section class="archives album"><h1 class="year">' + data.year + '<em>' + data.month + '月</em></h1>\
        <ul class="img-box-ul">' + liTmpl + '</ul>\
        </section>';
      }
      document.querySelector('.instagram').innerHTML = '<div class="photos" itemscope="" itemtype="http://schema.org/ImageGallery">' + ulTmpl + '</div>';
      createVideoIncon();
      _view2.default.init();
    };
```

修改ins.json文件，与data分支中由python脚本生成的data.json同步
``` json
{"list": [{"date": "2020-01", "arr": {"year": 2020, "month": 1, "link": ["2020-01-04_\u6d4b\u8bd5.jpg"], "text": ["\u6d4b\u8bd5"], "type": ["image"]}}]}
```


配置themes\yilia\\_config.yml文件，在侧边栏添加相册
``` yml
# Header
menu:
  主页: /
  相册: /photos/
  随笔: /tags/随笔/
```

