/**
 * jquery.jmasonryblog.js
 */
(function ($) {
    "use strict";
    $.fn.jmasonryblog = function (options) {

        options = $.extend({
            loadAnimation: 'seqfade', // normal | fade | seqfade | upfade | sequpfade | randomfade | randomupfade
            adminurl: '',
            pagingajax: true
        }, options);

        return $(this).each(function () {
            var element = $(this);
            var container = $(this).find('.isotopewrapper');
            var blogfilter = $(".blogfilter");
            var blogform = $(".bloginputfilter form");
            var loader = $('.blogloader');

            var get_blog_column_number = function () {
                var ww = $(".jviewport").width();
                if (ww < 640) return 1;		// 380
                if (ww < 1100) return 2;	// 380
                if (ww < 1500) return 3;	// 580
                if (ww < 1700) return 4; 	// 525
                return 5;
            };

            var blog_resize = function () {
                var elepadding = $(element).css('padding-left').replace("px", "");
                var blognumber = get_blog_column_number();
                var wrapperwidth = $(element).width();
                var itemwidth = Math.floor(wrapperwidth / blognumber);
                $(".article-masonry-container", container).width(itemwidth);
            };

            var filterfloatclicked = function(){
                var blogfilterbutton = $(".filterfloatbutton");
                var blogfilter = $(".filterfloat");
                $(document).mouseup(function(e){
                    if($(e.target).parents('.filterfloatbutton').length > 0 || blogfilterbutton.is(e.target)) {
                        if ($(blogfilter).hasClass('active')) {
                            $(blogfilter).removeClass('active');
                        } else {
                            $(blogfilter).addClass('active');
                        }
                    } else {
                        $(blogfilter).removeClass('active');
                    }
                });
            };

            var normalfilterclicked = function(){
                var blogfilterbutton = $(".blogfilterbutton");
                var blogfilter = $(".blogfilter");
                $(document).mouseup(function(e){
                    if($(e.target).parents('.blogfilterbutton').length > 0 || blogfilterbutton.is(e.target)) {
                        if ($(blogfilter).hasClass('active')) {
                            $(blogfilter).removeClass('active');
                        } else {
                            $(blogfilter).addClass('active');
                        }
                    } else {
                        $(blogfilter).removeClass('active');
                    }
                });
            };

            var filterlistclicked = function () {
                filterfloatclicked();
                normalfilterclicked();
            };

            var loadmorerequest = function () {
                $(loader).fadeIn();

                // do ajax request
                $.ajax({
                    url: options.adminurl,
                    type: "post",
                    dataType: "html",
                    data: $(blogform).serialize(),
                    success: function (data) {
                        $(container).isotope('layout');

                        setTimeout(function () {
                            $(container).isotope('destroy');

                            $(".isotopewrapper .article-masonry-container", data).each(function (i) {
                                $(container).append(this);
                            });

                            $(".blogpagingwrapper").html($(".blogpagingwrapper", data));

                            initialize_blog($(".pagedot").length);
                        }, 500);
                    }
                });
            };

            var filterclicked = function (event) {
                var li = $(event.currentTarget);
                var parentul = $(li).parent();

                // active or not active link
                $("li", parentul).removeClass('active');
                $(li).addClass('active');

                if ($(li).data('type') === 'sort') {
                    $("[name='sort']", blogform).val($(li).data('sortby'));
                } else {
                    $("[name='category']", blogform).val($(li).data('filter'));
                }
                $("[name='paged']", blogform).val(1);


                // change name
                var sorttext = '';
                var filtertext = '';
                var sortfiltertext = '';
                var sorttitle = $(".blogsortul").data('title');
                var filtertitle = $(".blogfilterul").data('title');
                var sortactive = $(".blogsortul li.active");
                var filteractive = $(".blogfilterul li.active");

                if ($(sortactive).length > 0) {
                    sortfiltertext = sorttitle + " " + $(sortactive).text();
                }

                if ($(filteractive).length > 0) {
                    if ($(sortactive).length > 0) {
                        sortfiltertext += " & " + filtertitle + " " + $(filteractive).text();
                    } else {
                        sortfiltertext += filtertitle + " " + $(filteractive).text();
                    }
                }

                $(".blogfilterbutton").text(sortfiltertext);
                $(".filterfloatbutton span").text(sortfiltertext);

                // 	blog filter width
                var blogfilterwidth = $(blogfilter).width();
                $(".blogfilterlist").css({ 'min-width': blogfilterwidth });

                // hide portfolio paging
                $(".blogpagingwrapper").animate({ 'opacity': 0 }, "slow");
                $.animate_hide(options.loadAnimation, container, $(container).find('.article-masonry-container'), function () {
                    loadmorerequest();
                });
            };

            var pagingclicked = function (event) {
                event.preventDefault();
                var ahref = $(event.currentTarget);
                var pagenumber = $(ahref).data('page');
                $("[name='paged']", blogform).val(pagenumber);
                $(".pagetext .curpage").text(pagenumber);

                $.animate_hide(options.loadAnimation, container, $(container).find('.article-masonry-container'), function () {
                    $(".blogpagingwrapper").animate({ 'opacity': 0 }, "slow");
                    loadmorerequest();
                });
            };

            var blog_content_type = function () {

                // gallery
                if ($(".article-image-slider").length) {
                    $(".article-image-slider").fotorama({
                        allowfullscreen: false,
                        arrows: false,
                        width: '100%',
                        maxWidth: '100%',
                        aspectRatio: 1
                    });
                    $(".article-image-slider").on('fotorama:fullscreenexit', function () {
                        blog_resize();
                        $(container).isotope('layout');
                    });
                }

                // youtube
                if ($("[data-type='youtube']").length) {
                    $("[data-type='youtube']").each(function () {
                        $.type_video_youtube($(this), false, false);
                    });
                }

                // vimeo
                if ($("[data-type='vimeo']").length) {
                    $("[data-type='vimeo']").each(function () {
                        $.type_video_vimeo($(this), false, false);
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

            var initialize_blog = function (showpaging) {
                blog_resize();
                blog_content_type();

                $(container).imagesLoaded(function () {
                    $(container).isotope({
                        itemSelector: ".article-masonry-container",
                        masonry: {
                            columnWidth: 1
                        }
                    });

                    setTimeout(function () {
                        $(loader).fadeOut();
                        $.animate_load(options.loadAnimation, container, $(container).find('.article-masonry-container'), function () {
                            $(container).isotope('layout');
                        });
                    }, 1000);

                    if (showpaging) {
                        $(".blogpagingwrapper").animate({ opacity: 1 }).removeClass('hideme');
                    }
                });
            };

            $(window).bind("resize", function (event) {
                blog_resize();
            });

            filterlistclicked();
            $(".blogfilterlist li, .filterfloatlist li").bind("click", filterclicked);

            if (options.pagingajax === true) {
                $(".blogpagingwrapper").on("click", ".pagedot a", pagingclicked);
            }

            initialize_blog(true);
        });
    };
})(jQuery);