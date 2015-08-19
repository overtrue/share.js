(function($){
    $.fn.share = function ($options) {
        var $image = $(document).find('img:first').attr('src');

        var $defaults = {
            url: document.title,
            site: window.location.href,
            title: $(document.head).find('[name="site-title"]').text() || document.title,
            description: $(document.head).find('[name="description"]').text(),
            image: $image ? $image : '',
            target : '_blank',
            qrcodeTitle: "微信扫一扫：分享",
            qrcodeWidth: 100,
        };

        var $settings = $.extend(true, $defaults, $options);

        for($key in $settings){
            $settings[$key] = encodeURIComponent($settings[$key]);
        }

        var $urls = {
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + $settings.url + "&title=" + $settings.title + "&desc=" + $settings.description + "&summary=" + $settings.description + "&site=" + $settings.site + ($settings.image? $settings.image : ''),
            qq: "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + $settings.url + "&title=" + $settings.title + $settings.description + ($settings.image ? "&pic=" + $settings.image : ''),
            qq: "http://connect.qq.com/widget/shareqq/index.html?url="+ $settings.url + "&title=" + $settings.title + "&source=" + $settings.site + "&desc=" + $settings.description,
            weibo: "http://service.weibo.com/share/share.php?url=" + $settings.url + "&title=" + $settings.title + $settings.description + ($settings.image ? "&pic=" + $settings.image : ''),
            wechat: 'javascript:;',
            douban: "http://shuo.douban.com/!service/share?href=" + $settings.url + "&name=" + $settings.title + "&text=" + $settings.description + ( $settings.image ? "&image=" + $settings.image : '') + '&starid=0&aid=0&style=11&stime=&sig='
        };

        this.each(function() {
            var el = $(this).addClass('sns-share-component');
            var $wechat = el.find('a.wechat');

            for($id in $urls){
                el.find('a.' + $id).attr('href', $urls[$id]).attr('target', $settings.target);
            }

            if (!$wechat.length) {return;};

            if (typeof $.fn.qrcode == 'function') {

                $wechat.append('<span class="wechat-qrcode"></span>');
                $wechat.find('.wechat-qrcode').qrcode({ width: $settings.qrcodeWidth, height: $settings.qrcodeWidth - 10, text: $settings.url});
                $wechat.find('.wechat-qrcode').css({right: - $settings.qrcodeWidth / 2, display: 'block' });
                $wechat.find('.wechat-qrcode').append(decodeURIComponent($settings.qrcodeTitle));
            } else {
                console.error('未加载 jquery.qrcode.min.js, 无法支持微信分享');
                $wechat.hide();
            }
        });
    };
})(jQuery);