$(document).ready(function() {
  var NAV_ICON_SCROLL_CUTOFF = 200;
  var navOpen = false;

  $('.mobile-link').click(function() {
    $('.sd-nav').toggleClass('nav-open');
    navOpen = !navOpen;

    if (navOpen) {
      $('.sd-nav__logo-wrap').removeClass('sd-nav__logo-up');
    } else {
      $(window).scroll();
    }
  });

  if ($(window).scrollTop() > 0) {
    $('.sd-nav__background').addClass('sd-nav__background-active');
  }

  if ($(window).scrollTop() > NAV_ICON_SCROLL_CUTOFF) {
    $('.sd-nav__logo-wrap').removeClass('sd-nav__logo-up');
  }

  $(window).scroll(function() {
    var toTop = $(window).scrollTop();

    if (toTop > 0) {
      $('.sd-nav__background').addClass('sd-nav__background-active');
    } else {
      $('.sd-nav__background').removeClass('sd-nav__background-active');
    }
    if (toTop > NAV_ICON_SCROLL_CUTOFF) {
      $('.sd-nav__logo-wrap').removeClass('sd-nav__logo-up');
    } else {
      $('.sd-nav__logo-wrap').addClass('sd-nav__logo-up');
    }
  });

  $('.sd-link-close-nav').click(function() {
    $('.sd-nav').removeClass('nav-open');
  });
});
