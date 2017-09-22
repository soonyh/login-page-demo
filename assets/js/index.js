    var Index = (function() {
        /**
         * 获取视窗宽高
         * 关于视窗的各种尺寸可参考：
         * https://www.w3cplus.com/sites/default/files/blogs/2017/1707/vw-layout-4.png
         * @includeScollbar   {Boolean}  true为包含滚动条的宽度，false反之
         * @return            {Object}   返回一个包含width和height2个属性的对象。
         *                    width：浏览器视窗的宽度，height为窗口的高度
         */
        var getViewPort = function(includeScollbar) {
            var isInclude = includeScollbar || false;
            if (isInclude) {
                var e = window,
                    a = 'inner';
                if (!('innerWidth' in window)) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }
                return {
                    width: e[a + 'Width'],
                    height: e[a + 'Height']
                }
            } else {
                var de = document.documentElement;
                var db = document.body;
                var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
                var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
                return {
                    width: viewW,
                    height: viewH
                }
            }
        };
        var setWindowSize = function() {
            $('body').css({
                'width': getViewPort().width,
                'height': getViewPort().height
            })
        };
        return {
            init: function() {
                /* ?page=register 获取url的参数，对应切换面板*/
                var flag = Index.getURLParameter('page') || 'login';
                if (flag == 'register') {
                    $('#reg-switcher').click();
                } else if (flag == 'login') {
                    $('#login-switcher').click();
                }
                /* 启动窗口尺寸适配*/
                setWindowSize();
                window.onresize = function() {
                    setWindowSize();
                };
                /*监听切换标签，激活时相应的给radio设置true*/
                $('.tab-item').bind('click', function() {
                    var $this = $(this);
                    $this.addClass('active').siblings('.tab-item').removeClass('active');
                    $this.closest('.tabs').find('input[type="radio"]').each(function() {
                        $(this).prop('checked', false)
                    });
                    $this.find('input[type="radio"]').prop('checked', true)
                });
                /*注册面板 实现切换效果*/
                $('.tab-item[data-target]').bind('click', function() {
                    var selector = $(this).attr('data-target');
                    $(selector).addClass('active').siblings('.tab-pane').removeClass('active');
                });
                // $("body").keydown(function() {
                //     if (event.keyCode == "13") { //keyCode=13是回车键
                //         alert(1)
                //     }
                // });
            },
            switchPanel: function(el) {
                var $currentPanel = $(el).closest('.box');
                $currentPanel.hide().removeClass('flipInY shade').find('.form-group').removeClass('has-error');
                $currentPanel.siblings('.box').show().addClass('flipInY');
            },
            getURLParameter: function(paramName) {
                var searchString = window.location.search.substring(1),
                    i, val, params = searchString.split("&");
                for (i = 0; i < params.length; i++) {
                    val = params[i].split("=");
                    if (val[0] == paramName) {
                        return unescape(val[1]);
                    }
                }
                return null;
            },
        }
    })()
