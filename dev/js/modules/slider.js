;
(function ($) {

    $(window).load(function () {
        console.log('hiiiii');

        var slider = $('.slider'),
            sliderWrap = [],
            sliderList = [],
            sliderItem = [],
            sliderImg = [],

            defaults = {
                slideCount: 4g,
                controls: true,
                prevText: 'prev',
                nextText: 'next'
            },
            opt = {};

        var config = $.extend({}, defaults, opt);

        init();


        function init() {
            slider = $('.slider');
            sliderWrap = slider.find('.slider__wrapper');
            sliderList = slider.find('.slider__list');
            sliderItem = slider.find('.slider__item');
            sliderImg = slider.find('.slider__img');

            setSliderWidth();
            addControlsButton(defaults.controls);
            setUpListener();

        }

        function setUpListener() {
            $('.button').on('click', slide);
        }

        function setSliderWidth() {
            var sliderWrapWidth = sliderItem.outerWidth(true) * config.slideCount;
            console.log(sliderWrapWidth);
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

        function prevSlide() {
            var posLeft = sliderList.css('left');
            sliderList.css({
                left: parseInt(posLeft) - sliderItem.outerWidth(true)
            });
        }

        function nextSlide() {
            var posLeft = sliderList.css('left');
            sliderList.css({
                left: parseInt(posLeft) + sliderItem.outerWidth(true)
            });
        }

    })

})(jQuery);