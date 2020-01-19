$(document).ready(function () {

  /* Create iframes */
  $('.video-slide').each(function (index) {
    var videoSlide, videoContainer, videoType, videoId, videoSrc;
    videoSlide = $(this);
    videoContainer = videoSlide.find('.video-container');
    videoType = videoContainer.data('video-type');
    videoId = videoContainer.data('video-id');

    console.log(videoType)
    if (videoType === 'youtube') {
      videoSrc = 'https://www.youtube.com/embed/' + videoId +
        '?enablejsapi=1&version=3&controls=0&fs=0&iv_load_policy=3&rel=0&showinfo=0&loop=1&playlist=' + videoId +
        '&autoplay=1&amp;mute=1';
      videoContainer.append('<iframe frameborder="0" allowfullscreen></iframe>');
    } else if (videoType === 'vimeo') {
      videoSrc = 'https://player.vimeo.com/video/' + videoId + '?api=1&byline=0&portrait=0&title=0&background=1&mute=1&loop=1&autoplay=0&id=' + videoId + ''
      videoContainer.append('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    }

    var iframe = $(this).find('iframe');
    iframe.attr('src', videoSrc);
  });

  // POST commands to YouTube or Vimeo API
  function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  // Play and pause video when the slide is changing
  function playPauseVideo(slider, control) {
    var currentSlide, slideType, player;

    currentSlide = slider.find(".swiper-slide-active");
    slideType = currentSlide.data('slide-type');
    player = currentSlide.find("iframe").get(0);

    if (slideType === "vimeo") {
      switch (control) {
        case "play":
          postMessageToPlayer(player, {
            "method": "play",
            "value": 1
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            "method": "pause",
            "value": 1
          });
          break;
      }
    } else if (slideType === "youtube") {
      switch (control) {
        case "play":
          postMessageToPlayer(player, {
            "event": "command",
            "func": "mute"
          });
          postMessageToPlayer(player, {
            "event": "command",
            "func": "playVideo"
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            "event": "command",
            "func": "pauseVideo"
          });
          break;
      }
    }
  }
  // Connect to slider
  $(function () {
    var mainVideoSlider = $('.hero-slider');

    // function setSlidreProgress(slider) {
    //   var slideChangeDuration, slideProgress;
    //   slideProgress = $(+ slider + ' .hero-slider__progress')[0];
    //   slideChangeDuration = slider.params.autoplay.delay;
    //   console.log(slideChangeDuration)
    //   slideProgress.animate({
    //     width: "100%"
    //   }, slideChangeDuration)
    // }

    // Slider settings
    var heroSlider = new Swiper('.hero-slider', {
      init: false,
      loop: true,
      effect: 'fade',
      simulateTouch: false,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    })

    heroSlider.on('init', function () {
      console.log(heroSlider.params.autoplay.delay)
      playPauseVideo(mainVideoSlider, "play");
    });

    heroSlider.on("slideChange", function () {
      playPauseVideo(mainVideoSlider, "pause");
      // setSlidreProgress(heroSlider);
    });

    heroSlider.on("slideChangeTransitionStart", function () {
      playPauseVideo(mainVideoSlider, "play");
    });

    //start the slider
    heroSlider.init();
  });
});
