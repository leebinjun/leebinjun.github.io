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

* 简介 - pyecharts - A Python Echarts Plotting Library  
https://pyecharts.org/#/zh-cn/intro

<!-- more -->
<The rest of contents | 余下全文>

# 安装
``` shell
pip install pyecharts
```


``` python
import pyecharts
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


``` python
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


``` python
bar.render_notebook()
```




### 生成图片

#### 安装：使用 pyecharts-snapshot插件
1. npm install -g phantomjs-prebuilt
2. 安装 Nodejs 环境
3. pip install pyecharts-snapshot


``` python
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

<img src='pyecharts数据可视化\bar.png'>

## Pie（饼图）


``` python
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

<!-- <img src='pyecharts数据可视化\pie.png'> -->
<html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <body>
        <script>
            require.config({
                paths: {
                    'echarts':'https://assets.pyecharts.org/assets/echarts.min'
                }
            });
        </script>
        <div id="dc6bc23d60bd4973916b962be084b2a3" style="width:900px; height:500px;"></div>
        <script>
            require(['echarts'], function(echarts) {
                var chart_dc6bc23d60bd4973916b962be084b2a3 = echarts.init(
                    document.getElementById('dc6bc23d60bd4973916b962be084b2a3'), 'white', {renderer: 'canvas'});
                var option_dc6bc23d60bd4973916b962be084b2a3 = {
                    "animation": true,
                    "animationThreshold": 2000,
                    "animationDuration": 1000,
                    "animationEasing": "cubicOut",
                    "animationDelay": 0,
                    "animationDurationUpdate": 300,
                    "animationEasingUpdate": "cubicOut",
                    "animationDelayUpdate": 0,
                    "color": [
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#749f83",
                        "#ca8622",
                        "#bda29a",
                        "#6e7074",
                        "#546570",
                        "#c4ccd3",
                        "#f05b72",
                        "#ef5b9c",
                        "#f47920",
                        "#905a3d",
                        "#fab27b",
                        "#2a5caa",
                        "#444693",
                        "#726930",
                        "#b2d235",
                        "#6d8346",
                        "#ac6767",
                        "#1d953f",
                        "#6950a1",
                        "#918597"
                    ],
                    "series": [
                        {
                            "type": "pie",
                            "clockwise": true,
                            "data": [
                                {
                                    "name": "\u886c\u886b",
                                    "value": 114
                                },
                                {
                                    "name": "\u6bdb\u8863",
                                    "value": 55
                                },
                                {
                                    "name": "\u9886\u5e26",
                                    "value": 27
                                },
                                {
                                    "name": "\u88e4\u5b50",
                                    "value": 101
                                },
                                {
                                    "name": "\u98ce\u8863",
                                    "value": 125
                                },
                                {
                                    "name": "\u9ad8\u8ddf\u978b",
                                    "value": 27
                                },
                                {
                                    "name": "\u889c\u5b50",
                                    "value": 105
                                }
                            ],
                            "radius": [
                                "0%",
                                "75%"
                            ],
                            "center": [
                                "50%",
                                "50%"
                            ],
                            "label": {
                                "show": true,
                                "position": "top",
                                "margin": 8,
                                "formatter": "{b}: {c}({d}%)"
                            },
                            "rippleEffect": {
                                "show": true,
                                "brushType": "stroke",
                                "scale": 2.5,
                                "period": 4
                            }
                        }
                    ],
                    "legend": [
                        {
                            "data": [
                                "\u886c\u886b",
                                "\u6bdb\u8863",
                                "\u9886\u5e26",
                                "\u88e4\u5b50",
                                "\u98ce\u8863",
                                "\u9ad8\u8ddf\u978b",
                                "\u889c\u5b50"
                            ],
                            "selected": {},
                            "show": true
                        }
                    ],
                    "tooltip": {
                        "show": true,
                        "trigger": "item",
                        "triggerOn": "mousemove|click",
                        "axisPointer": {
                            "type": "line"
                        },
                        "textStyle": {
                            "fontSize": 14
                        },
                        "borderWidth": 0
                    },
                    "title": [
                        {
                            "text": "\u67d0\u5546\u573a\u9500\u552e\u60c5\u51b5"
                        }
                    ]
                };
                chart_dc6bc23d60bd4973916b962be084b2a3.setOption(option_dc6bc23d60bd4973916b962be084b2a3);
            });
        </script>
    </body>
