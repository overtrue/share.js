[Share.js](http://overtrue.me/share.js/)
===

一键分享到微博，QQ空间，QQ好友，微信，豆瓣，使用字体图标。

![image](https://cloud.githubusercontent.com/assets/1472352/11419582/4c7ff370-9463-11e5-8b83-356940a2824e.png)

[DEMO](http://overtrue.me/share.js/)

或者直接浏览我的博客 http://overtrue.me 或者 http://laravel.so 内容页查看效果。

# 安装

有两种安装方式：

1. 使用 [npm](https://npmjs.com)

```shell
npm install social-share.js
```

2. 手动下载或者 git clone 本项目。

# 使用


HTML:

```html
<div class="share-component"></div>

<!-- share.css -->
<link rel="stylesheet" href="dist/css/share.css">

<!-- jQuery -->
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>

<!-- share.js -->
<script src="dist/js/jquery.qrcode.min.js"></script> <!-- for QRcode -->
<script src="dist/js/share.js"></script>
// 当你使用类名为 `share-component` 时不需要手动初始化
```

## 自定义配置

所有配置**可选**， 通常默认就满足需求：

```js
var $config = {
	//...
   };

$('.share-component').share($config);
```

可用的配置有：

```js

url                 : '', // 网址，默认使用 window.location.href
source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : '', // 图片, 默认取网页中第一个img标签
sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
wechatQrcodeTitle   : "微信扫一扫：分享", // 微信二维码提示文字
wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
```

以上选项均可通过标签 `data-xxx` 来设置：

> 驼峰转为中横线，如`wechatQrcodeHelper` 的data标签为`data-wechat-qrcode-helper`

##### 禁用 google、设置分享的描述

```html
<div class="share-component" data-disabled="google" data-description="Share.js - 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣"></div>
```

##### 设置微信二维码标题

```html
<div class="share-component" data-wechat-qrcode-title="请打开微信扫一扫"></div>
```

##### 针对特定站点使用不同的属性（title, url, description,image...）

```html
<div class="share-component" data-weibo-title="这个标题只有的分享到微博时有用，其它标题为全局标题" data-qq-title="分享到QQ时用此标题"></div>
```

### 你也可以自定义图标

使用: `data-initialized="true"` 标签或者 `initialized` 配置项来禁用自动生成icon功能。

```html
<div class="share-component" data-initialized="true">
    <a href="#" class="iconfont icon-weibo"></a>
    <a href="#" class="iconfont icon-qq"></a>
    <a href="#" class="iconfont icon-qzone"></a>
</div>
```
以上a标题会自动加上分享链接（`a` 标签必须带 `icon-NAME` 属性，不然分享链接不会自动加上）。

欢迎贡献代码及提建议！

# License

 MIT


