/**
 * Share.js
 *
 * @author  overtrue <i@overtrue.me>
 * @license MIT
 *
 * @example
 * <pre>
 * $('.share-bar').share();
 *
 * // or
 *
 * $('.share-bar').share({
 *     sites: ['qzone', 'qq', 'weibo','wechat'],
 *     // ...
 * });
 * </pre>
 */
;(function($){
    /**
     * Initialize a share bar.
     *
     * @param {String|Object} $item    target container.
     * @param {Object}        $options settings (optional).
     *
     * @return {Void}
     */
    $.fn.share = function ($item, $options) {
        var $image = $(document).find('img:first').prop('src');

        var $defaults = {
            url: window.location.href,
            site: $(document.head).find('[name="site"]').attr('content') || $(document.head).find('[name="Site"]').attr('content') || document.title,
            title: $(document.head).find('[name="title"]').attr('content') || $(document.head).find('[name="Title"]').attr('content') || document.title,
            description: $(document.head).find('[name="description"]').attr('content') || $(document.head).find('[name="Description"]').attr('content'),
            image: $image ? $image : '',
            target : '_blank',
            qrcodeTitle: "微信扫一扫：分享",
            qrcodeWidth: 100,
            sites: ['qzone', 'qq', 'weibo','wechat', 'douban'],
        };

        var $settings = $.extend(true, $defaults, $options);

        $settings.url         = encodeURI($settings.url);
        $settings.site        = encodeURI($settings.site);
        $settings.title       = encodeURI($settings.title);
        $settings.description = encodeURI($settings.description);

        var $urls = {
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + $settings.url + "&title=" + $settings.title + "&desc=" + $settings.description + "&summary=" + $settings.description + "&site=" + $settings.site + ($settings.image? $settings.image : ''),
            qq: "http://connect.qq.com/widget/shareqq/index.html?url="+ $settings.url + "&title=" + $settings.title + "&source=" + $settings.site + "&desc=" + $settings.description,
            weibo: "http://service.weibo.com/share/share.php?url=" + $settings.url + "&title=" + $settings.title + $settings.description + ($settings.image ? "&pic=" + $settings.image : ''),
            wechat: 'javascript:;',
            douban: "http://shuo.douban.com/!service/share?href=" + $settings.url + "&name=" + $settings.title + "&text=" + $settings.description + ( $settings.image ? "&image=" + $settings.image : '') + '&starid=0&aid=0&style=11&stime=&sig='
        };

        this.each(function() {
            var $el = $(this).addClass('sns-share-component');

            for ($i in $settings.sites) {
                var $name = $settings.sites[$i];
                var $link = $('<a href="" class="'+$name+'"><i class="icon iconfont icon-'+$name+'"></i></a>')
                            .attr('href', $urls[$name])
                            .attr('target', $settings.target);

                $el.append($link);
            }

            var $wechat = $el.find('a.wechat');

            if (typeof $.fn.qrcode == 'function') {
                $wechat.append('<span class="wechat-qrcode"></span>');
                $wechat.find('.wechat-qrcode').qrcode({ width: $settings.qrcodeWidth, height: $settings.qrcodeWidth - 10, text: $settings.url})
                                              .css({right: - $settings.qrcodeWidth / 2, display: 'block', position:'absolute', bottom: $wechat.height()})
                                              .append($settings.qrcodeTitle);
            } else {
                console.error('未加载 jquery.qrcode.min.js, 无法支持微信分享');
                $wechat.hide();
            }
        });
    };
})(jQuery);