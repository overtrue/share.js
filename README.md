Share.js
===

> 🚨 此项目已经年久失修，其实分享就是一个个链接而已，每个链接里传递一些内容，所以定制需求比较高的话建议自己实现，没啥难度。
> URL 写法请参考：https://github.com/overtrue/share.js/blob/master/src/js/social-share.js#L56-L64

一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站。

![qq20151127-1 2x](https://cloud.githubusercontent.com/assets/1472352/11433126/05f8b0e0-94f4-11e5-9fca-74dc9d1b633f.png)


# 安装

有3种安装方式：

1. 使用 [npm](https://npmjs.com)

    ```shell
    npm install social-share.js
    ```
2. 使用 [bower](https://bower.io)

    ```shell
    bower install social-share.js
    ```

3. 使用 [cdnjs](https://cdnjs.com/libraries/social-share.js)，引入 `share.min.css` 与 `social-share.min.js` 两个链接就好。 (感谢 [@mdluo](https://github.com/mdluo))

4. 手动下载或者 git clone 本项目。

# 使用


HTML:

```html
<div class="social-share"></div>

<!--  css & js -->
<link rel="stylesheet" href="dist/css/share.min.css">
<script src="dist/js/social-share.min.js"></script>

// 当你使用类名为 `social-share` 时不需要手动初始化
```

## 自定义配置

所有配置**可选**， 通常默认就满足需求：

可用的配置有：

```js

url                 : '', // 网址，默认使用 window.location.href
source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
origin              : '', // 分享 @ 相关 twitter 账号
description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : '', // 图片, 默认取网页中第一个img标签
sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
```

示例代码：

```js
var $config = {
    title               : '234',
    description         : '123',
    wechatQrcodeTitle   : "微信扫一扫：分享", // 微信二维码提示文字
    wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
};

socialShare('.social-share-cs', $config);
```

以上选项均可通过标签 `data-xxx` 来设置：

> 驼峰转为中横线，如`wechatQrcodeHelper` 的data标签为`data-wechat-qrcode-helper`

##### 禁用 google、twitter、facebook 并设置分享的描述

```html
<div class="share-component" data-disabled="google,twitter,facebook" data-description="Share.js - 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣"></div>
```

##### 设置微信二维码标题

```html
<div class="social-share" data-wechat-qrcode-title="请打开微信扫一扫"></div>
```

##### 针对特定站点使用不同的属性（title, url, description,image...）

```html
<div class="social-share" data-weibo-title="这个标题只有的分享到微博时有用，其它标题为全局标题" data-qq-title="分享到QQ时用此标题"></div>
```

### 你也可以自定义图标

使用: `data-initialized="true"` 标签或者 `initialized` 配置项来禁用自动生成icon功能。

```html
<div class="social-share" data-initialized="true">
    <a href="#" class="social-share-icon icon-weibo"></a>
    <a href="#" class="social-share-icon icon-qq"></a>
    <a href="#" class="social-share-icon icon-qzone"></a>
</div>
```
以上a标题会自动加上分享链接（`a` 标签必须带 `icon-NAME` 属性，不然分享链接不会自动加上）。

### 如果你想在分享icon列表中内置一些元素，比如放一个收藏按钮在分享按钮的后面：

```html
<div class="social-share">
    <a href="javascript:;" class="social-share-icon icon-heart"></a>
</div>
```
这样并没有实现，因为结果是所有的分享按钮都创建在了收藏按钮的后面了，这时候你就可以用 `data-mode="prepend"` 来确定分享按钮创建的方式。

```html
<div class="social-share" data-mode="prepend">
    <a href="javascript:;" class="social-share-icon icon-heart"></a>
</div>
```

这样，所有的分享图标就会创建在容器的内容前面，反之可以用 `append` 创建在容器内容后面，当然这是默认的，也不需要这么做。

### 指定移动设备上显示的图标

```html
<div class="share-component" data-mobile-sites="weibo,qq,qzone,tencent"></div>
```
当在手机上打开该页面的时候就只会显示这4个图标了。

欢迎贡献代码及提建议！

## Requirejs
本插件支持使用Requirejs加载，Jquery版本参考如下：
```js
requirejs.config({
  paths: {
    jquery: '//cdn.bootcss.com/jquery/2.2.4/jquery.min',
    share: '//cdn.bootcss.com/social-share.js/1.0.15/js/jquery.share.min'
  },
  shim: {
    share:['jquery']
  }
})

requirejs(['jquery','share'],function ($){
  $('.target').share({
    // settings
  })
})
```

无依赖版本直接加载即可，使用参考如下：
```js
requirejs.config({
  paths: {
    share: '//cdn.bootcss.com/social-share.js/1.0.15/js/social-share.min'
  },
})

requirejs(['share'],function (){
//   ele:指定初始化的元素，可以是单个元素也可以是元素数组
  window.socialShare(ele,{
    // settings
  })
})
```

# 引用

本项目中二维码生成部分用到了开源组件：[lrsjng/jquery-qrcode](https://github.com/lrsjng/jquery-qrcode) (MIT License)

# 贡献你的代码

## 安装node_modules

```
npm install
```

## 进入开发模式

```
npm run dev
```

# License

 MIT


