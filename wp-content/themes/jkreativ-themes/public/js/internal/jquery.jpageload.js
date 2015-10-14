/**
 * jquery.jnpslider.js
 */
(function ($, window) {
    "use strict";

    $.jpageload = function () {

        /** load javascript script **/
        function loadpage() {
            $("#imgLoading").removeClass("invisible");

            /** static function for loading image * */
            var imgs = $('img').length + 1;
            var loaded = null;
            var loadPerc = null;
            var myColor = [joption.loaderbackground, joption.loaderlinecolor];
            var myData = [100 - loadPerc, loadPerc];
            var finishflag = false;
            // we need to load fb API right here


            function getTotal() {
                var myTotal = 0;
                for (var j = 0; j < myData.length; j++) {
                    myTotal += (typeof myData[j] === 'number') ? myData[j] : 0;
                }
                return myTotal;
            }

            function plotData() {
                var canvas;
                var ctx;
                var lastend = 0;
                var myTotal = getTotal();

                canvas = document.getElementById("canvas");
                ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < myData.length; i++) {
                    ctx.fillStyle = myColor[i];
                    ctx.beginPath();
                    ctx.moveTo(200, 138);
                    ctx.arc(200, 138, 138, lastend, lastend + (Math.PI * 2 * (myData[i] / myTotal)), false);
                    ctx.lineTo(200, 138);
                    ctx.fill();
                    lastend += Math.PI * 2 * (myData[i] / myTotal);
                }
            }

            function beginloadimage() {
                if (!finishflag) {
                    loaded += 1;
                    loadPerc = Math.round((100 / imgs) * loaded);
                    myData[0] = 100 - loadPerc;
                    myData[1] = loadPerc;
                    plotData();
                }
            }

            function beginloadwindow() {
                myData[0] = 0;
                myData[1] = 90;
                plotData();
                finishflag = true;

                // call after load right after window loaded executed, and
                // trigger our self load
                $(window).trigger('jload');

                setTimeout(function () {
                    $("#loading").animate({
                        opacity: 0
                    }, 500, function () {
                        $(this).remove();
                    });

                    setTimeout(function () {
                        $({
                            property: 0
                        }).animate({
                            property: $(window).width()
                        }, {
                            duration: 1500,
                            step: function (now) {
                                finishcanvas(now);
                            },
                            complete: function () {
                                $("#loadingbg").remove();
                            }
                        });
                    }, 1000);
                }, 1500);

                $('img').unbind('load', beginloadimage);
                $(window).unbind('load', beginloadwindow);
            }

            function finishcanvas(height) {
                $('#loadingbg canvas').attr('width', $(window).width());
                $('#loadingbg canvas').attr('height', $(window).height());
                var masks = document.getElementById('mask');

                var cx = masks.getContext('2d');
                cx.beginPath();
                cx.rect(0, 0, $(window).width(), $(window).height());
                cx.arc($(window).width() * 0.5, $(window).height() * 0.5, height, 0, 2 * Math.PI, true);
                cx.fillStyle = joption.loaderbackground;
                cx.fill();
            }

            finishcanvas(0);

            $('img').bind('load', beginloadimage);
            $(window).bind('load', beginloadwindow);
        }

        // dispatch
        loadpage();
    };

    $.jpageloadlinear = function () {

        function loadpage() {
            /** static function for loading image * */
            var imgs = $('img').length;
            var loaded = 0;
            var loadPerc = null;
            var myinterval = null;
            var loadincrement = 0;

            var plotfinish = false;
            var loadfinish = false;
            var interval = 60;

            function plotData() {
                myinterval = setInterval(function () {
                    if(loadPerc >= loadincrement) {
                        if (loadincrement < 100) {
                            loadincrement++;
                            $("#loading .percentage span").text(loadincrement + "%");
                            $("#loading .line").css({
                                'width': loadincrement + "%"
                            });
                        } else {
                            plotfinish = true;
                            dosplit();
                        }
                    }
                }, interval);
            }

            function dosplit() {
                if (plotfinish && loadfinish) {
                    clearInterval(myinterval);

                    var html = $("#loading .loadingwrapper");
                    var firstsplit = $(html).clone().css({
                        height: $(window).height()
                    });
                    var secondsplit = $(html).clone().css({
                        height: $(window).height(),
                        top: $(window).height() / 2 * -1
                    });
                    $("#loading").html("<div class='loadsplit'></div><div class='loadsplit'></div>");
                    $($("#loading .loadsplit").get(0)).append(firstsplit);
                    $($("#loading .loadsplit").get(1)).append(secondsplit);

                    $($("#loading .loadsplit").get(0)).animate({
                        top: '-100%'
                    }, 1000, "easeInOutQuint");

                    $($("#loading .loadsplit").get(1)).animate({
                        top: '100%'
                    }, 1000, "easeInOutQuint", function () {
                        $("#loading").remove();
                    });

                    $('img').unbind('load', beginloadimage);
                    $(window).unbind('load', beginloadwindow);
                }
            }

            function beginloadimage() {
                loaded += 1;

                if(loadfinish !== true) {
                    loadPerc = Math.round((100 / imgs) * loaded);
                } else {
                    loadPerc = 100;
                }

                // never let image finish the loaded progress. only allow window load trigger to finish loaded
                if(loadPerc >= 90 && !loadfinish) {
                	loadPerc = loadPerc;

                	// force curtain to open
                	setTimeout(function(){
                		loadfinish = true;
                		loadPerc = 100;
                	}, 5000);
                }
            }

            function beginloadwindow() {
                loadfinish = true;
                loadPerc = 100;
                interval = 10;
                dosplit();
            }

            $('img').bind('load', beginloadimage);
            $(window).bind('load', beginloadwindow);
            plotData();
        }

        // dispatch
        loadpage();
    };

    $.jpageloadlinearinline = function () {
        NProgress.start();
        setTimeout(function () {
            NProgress.done();
            $('.fade').removeClass('out');
        }, 1000);
    };

})(jQuery, this);