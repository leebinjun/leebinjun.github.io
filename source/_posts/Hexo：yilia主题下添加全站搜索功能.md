---
title: Hexo：yilia主题下添加全站搜索功能
date: 2020-10-31 20:32:11
tags:
---

参照ZSX的博客  
* yilia本地搜索功能  
http://zsx.pub/articl/db1d7c34.html

<!-- more -->
<The rest of contents | 余下全文>

## 安装插件
``` shell
npm install hexo-generator-search --save
```

## 配置config文件
在站点根目录下的_config.yml中添加如下配置
``` yml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

## 添加搜索框
修改themes/yilia/layout/_partial/left-col.ejs文件

``` js
    			<a q-on="click: openSlider(e, '<%-i%>')" href="javascript:void(0)"><%= theme.smart_menu[i] %></a>
    			<% } %>
            <%}%>
        </nav>
// 在上面这行代码后添加
		
		<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
		<form id="search-form"> <!-- 搜索框相关 -->
			
			<input type="text" id="local-search-input" name="q" results="0" style="text-align:center" placeholder="" class="search form-control" autocomplete="off" autocorrect="off"/>
			<i class="icon-font icon-search" onclick="resetSearch()"></i> <!-- 清空/重置搜索框  没有使用-->
		</form>
		<div id="local-search-result"></div> <!-- 搜索结果区 -->
		<p class='no-result'>无匹配结果！<i class='fa fa-spinner fa-pulse'></i></p> <!-- 无匹配时显示，注意请在 CSS 中设置默认隐藏 -->
		<script type="text/javascript" src="/search.js"></script>
		<script>
			var inputArea = document.querySelector("#local-search-input");
			var $resultArea = $("#local-search-result");
			var getSearchFile = function(){
				var path = "/search.xml";
				searchFunc(path, 'local-search-input', 'local-search-result');
			
			}
			inputArea.onfocus = function(){ getSearchFile() 
					$resultArea.bind("DOMNodeRemoved DOMNodeInserted", function(e) {
						if (!$(e.target).text()) {
							$(".no-result").show(200);
						} else {
						$(".no-result").hide();}
					})
			}
		</script>
// 在下面这行代码前添加
        <nav class="header-nav">
```

## 设置搜索框样式
在themes/yilia/source/main.xxxxxx.css文件后面添加

``` css
.search {
    width: 65%;
    height: 25px;
    margin-top: 0px;
    padding: 0;
    font-family: inherit;
    border: 2px solid transparent;
    border-bottom: 3px solid #798086;
    border-radius: 2px;
    opacity: 0.8;
    background: #fff;
  }
  .search:hover {
    border: 2px solid #d3d3d3;
    opacity: 1;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }
  /*搜索重置按钮*/
  #search-form .fa-times {
    display: none;
    padding: 1px 0.7em;
    box-shadow: 0 0 3px rgba(0,0,0,0.15);
    cursor: pointer;
    color: #ff0000;
  }
  #search-form .fa-times:active {
    background: #fff;
  }
  #search-form .fa-times:hover {
    zoom: 1.1;
    padding: 1px 0.6em;
    border: 1px solid #fff;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
  }
  
  /*搜索结果区*/
  #local-search-result {
    margin: auto -12% auto -6%;
    font-size: 0.9em;
    text-align: left;
    word-break: break-all;
  }
  
  #local-search-result ul.search-result-list li:hover {
    font-weight: normal;
  }
  
  /*单条搜索结果*/
  #local-search-result li {
    margin: 0.5em auto;
    border-bottom: 2px solid #d3d3d3;/*搜索结果分割线*/
  } 
  #local-search-result .search-result-list li:hover {
    background: rgba(158,188,226,0.21);
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
  
  /*匹配的标题*/
  #local-search-result a.search-result-title {
    line-height: 1.2;
    font-weight: bold;
    color: rgb(58,58,58);
  }
  
  /*搜索预览段落*/
  #local-search-result p.search-result {
    margin: 0.4em auto;
    line-height: 1.2em;
    max-height: 3.6em;
    overflow: hidden;
    text-align: justify;
    color: rgb(41, 40, 40);
  }
  
  /*匹配的关键词*/
  #local-search-result em.search-keyword {
    color: #f58e90;
  }
  
  /*无匹配搜索结果时显示*/
  p.no-result {
    display: none;
    margin: 2em 0 2em 6%;
    padding-bottom: 0.5em;
    text-align: left;
    color: #fff;
    font-family: font-serif serif;
    border-bottom: 2px solid #d3d3d3;
  }
```
搜索left-col，设置overflow-y属性，为搜索结果添加滑动条

``` css
left-col{
    background:#fff;width:300px;position:fixed;opacity:1;transition:all .2s ease-in;height:100%;z-index:999;
    overflow-y:auto;
    }
```

## 添加js文件
在themes/yilia/source文件夹下添加search.js文件
``` js
// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// Edited by MOxFIVE <http://github.com/MOxFIVE>

var searchFunc = function(path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener('input', function(){
                var str='<ul class=\"search-result-list\">';                
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='"+ data_url +"' class='search-result-title' target='_blank'>"+ "> " + data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out characters
                            var start = first_occur - 6;
                            var end = first_occur + 6;
                            if(start < 0){
                                start = 0;
                            }
                            if(start == 0){
                                end = 10;
                            }
                            if(end > content.length){
                                end = content.length;
                            }
                            var match_content = content.substr(start, end); 
                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                            })
                            str += "<p class=\"search-result\">" + match_content +"...</p>"
                        }
                    }
                })
                $resultContent.innerHTML = str;
            })
        }
    })
}
```

## 还需改进的地方
* search.xml文件冗余未优化
* 界面样式