</html>


## Line (折线图)


``` python
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
    .set_global_opts(title_opts=opts.TitleOpts(title="Line-销售情况"))
)

line.render_notebook()

# make_snapshot(driver, line.render(), "line.png")  # 保存图片
```


<!-- <img src='pyecharts数据可视化\line.png'> -->
<html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <body>
        <script>
            require.config({
                paths: {
                    'echarts':'https://assets.pyecharts.org/assets/echarts.min'
                }
            });
        </script>
    <div id="ab9ae8ad29ab4c04a6669abb9806d43f" style="width: 900px; height: 500px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1573902998482">
        <div style="position: relative; overflow: hidden; width: 900px; height: 500px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
            <canvas data-zr-dom-id="zr_0" width="900" height="500" style="position: absolute; left: 0px; top: 0px; width: 900px; height: 500px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;">
            </canvas>
        </div>
    </div>
    <script>
        require(['echarts'], function(echarts) {
            var chart_ab9ae8ad29ab4c04a6669abb9806d43f = echarts.init(
                document.getElementById('ab9ae8ad29ab4c04a6669abb9806d43f'), 'white', {renderer: 'canvas'});
            var option_ab9ae8ad29ab4c04a6669abb9806d43f = {
                "animation": true,
                "animationThreshold": 2000,
                "animationDuration": 1000,
                "animationEasing": "cubicOut",
                "animationDelay": 0,
                "animationDurationUpdate": 300,
                "animationEasingUpdate": "cubicOut",
                "animationDelayUpdate": 0,
                "color": [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3",
                    "#f05b72",
                    "#ef5b9c",
                    "#f47920",
                    "#905a3d",
                    "#fab27b",
                    "#2a5caa",
                    "#444693",
                    "#726930",
                    "#b2d235",
                    "#6d8346",
                    "#ac6767",
                    "#1d953f",
                    "#6950a1",
                    "#918597"
                ],
                "series": [
                    {
                        "type": "line",
                        "name": "\u5546\u5bb6A",
                        "connectNulls": false,
                        "symbolSize": 4,
                        "showSymbol": true,
                        "smooth": false,
                        "step": false,
                        "data": [
                            [
                                "\u886c\u886b",
                                134
                            ],
                            [
                                "\u6bdb\u8863",
                                35
                            ],
                            [
                                "\u9886\u5e26",
                                67
                            ],
                            [
                                "\u88e4\u5b50",
                                171
                            ],
                            [
                                "\u98ce\u8863",
                                105
                            ],
                            [
                                "\u9ad8\u8ddf\u978b",
                                17
                            ],
                            [
                                "\u889c\u5b50",
                                115
                            ]
                        ],
                        "hoverAnimation": true,
                        "label": {
                            "show": true,
                            "position": "top",
                            "margin": 8
                        },
                        "lineStyle": {
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "solid"
                        },
                        "areaStyle": {
                            "opacity": 0
                        }
                    },
                    {
                        "type": "line",
                        "name": "\u5546\u5bb6B",
                        "connectNulls": false,
                        "symbolSize": 4,
                        "showSymbol": true,
                        "smooth": false,
                        "step": false,
                        "data": [
                            [
                                "\u886c\u886b",
                                114
                            ],
                            [
                                "\u6bdb\u8863",
                                55
                            ],
                            [
                                "\u9886\u5e26",
                                27
                            ],
                            [
                                "\u88e4\u5b50",
                                101
                            ],
                            [
                                "\u98ce\u8863",
                                125
                            ],
                            [
                                "\u9ad8\u8ddf\u978b",
                                27
                            ],
                            [
                                "\u889c\u5b50",
                                105
                            ]
                        ],
                        "hoverAnimation": true,
                        "label": {
                            "show": true,
                            "position": "top",
                            "margin": 8
                        },
                        "lineStyle": {
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "solid"
                        },
                        "areaStyle": {
                            "opacity": 0
                        }
                    }
                ],
                "legend": [
                    {
                        "data": [
                            "\u5546\u5bb6A",
                            "\u5546\u5bb6B"
                        ],
                        "selected": {
                            "\u5546\u5bb6A": true,
                            "\u5546\u5bb6B": true
                        },
                        "show": true
                    }
                ],
                "tooltip": {
                    "show": true,
                    "trigger": "item",
                    "triggerOn": "mousemove|click",
                    "axisPointer": {
                        "type": "line"
                    },
                    "textStyle": {
                        "fontSize": 14
                    },
                    "borderWidth": 0
                },
                "xAxis": [
                    {
                        "show": true,
                        "scale": false,
                        "nameLocation": "end",
                        "nameGap": 15,
                        "gridIndex": 0,
                        "inverse": false,
                        "offset": 0,
                        "splitNumber": 5,
                        "minInterval": 0,
                        "splitLine": {
                            "show": false,
                            "lineStyle": {
                                "width": 1,
                                "opacity": 1,
                                "curveness": 0,
                                "type": "solid"
                            }
                        },
                        "data": [
                            "\u886c\u886b",
                            "\u6bdb\u8863",
                            "\u9886\u5e26",
                            "\u88e4\u5b50",
                            "\u98ce\u8863",
                            "\u9ad8\u8ddf\u978b",
                            "\u889c\u5b50"
                        ]
                    }
                ],
                "yAxis": [
                    {
                        "show": true,
                        "scale": false,
                        "nameLocation": "end",
                        "nameGap": 15,
                        "gridIndex": 0,
                        "inverse": false,
                        "offset": 0,
                        "splitNumber": 5,
                        "minInterval": 0,
                        "splitLine": {
                            "show": false,
                            "lineStyle": {
                                "width": 1,
                                "opacity": 1,
                                "curveness": 0,
                                "type": "solid"
                            }
                        }
                    }
                ],
                "title": [
                    {
                        "text": "Line-\u9500\u552e\u60c5\u51b5"
                    }
                ]
            };
            chart_ab9ae8ad29ab4c04a6669abb9806d43f.setOption(option_ab9ae8ad29ab4c04a6669abb9806d43f);
        });
    </script>
