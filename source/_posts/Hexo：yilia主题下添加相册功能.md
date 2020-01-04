---
title: Hexo：yilia主题下添加相册功能
date: 2020-01-05 01:54:29
tags:
  - hexo
---

参考Lawlite的博客 
* Hexo+Github实现相册功能 | Lawlite的博客  
http://www.lawlite.me/2017/04/13/Hexo-Github%E5%AE%9E%E7%8E%B0%E7%9B%B8%E5%86%8C%E5%8A%9F%E8%83%BD/



## 创建图床，用于储存相册

在leebinjun.github.io仓库的dev分支创建photos_backup文件夹，用于作为图床存放相册图片。

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

<img src = "Hexo：yilia主题下添加相册功能\0.png">


修改ins.js文件，主要render函数相关路径
``` js
 var render = function render(res) {
      var ulTmpl = "";
      for (var j = 0, len2 = res.list.length; j < len2; j++) {
        var data = res.list[j].arr;
        var liTmpl = "";
        for (var i = 0, len = data.link.length; i < len; i++) {

          var minSrc = 'https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/dev/photos_backup/min_photos/' + data.link[i];
          var src = 'https://raw.githubusercontent.com/leebinjun/leebinjun.github.io/dev/photos_backup/photos/' + data.link[i];
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

修改ins.json文件，已由python脚本生成
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








