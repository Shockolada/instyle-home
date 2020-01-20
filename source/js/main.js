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

