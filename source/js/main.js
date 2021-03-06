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
  var mobileWidthMarker = true;
  if ($(window).outerWidth() >= 1200) {
    mobileWidthMarker = !mobileWidthMarker;
    console.log('desktop')
  }

  if (!mobileWidthMarker) {
    showSubmenuByHover();
  }

  // $(window).resize(function () {
  //   if ($(window).width() < 1200) {
  //     if (mobileWidthMarker) {
  //       mobileWidthMarker = !mobileWidthMarker;
  //       console.log(mobileWidthMarker)
  //     }
  //   } else if ($(window).width() >= 1200) {
  //     if (!mobileWidthMarker) {
  //       mobileWidthMarker = !mobileWidthMarker;
  //       console.log(mobileWidthMarker)
  //     }
  //   }
  // });

  $('.btn-plus').click(function (evt) {
    evt.preventDefault();
    $(this).toggleClass('active');
  });

  $('.main-nav__submenu-btn').click(function () {
    $(this).closest('.main-nav__item').siblings().find('.submenu').stop().slideUp(300);
    $(this).closest('.main-nav__item').find('.submenu').stop().slideToggle(300);
  });

  function showSubmenuByHover() {
    $('.main-nav__item.hasSubmenu .main-nav__link').mouseenter(function () {
      $(this).closest('.main-nav__item').find('.submenu').stop().fadeIn(300);

      $(this).closest('.main-nav__item').mouseleave(function () {
        $(this).find('.submenu').stop().fadeOut(300);
      });
    });
  }

  /* SHOW MAP */
  $('.showMapBtn').click(function () {
    $('.map__wrap').fadeToggle(500);
  });
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
    slidesPerView: 'auto',
    freeMode: true,
    breakpoints: {
      940: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 5,
      }
    },
    loop: true
  })
});

$(document).ready(function () {
  var sliderThumbs = new Swiper('.main-slider__thumbs', {
    slidesPerView: 1,
    slidesPerView: 'auto',
    breakpoints: {
      940: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 5,
      },
    },
    loop: false,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var mainSlider = new Swiper('.main-slider', {
    effect: "fade",
    thumbs: {
      swiper: sliderThumbs
    }
  });
});

$(document).ready(function () {
  $('.hero__wrap .scrollDown').click(function (evt) {
    evt.preventDefault();
    var scrolledBlock = $('.hero__wrap');
    var header = $('.page-header__wrap');
    var newTop = scrolledBlock.outerHeight() - 92;

    console.log(newTop)

    $('body, html').animate({
      scrollTop: newTop
    }, 300)

  });
});

$(document).ready(function () {
  $('.scrollTo').click(function (evt) {
    evt.preventDefault();
    var id = $(this).attr('href');
    var newTop = $(id).offset().top - 120;

    console.log(newTop)

    $('body, html').animate({
      scrollTop: newTop
    }, 300)
  });
});
