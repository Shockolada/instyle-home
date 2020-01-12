$(document).ready(function () {

  $('.menuToggle').click(function () {
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
  });

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 200) {
      $('.page-header__wrap').addClass('scrolled');
    } else {
      $('.page-header__wrap').removeClass('scrolled');
    }
  });


});
