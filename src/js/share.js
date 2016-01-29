/**
 * Share.js
 *
 * @author  overtrue <i@overtrue.me>
 * @license MIT
 *
 * @example
 * <pre>
 * $('.share-components').share();
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
     * @param {Object}        $options globals (optional).
     *
     * @return {Void}
     */
    $.fn.share = function ($options) {
        var $image = $(document).find('img:first').prop('src');

        var $defaults = {
            url: window.location.href,
            site_url: window.location.origin,
            source: $(document.head).find('[name="site"]').attr('content') || $(document.head).find('[name="Site"]').attr('content') || document.title,
            title: $(document.head).find('[name="title"]').attr('content') || $(document.head).find('[name="Title"]').attr('content') || document.title,
            description: $(document.head).find('[name="description"]').attr('content') || $(document.head).find('[name="Description"]').attr('content'),
            image: $image ? $image : '',
            wechatQrcodeTitle: '微信扫一扫：分享',
            wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
            mobileSites: [],
            sites: ['weibo','qq','wechat','tencent','douban','qzone','linkedin','diandian','facebook','twitter','google'],
            disabled: [],
            initialized: false,
        };

        var $globals = $defaults;
        for(var attr in $options){
            $globals[attr] = $options[attr];
        }
        var $templates = {
            qzone       : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
            qq          : 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}',
            tencent     : 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
            weibo       : 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}',
            wechat      : 'javascript:;',
            douban      : 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
            diandian    : 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
            linkedin    : 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
            facebook    : 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
            twitter     : 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
            google      : 'https://plus.google.com/share?url={{URL}}',
        };

        this.each(function() {
            var $data      = $.extend({}, $globals, $(this).data() || {});
            var $container = $(this).addClass('share-component').addClass('social-share');

            createIcons($container, $data);
            createWechat($container, $data);
        });

        /**
         * Create site icons
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createIcons ($container, $data) {
            var $sites = getSites($data);

            for (var $i in $data.mode == 'prepend' ? $sites.reverse() : $sites) {
                var $name = $sites[$i];
                var $url  = makeUrl($name, $data);
                var $link = $data.initialized ? $container.find('.icon-'+$name) : $('<a class="social-share-icon icon-'+$name+'" target="_blank"></a>');

                if (!$link.length) {
                    continue;
                };

                $link.attr('href', $url);

                if (!$data.initialized) {
                    $data.mode == 'prepend' ? $container.prepend($link) : $container.append($link);
                }
            }
        }

        /**
         * Create the wechat icon and QRCode.
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createWechat ($container, $data) {
            var $wechat = $container.find('a.icon-wechat');

            $wechat.append('<div class="wechat-qrcode"><h4>'+$data.wechatQrcodeTitle+'</h4><div class="qrcode"></div><div class="help">'+$data.wechatQrcodeHelper+'</div></div>');
            $wechat.find('.qrcode').qrcode({render: 'image', size: 100, text: $data.url});
        }

        /**
         * Get available site lists.
         *
         * @param {Array} $data
         *
         * @return {Array}
         */
        function getSites ($data) {
            if ($data['mobileSites'].length < 1) {
                $data['mobileSites'] = $data['sites'];
            };

            var $sites = isMobileScreen() ? $data['mobileSites'] : $data['sites'];
            var $disabled = $data['disabled'];

            if (typeof $sites == 'string') {$sites = $sites.split(',')};
            if (typeof $disabled == 'string') {$disabled = $disabled.split(',')};

            if (runningInWeChat()) {
                $disabled.push('wechat');
            };

            return $sites.filter(function(v){ return !($disabled.indexOf(v) > -1) });
        }

        /**
         * Build the url of icon.
         *
         * @param {String} $name
         * @param {Object} $data
         *
         * @return {String}
         */
        function makeUrl ($name, $data) {
            var $template = $templates[$name];

            $data['summary'] = $data['description'];

            for (var $key in $data) {
                var $camelCaseKey = $name + $key.replace(/^[a-z]/, function($str){
                    return $str.toUpperCase();
                });

                var $value = encodeURIComponent($data[$camelCaseKey] || $data[$key]);
                $template = $template.replace(new RegExp('{{'+$key.toUpperCase()+'}}', 'g'), $value);
            }

            return $template;
        }

        /**
         * Detect wechat browser.
         *
         * @return {Boolean}
         */
        function runningInWeChat() {
            var ua = navigator.userAgent.toLowerCase();

            return ua.match(/MicroMessenger/i) == 'micromessenger';
        }

        /**
         * Mobile screen width.
         *
         * @return {boolean}
         */
        function isMobileScreen () {
            return $(window).width() <= 768;
        }
    };

    // Domready after initialization
    $(function () {
        $('.share-component,.social-share').share();
    });
})(jQuery);