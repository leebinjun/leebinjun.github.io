---
title: 象棋残局机器人七：B站封面爬取残局数据集
date: 2019-04-12 23:22:10
tags:
---

## 步骤

* 下载封面图片
* 截取棋盘
* 识别局面信息


## 爬取B站视频封面

* b站封面提取_bilibili封面提取_av号封面提取  
http://www.galmoe.com/

``` python
# -*- coding: utf-8 -*-
import json
import requests

def request_download(img_url):
    import requests
    r = requests.get(img_url)
    with open('./data/tmp.png', 'wb') as f:
        f.write(r.content) 

# av = input('请输入AV号')
av = ""
url = "http://www.galmoe.com/t.php?aid=%s" % (av,)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
}

response = requests.get(url, headers=headers, verify=False)
# print(response.text)
# {"result":1,"url":"https://i2.hdslb.com/bfs/archive/b8cae05b0640ae50557285e57daeb03fa9fc8162.jpg"}
# {'result': 0}

# 获取到的是str字符串 需要解析成json数据
content = json.loads(response.text)

statue_code = content.get('result')
if statue_code == 1:
    img_url = content.get('url')
    request_download(img_url)
    print('封面图片下载完成')
else:
    print('该AV号不存在')
```


<img src="象棋残局机器人七：B站封面爬取残局数据集\01.png">

爬取up主老师视频的AV号
``` python
# -*- coding: utf-8 -*-
import requests
import re

def request_download(img_url, file_name="temp"):
    import requests
    r = requests.get(img_url)
    with open(f'./data/{file_name}.png', 'wb') as f:
        f.write(r.content) 

def get_avid(url):
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0",
    }
    response = requests.get(url=url, headers=headers)
    # print(response.text)

    # 正则匹配得到AV号
    # "bvid":"BV117411P7gw",
    string = r'"bvid":"(.*?)",'
    pattern = re.compile(string)
    result = pattern.findall(response.text)

    # print(result)
    return result

if __name__ == "__main__":
    # test
    # page = 3
    # url = f"https://api.bilibili.com/x/space/arc/search?mid=488815689&ps=30&tid=0&pn={page}&keyword=&order=pubdate&jsonp=jsonp"
    # rst = get_avid(url)
    # print(rst)
    
    for page in range(1, 8):
        url = f"https://api.bilibili.com/x/space/arc/search?mid=488815689&ps=30&tid=0&pn={page}&keyword=&order=pubdate&jsonp=jsonp"
        rst = get_avid(url)
        print(rst)
```


爬取B站视频封面
``` python
# -*- coding: utf-8 -*-
import requests
import re

def request_download(img_url, file_name="temp"):
    import requests
    r = requests.get(img_url)
    with open(f'./data/{file_name}.png', 'wb') as f:
        f.write(r.content) 

def get_imgdata(av_id):
    url = f"https://www.bilibili.com/video/{av_id}"
    print(url)
    headers={
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }

    response = requests.get(url=url, headers=headers)
    # print(response.text)

    # 正则匹配得到封面图片网页
    # <meta data-vue-meta="true" itemprop="image" content="http://i2.hdslb.com/bfs/archive/b8cae05b0640ae50557285e57daeb03fa9fc8162.jpg">
    string = r'itemprop="image" content="(.*?)">'
    pattern = re.compile(string)
    result = pattern.findall(response.text)
    # print(result)

    # 下载图片
    if len(result) == 1:
        img_url = result[0]
        # print(img_url)
        request_download(img_url, file_name=av_id)
        print('封面图片下载完成')
    else:
        print('该AV号不存在')

if __name__ == "__main__":
    # test
    # av = "BV17z411b7AL"
    # get_imgdata(av_id=av)

    av_list =  ['BV1EE411T79A', 'BV1JE411T7gU', 'BV1UE411g71T', 'BV12E411g7eu', 'BV11E411p7qM', 'BV19E411p7Gc', 'BV1KE411s7Z2', 'BV1rE411x7Gb', 'BV1bE411s7qY', 'BV18E411s7Aa', 'BV1KE41147EK', 'BV1KE41147T1', 'BV1sE411j7G1', 'BV1sE411j7hk', 'BV1pE411j7SS', 'BV1WE411j7cv', 'BV1PE411J7k1', 'BV1NE411J7JE', 'BV1UE411n7Jk', 'BV12E411n7a8', 'BV117411P7gw', 'BV117411P72s', 'BV1w7411K7h9', 'BV1p7411T7fd', 'BV1H7411T7EF', 'BV1P7411u7Wz', 'BV1A7411u7Fv', 'BV1Jj411f7XT', 'BV1nj411f7Kj', 'BV1nj411f7ba']
    for av in av_list:
        get_imgdata(av_id=av)
```

``` python
# -*- coding: utf-8 -*-
from get_avid import get_avid
from get_img import get_imgdata


for page in range(1, 8):
    url = f"https://api.bilibili.com/x/space/arc/search?mid=488815689&ps=30&tid=0&pn={page}&keyword=&order=pubdate&jsonp=jsonp"
    avid_list = get_avid(url)
    print(avid_list)
    for av in avid_list:
        get_imgdata(av_id=av)
```