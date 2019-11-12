---
title: pyecharts数据可视化
date: 2019-11-10 14:33:01
tags:
---



# 什么是pyecharts
    pyecharts 是一个用于生成 Echarts 图表的类库。 

　　echarts 是百度开源的一个数据可视化 JS 库，主要用于数据可视化。pyecharts 是一个用于生成 Echarts 图表的类库。实际上就是 Echarts 与 Python 的对接。

　　使用 pyecharts 可以生成独立的网页，也可以在 flask , Django 中集成使用。

* pyecharts/pyecharts: 🎨 Python Echarts Plotting Library  
https://github.com/pyecharts/pyecharts


<!-- more -->
<The rest of contents | 余下全文>

# 安装
``` shell
pip install pyecharts
```


```python
import pyecharts
```


```python
pyecharts.__version__
```




    '1.5.1'



# 使用方法
``` python
chart_object = Type()       # 初始化具体类型图表
chart_object.add()          # 添加图表的数据和设置各种配置项
chart_object.show_config()  # 打印所有配置项
chart_object.render()       # 生成 .html 文件；支持 path 参数，设置文件保存位置，如 render(r"e:my_first_chart.html")，文件用浏览器打开。
```

默认的编码类型为 UTF-8。


# 示例

## Bar（柱状图/条形图）

### 生成html


```python
from pyecharts.charts import Bar
from pyecharts import options as opts

# V1 版本开始支持链式调用
bar = (
    Bar()
    .add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
    .add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
    .add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
    .set_global_opts(title_opts=opts.TitleOpts(title="某商场销售情况"))
)
bar.render()

# 不习惯链式调用的开发者依旧可以单独调用方法
bar = Bar()
bar.add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
bar.add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
bar.add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
bar.set_global_opts(title_opts=opts.TitleOpts(title="某商场销售情况"))
bar.render()
```




    'C:\\Users\\Administrator\\Desktop\\Python-BaseTutorial-master\\render.html'



### 在 jupyter notebook 中显示 


```python
bar.render_notebook()
```

<img src='pyecharts数据可视化\bar.png'>



### 生成图片

#### 安装：使用 pyecharts-snapshot插件
1. npm install -g phantomjs-prebuilt
2. 安装 Nodejs 环境
3. pip install pyecharts-snapshot



```python
# from snapshot_selenium import snapshot as driver
from snapshot_phantomjs import snapshot as driver

from pyecharts import options as opts
from pyecharts.charts import Bar
from pyecharts.render import make_snapshot


def bar_chart() -> Bar:
    c = (
        Bar()
        .add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
        .add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
        .add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
        .reversal_axis()
        .set_series_opts(label_opts=opts.LabelOpts(position="right"))
        .set_global_opts(title_opts=opts.TitleOpts(title="Bar-测试渲染图片"))
    )
    return c

# 需要安装 snapshot-selenium 或者 snapshot-phantomjs
make_snapshot(driver, bar_chart().render(), "bar.png")
```

## Pie（饼图）


```python
from pyecharts.charts import Pie
from pyecharts import options as opts

key = ["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"]
val = [114, 55, 27, 101, 125, 27, 105]

pie = (
    Pie()
    .add("", [list(z) for z in zip(key, val)])
    .set_global_opts(title_opts=opts.TitleOpts(title="某商场销售情况"))
    .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}({d}%)"))
)

pie.render_notebook()

# make_snapshot(driver, pie.render(), "pie.png")  # 保存图片
```


<img src='pyecharts数据可视化\pie.png'>




## Line (折线图)


```python
from pyecharts.charts import Line
from pyecharts import options as opts

key = ["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"]
values1 = [134, 35, 67, 171, 105, 17, 115]
values2 = [114, 55, 27, 101, 125, 27, 105]


line = (
    Line()
    .add_xaxis(key)
    .add_yaxis("商家A", values1)
    .add_yaxis("商家B", values2)
    .set_global_opts(title_opts=opts.TitleOpts(title="Line-基本示例"))
)

line.render_notebook()

# make_snapshot(driver, line.render(), "line.png")  # 保存图片
```


<img src='pyecharts数据可视化\line.png'>




## WordCloud（词云图）


```python
from pyecharts import options as opts
from pyecharts.charts import Page, WordCloud

words = [
    ("Sam S Club", 10000),
    ("Macys", 6181),
    ("Amy Schumer", 4386),
    ("Jurassic World", 4055),
    ("Charter Communications", 2467),
    ("Chick Fil A", 2244),
    ("Planet Fitness", 1868),
    ("Pitch Perfect", 1484),
    ("Express", 1112),
    ("Home", 865),
    ("Johnny Depp", 847),
    ("Lena Dunham", 582),
    ("Lewis Hamilton", 555),
    ("KXAN", 550),
    ("Mary Ellen Mark", 462),
    ("Farrah Abraham", 366),
    ("Rita Ora", 360),
    ("Serena Williams", 282),
    ("NCAA baseball tournament", 273),
    ("Point Break", 265),
]

wordcloud = (
    WordCloud()
#     .add("", words, word_size_range=[20, 100])
    .add("", words, word_size_range=[20, 100], shape="diamond")    # 词云图的形状可以通过shape参数来选择
    .set_global_opts(title_opts=opts.TitleOpts(title="WordCloud-基本示例"))
)

wordcloud.render_notebook()

# make_snapshot(driver, wordcloud.render(), "wordcloud.png")  # 保存图片
```


<img src='pyecharts数据可视化\wordcloud.png'>

