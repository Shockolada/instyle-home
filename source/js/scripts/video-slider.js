$(document).ready(function () {
  /* Create iframes */
  $(".video-slide").each(function (index) {
    var videoSlide, videoContainer, videoType, videoId, videoSrc;
    videoSlide = $(this);
    videoContainer = videoSlide.find(".video-container");
    videoType = videoContainer.data("video-type");
    videoId = videoContainer.data("video-id");

    if (videoType === "youtube") {
      videoSrc =
        "https://www.youtube.com/embed/" +
        videoId +
        "?enablejsapi=1&version=3&controls=0&fs=0&iv_load_policy=3&rel=0&showinfo=0&loop=1&playlist=" +
        videoId +
        "&amp;mute=1";
      videoContainer.append(
        '<iframe frameborder="0" allowfullscreen></iframe>'
      );
    } else if (videoType === "vimeo") {
      videoSrc =
        "https://player.vimeo.com/video/" +
        videoId +
        "?api=1&byline=0&portrait=0&title=0&background=1&mute=1&loop=1&autoplay=0&id=" +
        videoId +
        "";
      videoContainer.append(
        '<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
      );
    }

    var iframe = $(this).find("iframe");
    iframe.attr("src", videoSrc);
  });

  /* POST commands to YouTube or Vimeo API */
  function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  /* Play and pause video when the slide is changing */
  function playPauseVideo(slider, control) {
    var currentSlide, videoType, player;

    currentSlide = slider.find(".swiper-slide-active");
    videoType = currentSlide.find(".video-container").data("video-type");
    player = currentSlide.find("iframe").get(0);

    if (videoType === "vimeo") {
      switch (control) {
        case "play":
          postMessageToPlayer(player, {
            method: "play",
            value: 1
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            method: "pause",
            value: 1
          });
          break;
      }
    } else if (videoType === "youtube") {
      switch (control) {
        case "play":
          postMessageToPlayer(player, {
            event: "command",
            func: "mute"
          });
          postMessageToPlayer(player, {
            event: "command",
            func: "playVideo"
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            event: "command",
            func: "pauseVideo"
          });
          break;
      }
    }
  }

  /* Show slider progress */
  var intervalId;
  function setSlideProgress(slider, autoplayTime) {
    var slideProgress, width;
    slideProgress = slider.find('.hero-slider__progress');
    width = 1;
    autoplayDuration = autoplayTime / 1000;
    intervalId = setInterval(frame, autoplayDuration);

    function frame() {
      if (width < 100) {
        width += 0.1;
        slideProgress.width(width + '%');
      }
    }
  }
  function clearSlideProgress() {
    clearInterval(intervalId)
  }

  // Connect to slider
  $(function () {
    var mainVideoSlider = $(".hero-slider");
    var autoplayDuration = 6000;

    // Slider settings
    var heroSlider = new Swiper(".hero-slider", {
      init: false,
      loop: true,
      effect: "fade",
      simulateTouch: false,
      autoplay: {
        delay: autoplayDuration,
        disableOnInteraction: false
      },
    });

    heroSlider.on("init", function () {
      playPauseVideo(mainVideoSlider, "play");
      // setSlideProgress(mainVideoSlider, autoplayDuration)
    });

    heroSlider.on("slideChange", function () {
      // clearSlideProgress();
      // setSlideProgress(mainVideoSlider, autoplayDuration)
      playPauseVideo(mainVideoSlider, "pause");
    });

    heroSlider.on("slideChangeTransitionStart", function () {
      playPauseVideo(mainVideoSlider, "play");
    });

    //start the slider
    heroSlider.init();
  });
});
