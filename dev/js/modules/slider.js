;
(function ($) {

  var slider = [],
      sliderWrap = null,
      sliderList = null,
      sliderItem = null,
      sliderImg = null,
      sliderWrapWidth = 0,
      stopNextValue = 0,
      canSlide = true,
      autoSlideMoveId = 0,

      defaults = {
        slideCount: 4,
        controls: true,
        prevText: 'prev',
        nextText: 'next',
        autoSlideMove: false,
        autoTime: 2000,
        infinityMove: false
      },

      options = {};

  function setUpListener() {
    $('.button').on('click', slide);
    sliderList.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
      canSlide = true;
    })

  }

  function setSliderWidth() {
    sliderWrapWidth = sliderItem.outerWidth(true) * options.slideCount;
    sliderWrap.width(sliderWrapWidth);
  }

  function addControlsButton(controls) {
    if (!controls) return;

    var nextButton = $('<a class="button button-next" data-button="next"></a>'),
        prevButton = $('<a class="button button-prev" data-button="prev"></a>');

    nextButton.text(defaults.nextText);
    prevButton.text(defaults.prevText);
    nextButton.add(prevButton).appendTo(slider);
  }

  function slide() {
    stopNextValue = sliderItem.outerWidth(true) * (sliderItem.length - options.slideCount);

    if (!canSlide) return;
    canSlide = false;

    if ($(this).attr('data-button') === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }

  }

  function autoSlideMove() {
    if (options.autoSlideMove) {
      var next = $('.button-next');
      autoSlideMoveId = setInterval(function () {
        next.click()
      }, options.autoTime)
    }
  }

  function autoSlideStop() {
    clearInterval(autoSlideMoveId);
  }

  function nextInfinityMove() {
    var posLeft = sliderList.css('left');

    if (Math.abs(parseInt(posLeft)) >= stopNextValue) {
      sliderList.css({
        left: 0
      })
    } else {
      sliderList.css({
        left: parseInt(posLeft) - sliderItem.outerWidth(true)
      });
    }
  }

  function prevInfinityMove() {
    var posLeft = sliderList.css('left');

    if (parseInt(posLeft) >= 0) {
      sliderList.css({
        left: -stopNextValue + 'px'
      })
    } else {
      sliderList.css({
        left: parseInt(posLeft) + sliderItem.outerWidth(true)
      });
    }
  }

  function prevMove() {
    var posLeft = sliderList.css('left');

/*    if (parseInt(posLeft) >= 0) {
      sliderList.css({
        left: -stopNextValue + 'px'
      })
    } else {
      sliderList.css({
        left: parseInt(posLeft) + sliderItem.outerWidth(true)
      });
    }*/

    sliderList.css({
      left: parseInt(posLeft) + sliderItem.outerWidth(true)
    });
  }

  function nextMove() {
    var posLeft = sliderList.css('left');

    if (parseInt(posLeft) >= 0) {
      sliderList.css({
        left: -stopNextValue + 'px'
      })
    } else {
      sliderList.css({
        left: parseInt(posLeft) + sliderItem.outerWidth(true)
      });
    }
  }

  function nextSlide() {
    if (options.infinityMove) {
      nextInfinityMove();
    } else {
      nextMove();
    }
  }


  function prevSlide() {
    if (options.infinityMove) {
      prevInfinityMove();
    } else {
      prevMove();
    }
  }

  window.slider = {
    init: function (_options) {
      options = $.extend({}, defaults, _options);
      slider = $('.slider');
      sliderWrap = slider.find('.slider__wrapper');
      sliderList = slider.find('.slider__list');
      sliderItem = slider.find('.slider__item');
      sliderImg = slider.find('.slider__img');

      setSliderWidth();
      addControlsButton(defaults.controls);
      autoSlideMove();
      setUpListener();
    },

    autoSlideStop: autoSlideStop
  }

})(jQuery);

slider.init({
  slideCount: 3,
  autoSlideMove: true,
  autoTime: 5000,
  infinityMove: false
});
