;
(function () {
    /* ------- plugins init ------- */

    console.log('hi');

})();
;
(function ($) {

    var slider = [],
        sliderWrap = [],
        sliderList = [],
        sliderItem = [],
        sliderImg = [],
        sliderWrapWidth = 0,

        defaults = {
            slideCount: 4,
            controls: true,
            prevText: 'prev',
            nextText: 'next'
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
        if ($(this).hasClass('button-prev')) {
            prevSlide();
        } else {
            nextSlide();
        }
    }

    function nextSlide() {
        var posLeft = sliderList.css('left'),
            stopNextValue = sliderItem.outerWidth(true) * (sliderItem.length - options.slideCount);


        if (Math.abs(parseInt(posLeft)) >= stopNextValue) return;
        sliderList.css({
            left: parseInt(posLeft) - sliderItem.outerWidth(true)
        });
    }

    function prevSlide() {
        var posLeft = sliderList.css('left');

        if (parseInt(posLeft) >= 0) return;
        sliderList.css({
            left: parseInt(posLeft) + sliderItem.outerWidth(true)
        });
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
            setUpListener();

        }
    }

})(jQuery);

slider.init({
    slideCount: 6
});