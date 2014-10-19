SNS
===

一键分享到微博，QQ空间，腾讯微博，人人，豆瓣，图标使用svg。

![demo](./assets/images/demo.jpg)

或者直接浏览我的博客 http://overtrue.me 内容页查看效果。

# 安装

引入js文件即可：

```html
<script src="assets/js/sns.js"></script>
```


# 使用

HTML:

```html
<i data-id="sina" class="icon">
    <svg><use xlink:href="path/to/sns.svg#icon-iconfont-sina" transform="translate(0 0)"></use></svg>
</i>
<i data-id="qzone" class="icon">
    <svg><use xlink:href="path/to/sns.svg#icon-iconfont-qzone" transform="translate(0 0)"></use></svg>
</i>
<i data-id="qq" class="icon">
    <svg><use xlink:href="path/to/sns.svg#icon-iconfont-qq" transform="translate(0 0)"></use></svg>
</i>
<i data-id="renren" class="icon">
    <svg><use xlink:href="path/to/sns.svg#icon-iconfont-renren" transform="translate(0 0)"></use></svg>
</i>
<i data-id="douban" class="icon">
    <svg><use xlink:href="path/to/sns.svg#icon-iconfont-douban" transform="translate(0 0)"></use></svg>
</i>

<!-- 引入sns.js -->
<script src="assets/js/sns.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var config = {}; /* 配置 */ 
        SNS.init(config);
        $('.sns-share i').click(function(){
            SNS.share($(this).data('id'));
        });
    });
</script>
```

当然，上面的html你可以根据自己喜好随便改，只要调用到对应的方法就好了。

CSS:

直接引入CSS文件：

```html
<link rel="stylesheet" href="assets/css/sns.css">
```

或者在你的HTML页面或者其它CSS文件里：

```css
.icon svg {
    display: inline-block;
    width: 32px;
    height: 32px;
    fill: #666; /* fill:图标默认颜色 */
}
.icon svg:hover {fill:#1abc9c;} /* 鼠标移过时颜色 */

```

如果需要单独指定某个图标的颜色：

```css
.icon-iconfont-qq {
    fill: #red; /* fill:你想要的颜色就好 */
}
```

# 自定义配置

所有配置**可选**， 通常默认就满足需求：

```js
var config = {
	url    : '', // 网址，默认使用window.location.href
	site   : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" /> 
	title  : '', // 标题，默认读取document.title
	desc   : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" /> 
	pic    : '', // 图片, 默认取网页中第一个img标签
	target : '_blank' //打开方式
   };
	
SNS.init(config);
```


# License

 MIT
