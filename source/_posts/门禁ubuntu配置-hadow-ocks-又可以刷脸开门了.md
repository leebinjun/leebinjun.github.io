---
title: '门禁ubuntu配置$hadow$ocks,又可以刷脸开门了'
date: 2019-04-27 23:30:03
tags:
---

* Shadowsocks - A secure socks5 proxy </b>http://shadowsocks.org/en/index.html

### 安装
``` bash
$ sudo apt-get install python-pip
$ sudo pip install shadowsocks
$ sudo apt-get install software-properties-common -y
$ sudo add-apt-repository ppa:max-c-lv/shadowsocks-libev -y
$ sudo apt-get update
$ sudo apt install shadowsocks-libev
```
### 配置
``` bash
$ sudo vim /etc/shadowsocks-libev.json
    
    {
        "server":"xx.xx.xx.xx",
        "server_port":2080,
        "local_address": "127.0.0.1",
        "local_port":1080,
        "password":"xxxxxxxx",
        "timeout":300,
        "method":"chacha20-ietf-poly1305",
        "workers": 2,
        "fast_open": false
    }
```
### 运行
``` bash
$ ss-local -c /etc/shadowsocks-libev.json
```
### 设置全局代理
系统设置 -> 网络 -> 网络代理，方法选择手动，然后设置Socks主机127.0.0.1， 后面端口这是1080，然后点击应用到整个系统，输入密码即可。
### 设置浏览器代理
直接搜索proxy，找到设置后根据实际情况设置，不要使用系统代理设置
### 设置开机自启
``` bash
$ cd /etc/init.d
```
创建开机启动服务
``` bash
$ sudo vim shadowsocks

    #!/bin/bash
    /usr/bin/ss-local -c /etc/shadowsocks-libev.json
    exit  0
```
报“missing LSB tags and overrides”错，在#!/bin/bash下面添加
``` bash
    ### BEGIN INIT INFO
    # Provides: OSSEC HIDS
    # Required-Start: $network $remote_fs $syslog $time
    # Required-Stop:
    # Default-Start: 2 3 4 5
    # Default-Stop: 0 1 6
    # Short-Description: OSSEC HIDS
    ### END INIT INFO
```
赋予可执行权限
``` bash
$ sudo chmod +x shadowsocks
```
设置开机自启动
``` bash
$ sudo update-rc.d shadowsocks defaults 100
```