</html>


## WordCloud（词云图）

``` python
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
    .set_global_opts(title_opts=opts.TitleOpts(title="WordCloud-示例"))
)

wordcloud.render_notebook()

# make_snapshot(driver, wordcloud.render(), "wordcloud.png")  # 保存图片
```

<!-- <img src='pyecharts数据可视化\wordcloud.png'> -->
<html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <body>
        <script>
            require.config({
                paths: {
                    'echarts':'https://assets.pyecharts.org/assets/echarts.min', 'echarts-wordcloud':'https://assets.pyecharts.org/assets/echarts-wordcloud.min'
                }
            });
        </script>
        <div id="a8dfa3633fb840cfb128c12639f5de2c" style="width: 900px; height: 500px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1573903933739"><div style="position: relative; overflow: hidden; width: 900px; height: 500px; padding: 0px; margin: 0px; border-width: 0px; cursor: pointer;"><canvas data-zr-dom-id="zr_0" width="900" height="500" style="position: absolute; left: 0px; top: 0px; width: 900px; height: 500px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 565px; top: 167px; pointer-events: none;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgb(127,21,19);"></span>Lewis Hamilton: 555</div></div>
        <script>
            require(['echarts', 'echarts-wordcloud'], function(echarts) {
                var chart_a8dfa3633fb840cfb128c12639f5de2c = echarts.init(
                    document.getElementById('a8dfa3633fb840cfb128c12639f5de2c'), 'white', {renderer: 'canvas'});
                var option_a8dfa3633fb840cfb128c12639f5de2c = {
                    "animation": true,
                    "animationThreshold": 2000,
                    "animationDuration": 1000,
                    "animationEasing": "cubicOut",
                    "animationDelay": 0,
                    "animationDurationUpdate": 300,
                    "animationEasingUpdate": "cubicOut",
                    "animationDelayUpdate": 0,
                    "color": [
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#749f83",
                        "#ca8622",
                        "#bda29a",
                        "#6e7074",
                        "#546570",
                        "#c4ccd3",
                        "#f05b72",
                        "#ef5b9c",
                        "#f47920",
                        "#905a3d",
                        "#fab27b",
                        "#2a5caa",
                        "#444693",
                        "#726930",
                        "#b2d235",
                        "#6d8346",
                        "#ac6767",
                        "#1d953f",
                        "#6950a1",
                        "#918597"
                    ],
                    "series": [
                        {
                            "type": "wordCloud",
                            "shape": "diamond",
                            "rotationRange": [
                                0,
                                0
                            ],
                            "rotationStep": 45,
                            "girdSize": 20,
                            "sizeRange": [
                                20,
                                100
                            ],
                            "data": [
                                {
                                    "name": "Sam S Club",
                                    "value": 10000,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(96,98,41)"
                                        }
                                    }
                                },
                                {
                                    "name": "Macys",
                                    "value": 6181,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(64,68,59)"
                                        }
                                    }
                                },
                                {
                                    "name": "Amy Schumer",
                                    "value": 4386,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(128,147,58)"
                                        }
                                    }
                                },
                                {
                                    "name": "Jurassic World",
                                    "value": 4055,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(136,117,98)"
                                        }
                                    }
                                },
                                {
                                    "name": "Charter Communications",
                                    "value": 2467,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(93,92,51)"
                                        }
                                    }
                                },
                                {
                                    "name": "Chick Fil A",
                                    "value": 2244,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(5,46,60)"
                                        }
                                    }
                                },
                                {
                                    "name": "Planet Fitness",
                                    "value": 1868,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(32,83,135)"
                                        }
                                    }
                                },
                                {
                                    "name": "Pitch Perfect",
                                    "value": 1484,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(22,109,154)"
                                        }
                                    }
                                },
                                {
                                    "name": "Express",
                                    "value": 1112,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(140,65,98)"
                                        }
                                    }
                                },
                                {
                                    "name": "Home",
                                    "value": 865,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(29,95,2)"
                                        }
                                    }
                                },
                                {
                                    "name": "Johnny Depp",
                                    "value": 847,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(12,141,132)"
                                        }
                                    }
                                },
                                {
                                    "name": "Lena Dunham",
                                    "value": 582,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(21,112,93)"
                                        }
                                    }
                                },
                                {
                                    "name": "Lewis Hamilton",
                                    "value": 555,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(127,21,19)"
                                        }
                                    }
                                },
                                {
                                    "name": "KXAN",
                                    "value": 550,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(36,92,90)"
                                        }
                                    }
                                },
                                {
                                    "name": "Mary Ellen Mark",
                                    "value": 462,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(52,63,149)"
                                        }
                                    }
                                },
                                {
                                    "name": "Farrah Abraham",
                                    "value": 366,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(41,132,54)"
                                        }
                                    }
                                },
                                {
                                    "name": "Rita Ora",
                                    "value": 360,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(22,77,18)"
                                        }
                                    }
                                },
                                {
                                    "name": "Serena Williams",
                                    "value": 282,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(7,40,156)"
                                        }
                                    }
                                },
                                {
                                    "name": "NCAA baseball tournament",
                                    "value": 273,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(117,2,101)"
                                        }
                                    }
                                },
                                {
                                    "name": "Point Break",
                                    "value": 265,
                                    "textStyle": {
                                        "normal": {
                                            "color": "rgb(22,53,94)"
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    "legend": [
                        {
                            "data": [],
                            "selected": {},
                            "show": true
                        }
                    ],
                    "tooltip": {
                        "show": true,
                        "trigger": "item",
                        "triggerOn": "mousemove|click",
                        "axisPointer": {
                            "type": "line"
                        },
                        "textStyle": {
                            "fontSize": 14
                        },
                        "borderWidth": 0
                    },
                    "title": [
                        {
                            "text": "WordCloud-\u57fa\u672c\u793a\u4f8b"
                        }
                    ]
                };
                chart_a8dfa3633fb840cfb128c12639f5de2c.setOption(option_a8dfa3633fb840cfb128c12639f5de2c);
            });
        </script>
    </body>
