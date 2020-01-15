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

  new WOW().init();
});

/* SUBMENU */
$(document).ready(function () {
  $('.main-nav__link.hasSubmenu').click(function () {
    event.preventDefault();
  });

  var mobileWidthMarker = true;
  if ($(window).width() >= 1200) {
    mobileWidthMarker = false;
  }

  if (mobileWidthMarker) {
    showSubmenuByClick();
  } else {
    showSubmenuByHover();
  }

  $(window).resize(function () {
    if ($(window).width() < 1200) {
      if (mobileWidthMarker) {
        $('.main-nav__link.hasSubmenu').off('mouseenter');
        $('.main-nav__item').off('mouseleave');
        showSubmenuByClick();
        mobileWidthMarker = false;
      }
    } else if ($(window).width() >= 1200) {
      if (!mobileWidthMarker) {
        $('.main-nav__link.has-submenu').off('click');
        showSubmenuByHover();
        mobileWidthMarker = true;
      }
    }
  });

  function showSubmenuByClick() {
    $('.main-nav__link.hasSubmenu').click(function () {
      $(this).closest('.main-nav__item').siblings().find('.submenu').stop().slideUp(300);
      $(this).closest('.main-nav__item').find('.submenu').stop().slideToggle(300);
    });
  }

  function showSubmenuByHover() {
    $('.main-nav__link.hasSubmenu').mouseenter(function () {
      $(this).closest('.main-nav__item').find('.submenu').fadeIn(300);

      $(this).closest('.main-nav__item').mouseleave(function () {
        $(this).find('.submenu').fadeOut(300);
      });
    });
  }
});


$(document).ready(function () {
  // Init fancybox
  var selector = '.preview-slider__slide:not(.swiper-slide-duplicate) a';

  // Skip cloned elements
  $().fancybox({
    selector: selector,
    backFocus: false,
    thumbs: false,
    hash: false,
    loop: true,
    animationEffect: "fade",
    beforeClose: function (instance) {
      // Update position of the slider
      previewSwiper.slideTo(instance.currIndex, 0);
    }
  });

  // Attach custom click event on cloned elements,
  // trigger click event on corresponding link
  $(document).on('click', '.preview-slider .swiper-slide-duplicate', function (e) {
    $(selector)
      .eq(($(e.currentTarget).attr("data-swiper-slide-index") || 0) % $(selector).length)
      .trigger("click.fb-start", {
        $trigger: $(this)
      });

    return false;
  });

  var previewSwiper = new Swiper('.preview-slider', {
    slidesPerView: 1,
    breakpoints: {
      560: {
        slidesPerView: 2,
      },
      940: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
    loop: true
  })
});


$(document).ready(function () {

  $(document).ready(function () {

    var heroSwiper = new Swiper('.hero-slider', {
      init: false,
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    })

    // var videoSlide = $('.hero-slider__video');

    $('.videoSlide').each(function (index) {
      var videoContainer = $(this).find('.video');
      var videoId = videoContainer.data('video-id');
      var videoSrc = 'https://www.youtube.com/embed/' + videoId +
        '?enablejsapi=1&version=3&controls=0&fs=0&iv_load_policy=3&rel=0&showinfo=0&loop=1&playlist=' + videoId +
        '&autoplay=1&amp;mute=1';
      videoContainer.append('<iframe frameborder="0" allowfullscreen></iframe>');
      var iframe = $(this).find('iframe');
      iframe.attr('src', videoSrc);

      // iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo"}', '*')

    });
    // .contentWindow.postMessage('{"event":"command","func":"pauseVideo"}', '*')
    // .contentWindow.postMessage('{"event":"command","func":"playVideo"}', '*')

    heroSwiper.on('init', function () {
      /* do something */
    });

    // init Swiper
    heroSwiper.init();


    (function ($) {
      jQuery(document).ready(function ($) {
        heroSwiper.on("transitionStart", function (swiper) {
          var currentSlide, slideType, player, command;
          currentSlide = $('.swiper-container').find(".swiper-slide-active");
          previousSlide = $('.swiper-container').find(".swiper-slide-prev");

          slideType = currentSlide.attr("class").split(" ")[2];
          player = currentSlide.find("iframe").get(0);
          command = {
            "event": "command",
            "func": "playVideo"
          };
          if (player != undefined) {
            player.contentWindow.postMessage(JSON.stringify(command), "*");
          }

          slideType = previousSlide.attr("class");
          if (slideType != undefined) {
            slideType = slideType.split(" ")[2];
            player = previousSlide.find("iframe").get(0);
            command = {
              "event": "command",
              "func": "pauseVideo"
            };
            // If you don't using autoplay you should use "stopVideo" instead of "pauseVideo"
            if (player != undefined) {
              player.contentWindow.postMessage(JSON.stringify(command), "*");
            }
          }
        });
      });
    })(jQuery);


  });




  var heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade',
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
  })
});
