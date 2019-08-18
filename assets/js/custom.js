const allClass = "a-slide-up i-slide-up a-slide-down i-slide-down";
var screenCount = $(".screen-container").length;
var divCount = screenCount;
var rebindTime = isMobileDevice() ? 100 : 1200;
var scrollAnimationTime = 1000;
var selectedDiv = "";
var animClass = "fadeInUp fadeOutUp fadeInDown fadeOutDown fadeInRight fadeOutRight animated";

function isMobileDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
        return true;
    }
    return false;
}

$(document).ready(function () {
    animateLogo();
    bindEvent(10);
});

$(window).on("load", function () {

});

function animateLogo() {
    d = {};
    d.height = "0vh";
    setTimeout(function () {
        $(".preloader-container-body").animate(d, 100);
        if(!isMobileDevice())
            $(".screen-container").css("position", "absolute");
        $(".bouncingball").css("position", "fixed");
        $(".visit-site-heading").css("position", "fixed");
    }, 5250);
}

function bindEvent(timeout) {
    setTimeout(function () {

        $(window).on('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {
                // alert("UP");
                scrollUpCase();
            } else {
                // alert("DOWN");
                scrollDownCase();
            }
        });

        $(window).keyup(function (e) {
            if (e.keyCode === 38) {
                scrollUpCase();
            }
            if (e.keyCode === 40) {
                scrollDownCase();
            }
        });

        $(window).on('touchstart', function (e) {

            var swipe = e.originalEvent.touches,
                start = swipe[0].pageY;

            $(this).on('touchmove', function (e) {

                var contact = e.originalEvent.touches,
                    end = contact[0].pageY,
                    distance = end - start;

                if (distance < -30)
                    scrollDownCase();
                if (distance > 30)
                    scrollUpCase();
            })
                .one('touchend', function () {

                    $(this).off('touchmove touchend');
                });
        });


    }, timeout);


}

function scrollUpCase() {
    if (divCount < screenCount) {
        divCount++;
        $(window).unbind();
        $(".screen-container.active").addClass('a-slide-down').prev(".screen-container").addClass('i-slide-down');
        setTimeout(function () {
            $(".screen-container.active").removeClass('active').prev(".screen-container").addClass("active");
            $(".screen-container").removeClass(allClass);
            bindEvent(rebindTime);
        }, scrollAnimationTime);

    }
}

function scrollDownCase() {
    if (divCount > 1) {
        divCount--;
        $(window).unbind();
        $(".screen-container.active").addClass('a-slide-up').next(".screen-container").addClass('i-slide-up');
        setTimeout(function () {
            $(".screen-container.active").removeClass('active').next(".screen-container").addClass("active");
            $(".screen-container").removeClass(allClass);
            bindEvent(rebindTime);
        }, scrollAnimationTime);
    }
}

function bringForth(div_id) {
    selectedDiv = div_id;
    $("#" + div_id + "-main").removeClass(animClass);
    $("#" + div_id + "-main").addClass("animated");
    $("#" + div_id + "-main").addClass("fadeOutUp");

    $(".close-cross").removeClass(animClass);
    $(".close-cross").addClass("animated");
    $(".close-cross").addClass("fadeInRight");

    var d = {};
    d.top = "0";
    d.height = "100%";
    showWel();
    $("#" + div_id).animate(d, 10);
    $("#" + div_id).removeClass(animClass);
    $("#" + div_id).addClass("animated");
    $("#" + div_id).addClass("fadeInUp");
}

function showWel(div_id) {
    $(".showcase").css("position", "fixed");
}

function showBackHead() {
    $(".close-cross").removeClass(animClass);
    $(".close-cross").addClass("animated");
    $(".close-cross").addClass("fadeOutRight");

    $("#" + selectedDiv + "-main").removeClass(animClass);
    $("#" + selectedDiv + "-main").addClass("animated");
    $("#" + selectedDiv + "-main").addClass("fadeInDown");

    var d = {};
    d.top = "100%";
    d.height = "10px";
    $("#" + selectedDiv).animate(d, 1000);
    $("#" + selectedDiv).removeClass(animClass);
    $("#" + selectedDiv).addClass("animated");
    $("#" + selectedDiv).addClass("fadeOutDown");
}