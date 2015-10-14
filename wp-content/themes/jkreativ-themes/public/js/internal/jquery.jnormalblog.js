/**
 * jquery.jnormalblog.js
 */
(function ($, PhotoSwipe) {
    "use strict";
    $.fn.jnormalblog = function (options) {

        options = $.extend({
            followlike: 0
        }, options);

        return $(this).each(function () {

            var blog_content_type = function () {
                // gallery
                if ($(".article-slider-wrapper").length) {
                    $(".article-slider-wrapper").each(function () {
                        $(".article-slider-wrapper").imagesLoaded(function () {
                            $(".article-slider-wrapper").removeClass('loading');
                            $(".article-image-slider").fadeIn();
                            create_fotorama();
                        });
                    });
                }

                // youtube
                if ($("[data-type='youtube']").length) {
                    $("[data-type='youtube']").each(function () {
                        var autoplay = $(this).data('autoplay');
                        var repeat = $(this).data('repeat');
                        $.type_video_youtube($(this), autoplay, repeat);
                    });
                }

                // vimeo
                if ($("[data-type='vimeo']").length) {
                    $("[data-type='vimeo']").each(function () {
                        var autoplay = $(this).data('autoplay');
                        var repeat = $(this).data('repeat');
                        $.type_video_vimeo($(this), autoplay, repeat);
                    });
                }

                // sound cloud
                if ($("[data-type='soundcloud']").length) {
                    $("[data-type='soundcloud']").each(function () {
                        $.type_soundcloud($(this));
                    });
                }

                // html 5 video
                if ($("[data-type='html5video']").length) {
                    $("[data-type='html5video']").each(function () {
                        $.type_video_html5($(this), false, {
                            enableAutosize: true,
                            videoWidth: '100%',
                            videoHeight: '100%',
                            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen']
                        }, '.video-container');
                    });
                }
            };

            var create_fotorama = function () {
                $(".article-image-slider").fotorama({
                    allowfullscreen: false,
                    arrows: false,
                    width: '100%',
                    maxWidth: '100%'
                });
            };

            var followlike = function () {
                $(".article-share").jsharefollow();
            };

            var blog_shortcode = function () {
                if ($("[data-toggle='tooltip']").length) {
                    $("[data-toggle='tooltip']").tooltip();
               }
                if ($(".jrmap").length) {
                    do_load_googlemap('mapshortcode');
                }
                if ($(".skillgraph").length) {
                    $(window).bind('load', function () {
                        $(".skillgraph").jskill();
                    });
                }
            };

            var blog_photoswipe = function () {
                if ($(".photoswipe").length) {
                    var photoswipe = $('.photoswipe').photoSwipe({
                        slideshowDelay: 6000,
                        nextPreviousSlideSpeed: 400,
                        slideSpeed: 400,
                        captionAndToolbarOpacity: 1,
                        margin: 0,
                        captionAndToolbarFlipPosition: true,
                        getImageSource: function (obj) {
                            return $(obj).attr('href');
                        },
                        getImageCaption: function (obj) {
                            return $(obj).find('img').attr('alt');
                        }
                    });
                }
            };

            var blog_360 = function () {
                if ($(".responsive360wrapper")) {
                    $(".responsive360wrapper").each(function () {
                        $(this).responsive360({
                            imgpath: $(this).data('imagepath'),
                            imgcount: $(this).data('imagecount'),
                            autoplay: ( $(this).data('autoplay') == true ) ? 1 : 0
                        });
                    });

                }
            };

            var blog_facebook_widget = function(){
                if($(".blog-fb-likebox").length){
                    window.fbAsyncInit = function() {
                        FB.init({
                            xfbml      : true,
                            version    : 'v2.0'
                        });
                    };

                    (function(d, s, id){
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }
            };

            blog_shortcode();
            blog_content_type();
            blog_photoswipe();
            blog_360();
            blog_facebook_widget();

            $.bindComment();
            if (options.followlike === 1) {
                $(window).bind('load', followlike);
            }
        });
    };
})(jQuery, window.Code.PhotoSwipe);

/** need to use asynch map and loaded only when it needed **/
function mapshortcode() {
    jQuery(".jrmap").jrmap();
}