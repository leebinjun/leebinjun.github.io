---
title: 门禁行人检测和识别五：ipv6环境下的docker部署
date: 2019-09-16 19:33:22
tags:
  - docker
---

话说项目参加ipv6比赛时，要在ipv6环境下部署进行检验  
负责网页的A:我写好了一个框架     
负责功能的B:我写好了一个函数  
负责环境的C:我写好了一个参数  

``` python
if __name__ == "__main__":
    ''' ipv4 '''
    # app.run(host="0.0.0.0", port="80", debug=True)
    ''' ipv6 '''
    app.run(host="::", port="80", debug=True) 
```


<!-- more -->
<The rest of contents | 余下全文>

## docker

### Docker CE 的安装

移除环境中的旧版本docker
``` shell
sudo apt-get remove docker docker-engin docker.io
```

安装 Docker CE 必要依赖  
由于APT源使用HTTPS确保软件在下载过程中不被篡改.我们首先安装HTTPS传输软件包以及CA证书
``` shell
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```
由于国内网络问题，使用国内的GPG密钥

``` shell
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add
```

在APT源中添加Docker软件的源，并添加稳定版本的docker CE APT镜像源
``` shell
sudo add-apt-repository "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```


安装 Docker CE

更新apt软件包的缓存并安装docker-ce
``` shell
$ sudo apt-get update
$ sudo apt-get install docker-ce
```

验证  
使用下面的命令查看Docker的版本
``` shell
$ docker -v
```
然后使用下面的命令可以运行hello-world程序，因为Docker中还没有hello-world程序的镜像，所以会先pull（下载）下来然后运行。
``` shell
$ sudo docker run hello-world
```
如果看到打印 Hello for Docker!说明程序已经运行成功了。

### Docker 的使用

可以使用下面的命令对Docker进行启动、关闭、重启等操作。
``` shell
# 开启 Docker
$ sudo service docker start

# 关闭 Docker
$ sudo service docker stop

# 重启 Docker
$ sudo service docker restart
```


Docker 需要把应用程序及其相关的依赖打包成为一个image镜像文件，这些镜像文件可以存储在云端的存储库中，用户可以将云端的镜像文件下载到本地，然后通过这个文件，生成Docker容器的实例。

所以当你将你的应用程序及其依赖打包成一个image文件之后，可以将其上传到云端的仓库中，然后在任何一个装有Docker的机器中运行即可，这就是一次配置，到处运行，可以说是非常之方便了。

``` shell
# 查看本地 image
$ sudo docker image ls

# 下载 image
$ sudo docker pull hello-world

# 运行 image
$ sudo docker run hello-world
# 如果看到打印 Hello for Docker!说明hello-world程序已经运行成功了。

# 删除 image
$ sudo docker image rm -f hello-world
```



