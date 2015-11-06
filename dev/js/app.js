;
(function ($) {

    var slider = [],
        sliderWrap = [],
        sliderList = [],
        sliderItem = [],
        sliderImg = [],
        sliderWrapWidth = 0,
        stopNextValue = 0,
        canSlide = true,

        defaults = {
            slideCount: 4,
            controls: true,
            prevText: 'prev',
            nextText: 'next',
            auto: false,
            autoTime: 2000
        },

        options = {};

    function setUpListener() {
        $('.button').on('click', slide);
    }

    function setSliderWidth() {
        sliderWrapWidth = sliderItem.outerWidth(true) * options.slideCount;
        sliderWrap.width(sliderWrapWidth);
    }

    function addControlsButton(controls) {
        if (!controls) return;

        var nextButton = $('<a>', {
                class: 'button button-next',
                text: defaults.nextText
            }),

            prevButton = $('<a>', {
                class: 'button button-prev',
                text: defaults.prevText
            });

        nextButton.add(prevButton).appendTo(slider);
    }

    function slide() {
        stopNextValue = sliderItem.outerWidth(true) * (sliderItem.length - options.slideCount);

        if (!canSlide) return;
        canSlide = false;

        if ($(this).hasClass('button-prev')) {
            prevSlide();
        } else {
            nextSlide();
        }

        sliderList.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
            canSlide = true;
        })
    }

    function autoSlide() {
        if (options.auto) {
            var next = $('.button-next');
            setInterval(function () {
                next.click()
            }, options.autoTime)
        }
    }

    function nextSlide() {
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

    function prevSlide() {
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

    window.slider = {
        init: function (opt) {
            options = $.extend({}, defaults, opt);
            slider = $('.slider');
            sliderWrap = slider.find('.slider__wrapper');
            sliderList = slider.find('.slider__list');
            sliderItem = slider.find('.slider__item');
            sliderImg = slider.find('.slider__img');

            setSliderWidth();
            addControlsButton(defaults.controls);
            autoSlide();
            setUpListener();
        }
    }

})(jQuery);

slider.init({
    slideCount: 3,
    auto: true,
    autoTime: 3000
});