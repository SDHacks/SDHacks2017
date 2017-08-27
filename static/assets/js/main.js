$(document).ready(function() {
    var NAV_ICON_SCROLL_CUTOFF = 300;

    $('.mobile-link').click(function() {
        $('.sd-nav').toggleClass('nav-open');
    });

    if ($(window).scrollTop() > 0) {
        $('.sd-nav--background').addClass('sd-nav--background-active');
    }

    if ($(window).scrollTop() > NAV_ICON_SCROLL_CUTOFF) {
        $('.sd-nav--logo-wrap').removeClass('sd-nav--logo-up');
    }

    $(window).scroll(function() {
        var toTop = $(window).scrollTop();

        if (toTop > 0) {
            $('.sd-nav--background').addClass('sd-nav--background-active');
        } else {
            $('.sd-nav--background').removeClass('sd-nav--background-active');
        }
        if (toTop > NAV_ICON_SCROLL_CUTOFF) {
            $('.sd-nav--logo-wrap').removeClass('sd-nav--logo-up');
        } else {
            $('.sd-nav--logo-wrap').addClass('sd-nav--logo-up');
        }
    });
});
