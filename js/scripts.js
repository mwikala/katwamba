AOS.init();

var slidePos = 0;

function updateSliderCounter(slidePos) {
    $(".sliderPos").text(slidePos + 1);
}

function initialiseSlider() {

    // first we get the slider
    var slider = $(".slider").first();

    // insert controls to allow user to navigate between slides
    $(slider).before('<div id="slidePrev"></div>');
    $(slider).after('<div id="slideNext"></div>');

    // hide all slides except first (this means a slide will still show if slider breaks)
    $('.slider > *:not(:first-child)').addClass("hide");

    // get slides
    var slides = $('.slider > *');

    // update UI to show total number of slides
    $(".sliderTotal").text(slides.length);

    // when the slider controls, inserted earlier are clicked
    $('#slidePrev').click(function () {
        if (slidePos !== 0) {
            $(slides[slidePos]).addClass("hide");
            slidePos--;
            updateSliderCounter(slidePos);
        }
    });

    $('#slideNext').click(function () {
        if (slidePos !== slides.length - 1) {
            slidePos++;
            $(slides[slidePos]).removeClass("hide");
            updateSliderCounter(slidePos);
        }
    });

    let touchstartX = 0;
    let touchendX = 0;
    let gestureZone = document.getElementsByClassName('middle');

    if (gestureZone.length > 0) {
        gestureZone[0].addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gestureZone[0].addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false);

        function handleGesture() {
            if (touchendX < touchstartX) {
                if (slidePos !== slides.length - 1) {
                    slidePos++;
                    $(slides[slidePos]).removeClass("hide");
                    updateSliderCounter(slidePos);
                }
            }

            if (touchendX > touchstartX) {
                if (slidePos !== 0) {
                    $(slides[slidePos]).addClass("hide");
                    slidePos--;
                    updateSliderCounter(slidePos);
                }
            }
        }
    }

}

$(function () {

    // make hamburger open the menu
    $("#menu-button, .overlay").click(function () {
        $('body').toggleClass('menu-active');
    });

    // window on load waits for images to be loaded as well, but must be inside jquery ready to allow for query to work;
    $(window).on("load", function () {
        // initialise slider    
        initialiseSlider();
    });

});

function registerSwipeEvents(gestureZone) {

}