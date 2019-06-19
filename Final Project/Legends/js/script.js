/* File description:
This is the source code file 'script.js'. This is the first initialization of the whole website */

$(document).ready(function() {
    /*--- BACK-TO-TOP BUTTON ---*/
    // Initialize ScrollMagic controller
    var scrollMagicController = new ScrollMagic.Controller();
    // Build ScrollMagic scene
    var scrollMagicScene = new ScrollMagic.Scene({
            triggerElement: ".pb-scroll-magic-placeholder"
        })
        .setTween(".btn-scroll-up", 0.5, { opacity: 1 }) // trigger a TweenMax.to tween
        // .addIndicators({ name: "1 (duration: 0)" }) // add indicators (requires plugin)
        .addTo(scrollMagicController);

    /* BACK-TO-TOP BUTTON ON CLICK */
    $(".btn-scroll-up").on("click", function() {
        // Scroll to top
        TweenMax.to(window, 1, { scrollTo: { y: 0, x: 0 } });
    });

    /* BUTTON SCROLL UP INFINITE ANIMATION */
    TweenMax.to(".btn-scroll-up", 1, { y: -10, repeat: -1, repeatDelay: 0.5, yoyo: true, ease: Bounce.easeIn });
});