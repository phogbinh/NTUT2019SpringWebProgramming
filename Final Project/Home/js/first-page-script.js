/* File description:
This is the source code file 'FirstPageScript.js'. This file is the implementation of the first page's animation. */

$(document).ready(function() {
    /* ANIMATION ON MOUSE MOVE */
    $("#fullpage .section:nth-child(1)").on("mousemove", function(event) {
        const divider = -20;
        const moveX = (event.pageX / divider);
        const moveY = (event.pageY / divider);
        $(this).css("background-position", moveX + "px" + " " + moveY + "px");
        TweenMax.to(".pb-intro", 1, { x: moveX, y: moveY, ease: Quad.easeOut });
    });

    /* PLAY NOW BUTTON HOVER ANIMATION */
    let playNowButtonTimeline = new TimelineMax({ paused: true });
    playNowButtonTimeline
        .from(".btn-play-now .background-hover", 0.75, { scaleY: "0%", transformOrigin: "bottom center", ease: Quad.easeOut });

    $(".btn-play-now")
        .on("mouseenter", function() {
            playNowButtonTimeline.play();
        })
        .on("mouseleave", function() {
            playNowButtonTimeline.reverse();
        });

    /* BUTTON SCROLL DOWN INFINITE ANIMATION */
    TweenMax.to(".btn-scroll-down", 1, { y: 10, repeat: -1, repeatDelay: 0.5, yoyo: true, ease: Bounce.easeIn });
});