---
title: Hexo：yilia主题下添加背景音乐播放器
date: 2021-01-25 19:55:58
tags:
---

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

歌曲的歌词文件lrc和封面地址cover可以通过[音乐直链搜索工具](https://music.liuzhijin.cn/
)获取。


## Reference

* Hexo 全局添加 APlayer 音乐播放器 | Clay的技术博客  
https://www.techgrow.cn/posts/cfdad023.html

* 音乐直链搜索|音乐在线试听 - by 刘志进实验室  
https://music.liuzhijin.cn/

* 如何获取网易云音乐播放外链 - 知乎  
https://zhuanlan.zhihu.com/p/104569759
