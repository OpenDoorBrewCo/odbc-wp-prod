/** jquery.jresponsive360.js **/
(function ($) {
    "use strict";

    $.fn.responsive360 = function (options) {

        options = $.extend({
            imgarray: new Array(),
            imgpath: '',
            imgcount: 1,

            invert: true,
            infiniteAxis: [true, false],
            fps: 60,

            grabbable: true,
            grabRotateDistance: 500,

            throwable: true,
            minThrowDuration: 0.5,
            maxThrowDuration: 1.5,

            autoplay: 1
        }, options);


        return $(this).each(function () {
            var element = this;
            var percenttext = $(".loadpercentage", this).data("percent");

            var initialize = function () {
                if (joption.ismobile) {
                    // strip to bare-bones
                    options.throwable = false;

                    element.mobileStrings = {
                        mousedown: 'touchstart',
                        mousemove: 'touchmove',
                        mouseup: 'touchend'
                    };
                }

                element.totalFrames = convertToArray(options.imgarray.length, 1);

                element.frames = [];
                for (var i = 0; i < element.totalFrames[0]; i++) {
                    element.frames[i] = [];
                }

                // options conversions
                element.playIntervalDuration = 1000 / options.fps;
                element.minSpinIntervalDuration = (options.minSpinDuration * 1000) / options.imgarray.length;
                element.minThrowFrames = Math.floor(options.minThrowDuration * options.fps);
                element.maxThrowFrames = Math.floor(options.maxThrowDuration * options.fps);

                // state
                element.currentPos = [0, 0];
                element.playing = false;
                element.grabbing = false;
                element.spinning = false;

                if (options.invert) {
                    options.imgarray.reverse();
                }

                // binding
                bindbehaviour();

                // autoplay
                startautoplay();
            };

            /** autoplay **/
            var autoplayinterval = null;
            var intervalcounter = 0;

            var doautoplay = function () {
                gotoPos([validatePos(intervalcounter++), 0]);
                autoplayinterval = requestAnimationFrame(doautoplay);
            };

            var stopautoplay = function () {
                if (options.autoplay && autoplayinterval !== null) {
                    window.cancelAnimationFrame(autoplayinterval);
                    autoplayinterval = null;
                }
            };

            $(window).bind('stopautoplay360', stopautoplay);

            var startautoplay = function () {
                if (options.autoplay) {
                    autoplayinterval = requestAnimationFrame(doautoplay);
                }
            };
            /** autoplay end **/


            var getStr = function (str) {
                return joption.ismobile ? element.mobileStrings[str] : str;
            };

            var getEvent = function (event) {
                if (event.originalEvent.touches) {
                    // ignore multi-touch
                    if (event.originalEvent.touches.length > 1) return false;

                    if (event.originalEvent.touches.length) {
                        event.clientX = event.originalEvent.touches[0].clientX;
                        event.clientY = event.originalEvent.touches[0].clientY;
                    }
                }
                return event;
            };


            var bindbehaviour = function () {
                if (options.grabbable) {
                    $(element).bind(getStr("mousedown"), onGrabStart);
                }
            };

            var cancleEndGrab = function () {
                element.grabbing = false;
                $(window).unbind(getStr('mousemove'), onGrabChange);
                $(window).unbind(getStr('mouseup'), onGrabEnd);
                clearInterval(element.grabHistoryInterval);
                stopThrowing();
            };

            var onGrabStart = function (event) {
                if (!(event = getEvent(event))) return;
                stopautoplay();

                cancleEndGrab();
                element.grabbing = true;
                $(window).bind(getStr('mousemove'), onGrabChange);
                $(window).bind(getStr('mouseup'), onGrabEnd);
                $('body').addClass('dragging');

                if (joption.ismobile) {
                    $(element).bind('touchmove', onGrabChange);
                    $(element).bind('touchend', onGrabEnd);
                }

                element.grabHistory = [event];
                element.onGrabChangeClientX = element.onGrabChangeClientY = null;
                element.grabHistoryInterval = setInterval(updateGrabHistory, 10);

                // save state for later
                element.onGrabStartClientX = event.clientX;
                element.onGrabStartClientY = event.clientY;
                element.onGrabStartPlaying = element.playing;
                element.onGrabStartPos = element.currentPos;

                // prevent default event behavior
                event.preventDefault();
            };

            var updateGrabHistory = function () {
                var func = element.onGrabChangeClientX ? "onGrabChange" : "onGrabStart";

                if (func === "onGrabChange") {
                    element.grabHistory.unshift({ clientX: element.onGrabChangeClientX, clientY: element.onGrabChangeClientY });
                } else if (func === "onGrabStart") {
                    element.grabHistory.unshift({ clientX: element.onGrabStartClientX, clientY: element.onGrabStartClientY });
                }

                if (element.grabHistory.length > 3) {
                    element.grabHistory.splice(3);
                }
            };

            var onGrabChange = function (event) {
                if (!(event = getEvent(event))) return;

                if (!(event.clientX == element.onGrabStartClientX && event.clientY == element.onGrabStartClientY)) {

                    // save the event for later
                    element.onGrabChangeClientX = event.clientX;
                    element.onGrabChangeClientY = event.clientY;

                    var pos = getGrabPos(event);
                    if (pos) gotoPos(pos);
                }

                event.preventDefault();
            };

            var onGrabEnd = function (event) {
                if (!(event = getEvent(event))) return;

                element.grabbing = false;
                $(window).unbind(getStr('mousemove'), onGrabChange);
                $(window).unbind(getStr('mouseup'), onGrabEnd);
                $('body').removeClass('dragging');
                clearInterval(element.grabHistoryInterval);

                if (options.throwable) {
                    var diffX = event.clientX - element.grabHistory[element.grabHistory.length - 1].clientX,
                        diffY = event.clientY - element.grabHistory[element.grabHistory.length - 1].clientY,
                        loaded = true;

                    if (diffX || diffY) {
                        var dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)),
                            frames = Math.floor(dist / 5),
                            clientX = element.grabHistory[element.grabHistory.length - 1].clientX,
                            clientY = element.grabHistory[element.grabHistory.length - 1].clientY,
                            changeX = true,
                            changeY = true;

                        // keep # of frames in-bounds
                        if (frames < element.minThrowFrames) frames = element.minThrowFrames;
                        else if (frames > element.maxThrowFrames) frames = element.maxThrowFrames;

                        element.throwSequence = new Array();

                        for (var i = 0; i < frames; i++) {
                            var percent = i / frames,
                                speed = Math.pow(percent - 1, 2),
                                clientX = Math.floor(speed * diffX) + clientX,
                                clientY = Math.floor(speed * diffY) + clientY,
                                pos = validatePos(getGrabPos({ clientX: clientX, clientY: clientY }));

                            // once an axis rotates slowly enough to use the same row/column for two frames,
                            // stop rotating that axis entirely
                            if (!changeX) pos[0] = element.throwSequence[element.throwSequence.length - 1][0];
                            else if (element.throwSequence.length && pos[0] == element.throwSequence[element.throwSequence.length - 1][0]) changeX = false;
                            if (!changeY) pos[1] = element.throwSequence[element.throwSequence.length - 1][1];
                            else if (element.throwSequence.length && pos[1] == element.throwSequence[element.throwSequence.length - 1][1]) changeY = false;

                            element.throwSequence.push(pos);
                        }

                        element.throwing = true;
                        element.throwInterval = requestAnimationFrame(throwStep);
                    }
                }

                event.preventDefault();
            };

            var throwStep = function () {
                var pos = element.throwSequence.shift();
                gotoPos(pos);
                if (!element.throwSequence.length) {
                    stopThrowing();
                } else {
                    element.throwInterval = requestAnimationFrame(throwStep);
                }
            };

            var stopThrowing = function () {
                if (!element.throwing) return;
                element.throwing = false;
                window.cancelAnimationFrame(element.throwInterval);
            };

            var getGrabPos = function (event) {
                var diffX = event.clientX - element.onGrabStartClientX,
                    diffY = event.clientY - element.onGrabStartClientY,
                    percentDiffX = diffX / options.grabRotateDistance,
                    percentDiffY = diffY / options.grabRotateDistance,
                    frameDiffX = Math.round(element.totalFrames[0] * percentDiffX),
                    frameDiffY = Math.round(element.totalFrames[1] * percentDiffY),
                    posX = element.onGrabStartPos[0] + frameDiffX,
                    posY = element.onGrabStartPos[1] + frameDiffY;

                return [posX, posY];
            };

            var atPosition = function (pos) {
                return (element.currentPos && pos[0] == element.currentPos[0] && pos[1] == element.currentPos[1]);
            };

            var validatePos = function (pos, forceContinuous) {
                for (var i = 0; i < 2; i++) {
                    if (forceContinuous || options.infiniteAxis[i]) {
                        while (pos[i] > element.totalFrames[i] - 1) {
                            pos[i] -= element.totalFrames[i];
                        }
                        while (pos[i] < 0) {
                            pos[i] += element.totalFrames[i];
                        }
                    } else {
                        if (pos[i] > element.totalFrames[i] - 1) {
                            pos[i] = element.totalFrames[i] - 1;
                        }
                        if (pos[i] < 0) {
                            pos[i] = 0;
                        }
                    }
                }
                return pos;
            };

            var gotoPos = function (pos, force) {
                // keep the pos in bounds
                pos = validatePos(pos);
                element.currentPos = pos;
                $(element.imageholder).attr('src', options.imgarray[pos[0]]);
            };


            var convertToArray = function (mixed, second) {
                return (typeof mixed[0] == 'undefined') ? [mixed, second] : mixed;
            };

            var changepercentage = function (sequence) {

                if (sequence < options.imgarray.length) {
                    var percentage = Math.floor(( sequence + 1) / options.imgarray.length * 100);
                    $(".loadpercentage", element).text(percentage + " " + percenttext);
                } else {
                    $(".loadpercentage", element).fadeOut(function () {
                        $(this).remove();
                        $(element).append("<div class='wrapper360'><img class='image360' src='" + options.imgarray[0] + "'/></div>");
                        element.imageholder = $(element).find("img").fadeIn();
                        initialize();
                    });
                }
            };

            var preloadImage = function () {
                var i;
                var loaded = 0;
                for(i = 0; i < options.imgcount; i++ ){
                    var img = new Image();
                    $(img).load(function () {
                        changepercentage(++loaded);
                    }).error(function () {
                        changepercentage(++loaded);
                    }).attr('src', options.imgarray[i]);
                }

            };

            var buildImageArray = function () {
                if (!options.imgarray.length) {
                    var imagePathParts = options.imgpath.match(/^([^#]*)(#+)([^#]*)$/);
                    var numDigits = imagePathParts[2].length;

                    for (var i = 0; i < options.imgcount; i++) {
                        var frame = (i + 1).toString();
                        for (var j = frame.length; j < numDigits; j++) {
                            frame = '0' + frame;
                        }
                        options.imgarray[i] = imagePathParts[1] + frame + imagePathParts[3];
                    }
                }
            };

            buildImageArray();
            preloadImage();
        });
    };

})(jQuery);