</html>



## Geo（地图）

``` python
from pyecharts import options as opts
from pyecharts.charts import Geo, Page
from pyecharts.faker import Collector, Faker
from pyecharts.globals import ChartType, SymbolType

geo_line =  (
        Geo()
        .add_schema(maptype="china")
        .add(
            "destination",
            [("广州", 55), ("北京", 66), ("杭州", 77), ("重庆", 88)],
            type_=ChartType.EFFECT_SCATTER,
            color="blue",
        )
        .add(
            "geo",
            [("广州", "上海"), ("广州", "北京"), ("广州", "杭州"), ("广州", "重庆")],
            type_=ChartType.LINES,
            effect_opts=opts.EffectOpts(
                symbol=SymbolType.ARROW, symbol_size=6, color="blue"
            ),
            linestyle_opts=opts.LineStyleOpts(curve=0.3),
        )
        .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
        .set_global_opts(title_opts=opts.TitleOpts(title="Geo-Lines"))
    )

geo_line.render_notebook()
```

<html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <body>
        <script>
            require.config({
                paths: {
                    'echarts':'https://assets.pyecharts.org/assets/echarts.min', 'china':'https://assets.pyecharts.org/assets/maps/china'
                }
            });
        </script>
        <div id="77369bcb5d9b43849d3d710b0c5af18d" style="width: 900px; height: 500px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1574061446221"><div style="position: relative; overflow: hidden; width: 900px; height: 500px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="900" height="500" style="position: absolute; left: 0px; top: 0px; width: 900px; height: 500px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas><canvas data-zr-dom-id="zr_3" width="900" height="500" style="position: absolute; left: 0px; top: 0px; width: 900px; height: 500px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div>
        <script>
            require(['echarts', 'china'], function(echarts) {
                var chart_77369bcb5d9b43849d3d710b0c5af18d = echarts.init(
                    document.getElementById('77369bcb5d9b43849d3d710b0c5af18d'), 'white', {renderer: 'canvas'});
                var option_77369bcb5d9b43849d3d710b0c5af18d = {
                    "animation": true,
                    "animationThreshold": 2000,
                    "animationDuration": 1000,
                    "animationEasing": "cubicOut",
                    "animationDelay": 0,
                    "animationDurationUpdate": 300,
                    "animationEasingUpdate": "cubicOut",
                    "animationDelayUpdate": 0,
                    "color": [
                        "blue",
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#749f83",
                        "#ca8622",
                        "#bda29a",
                        "#6e7074",
                        "#546570",
                        "#c4ccd3",
                        "#f05b72",
                        "#ef5b9c",
                        "#f47920",
                        "#905a3d",
                        "#fab27b",
                        "#2a5caa",
                        "#444693",
                        "#726930",
                        "#b2d235",
                        "#6d8346",
                        "#ac6767",
                        "#1d953f",
                        "#6950a1",
                        "#918597"
                    ],
                    "series": [
                        {
                            "type": "effectScatter",
                            "name": "destination",
                            "coordinateSystem": "geo",
                            "showEffectOn": "render",
                            "rippleEffect": {
                                "show": true,
                                "brushType": "stroke",
                                "scale": 2.5,
                                "period": 4
                            },
                            "symbolSize": 12,
                            "data": [
                                {
                                    "name": "\u5e7f\u5dde",
                                    "value": [
                                        113.23,
                                        23.16,
                                        55
                                    ]
                                },
                                {
                                    "name": "\u5317\u4eac",
                                    "value": [
                                        116.407526,
                                        39.90403,
                                        66
                                    ]
                                },
                                {
                                    "name": "\u676d\u5dde",
                                    "value": [
                                        120.19,
                                        30.26,
                                        77
                                    ]
                                },
                                {
                                    "name": "\u91cd\u5e86",
                                    "value": [
                                        106.551556,
                                        29.563009,
                                        88
                                    ]
                                }
                            ],
                            "label": {
                                "show": false,
                                "position": "top",
                                "margin": 8
                            }
                        },
                        {
                            "type": "lines",
                            "name": "geo",
                            "coordinateSystem": "geo",
                            "zlevel": 3,
                            "effect": {
                                "show": true,
                                "brushType": "stroke",
                                "scale": 2.5,
                                "period": 4,
                                "color": "blue",
                                "symbol": "arrow",
                                "symbolSize": 6
                            },
                            "symbol": [
                                "none",
                                "arrow"
                            ],
                            "polyline": false,
                            "large": false,
                            "largeThreshold": 2000,
                            "symbolSize": 12,
                            "data": [
                                {
                                    "name": "\u5e7f\u5dde->\u4e0a\u6d77",
                                    "coords": [
                                        [
                                            113.23,
                                            23.16
                                        ],
                                        [
                                            121.473701,
                                            31.230416
                                        ]
                                    ]
                                },
                                {
                                    "name": "\u5e7f\u5dde->\u5317\u4eac",
                                    "coords": [
                                        [
                                            113.23,
                                            23.16
                                        ],
                                        [
                                            116.407526,
                                            39.90403
                                        ]
                                    ]
                                },
                                {
                                    "name": "\u5e7f\u5dde->\u676d\u5dde",
                                    "coords": [
                                        [
                                            113.23,
                                            23.16
                                        ],
                                        [
                                            120.19,
                                            30.26
                                        ]
                                    ]
                                },
                                {
                                    "name": "\u5e7f\u5dde->\u91cd\u5e86",
                                    "coords": [
                                        [
                                            113.23,
                                            23.16
                                        ],
                                        [
                                            106.551556,
                                            29.563009
                                        ]
                                    ]
                                }
                            ],
                            "lineStyle": {
                                "width": 1,
                                "opacity": 1,
                                "curveness": 0.3,
                                "type": "solid"
                            },
                            "label": {
                                "show": false,
                                "position": "top",
                                "margin": 8
                            },
                            "rippleEffect": {
                                "show": true,
                                "brushType": "stroke",
                                "scale": 2.5,
                                "period": 4
                            }
                        }
                    ],
                    "legend": [
                        {
                            "data": [
                                "destination",
                                "geo"
                            ],
                            "selected": {
                                "destination": true,
                                "geo": true
                            },
                            "show": true
                        }
                    ],
                    "tooltip": {
                        "show": true,
                        "trigger": "item",
                        "triggerOn": "mousemove|click",
                        "axisPointer": {
                            "type": "line"
                        },
                        "formatter": function (params) {        return params.name + ' : ' + params.value[2];    },
                        "textStyle": {
                            "fontSize": 14
                        },
                        "borderWidth": 0
                    },
                    "title": [
                        {
                            "text": "Geo-Lines"
                        }
                    ],
                    "geo": {
                        "map": "china",
                        "roam": true,
                        "emphasis": {}
                    }
                };
                chart_77369bcb5d9b43849d3d710b0c5af18d.setOption(option_77369bcb5d9b43849d3d710b0c5af18d);
            });
        </script>
    </body>
</html>
