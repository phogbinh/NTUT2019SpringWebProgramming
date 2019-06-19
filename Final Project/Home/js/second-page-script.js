/* File description:
This is the source code file 'SecondPageScript.js'. This file is the implementation of the second page's animation. */

/////////////////////////////////////////////////////////////////////////////////
/// Import global variables
/////////////////////////////////////////////////////////////////////////////////
import { pageAnimations } from "./script.js";

/////////////////////////////////////////////////////////////////////////////////
/// Documents ready
/////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    /* BUTTON SCROLL UP INFINITE ANIMATION */
    TweenMax.to(".btn-scroll-up", 1, { y: -10, repeat: -1, repeatDelay: 0.5, yoyo: true, ease: Bounce.easeIn });

    /* BOX HOVER ANIMATIONS */
    const $box = $(".pb-box");

    // Set opacity of "Read more" to 1, and scale it to 0

    $box.each(function(index, element) {
        // Set the duration
        const duration = 1.75;

        // Set the color
        const lightGreen = "rgb(118, 179, 157)";
        const darkBlue = "rgb(5, 0, 78)";
        const darkRed = $("#fullpage .section:nth-child(2)").css("background-color");
        const boxColor = [
            lightGreen, // left section, top left box
            darkBlue, // left section, top right box
            darkRed, // left section, bottom left box
            lightGreen, // left section, bottom right box
            darkRed, // right section, top box
            darkBlue // right section, bottom box
        ];

        // Create a timeline for this element in paused state
        let mTimeline = new TimelineMax({ paused: true });

        // Create your tween of the timeline in a variable
        let mTween = mTimeline
            // Box flips vertically, zooms, and change color
            .to($(element).find(".pb-animation-box"), duration, {
                backgroundColor: boxColor[index],
                scale: 1.1,
                zIndex: 1,
                opacity: 1,
                rotationY: 360,
                boxShadow: "0 2px 5px 0 black",
                ease: Back.easeOut.config(1.1)
            }, "#boxGo")
            // Texts turn white
            .to($(element).find("h1"), duration, { color: "rgb(255, 255, 255)", ease: Expo.easeOut }, "#boxGo")
            .to($(element).find("p"), duration, { color: "rgb(255, 255, 255)", ease: Expo.easeOut }, "#boxGo");

        // Store the tween timeline in the javascript DOM node
        element.animation = mTween;

        // Create the event handler
        $(element)
            .on("mouseenter", function() {
                // Wait for the second page animation to finish before trigger any animations
                if (pageAnimations[1].progress() == 1) {
                    // Play the animation
                    this.animation.play();
                    // Change background color as boxes are hovered
                    TweenMax.to("#fullpage .section:nth-child(2)", duration, { backgroundColor: boxColor[index], ease: Power3.easeOut }, "#boxGo")
                }
            })
            .on("mouseleave", function() {
                // Wait for the second page animation to finish before trigger any animations
                if (pageAnimations[1].progress() == 1) {
                    // Reverse the animation
                    this.animation.reverse();
                    // Reset background color as boxes are left
                    TweenMax.to("#fullpage .section:nth-child(2)", duration, { backgroundColor: darkRed, ease: Power3.easeOut }, "#boxGo");
                }
            });
    });

    // On click
    $('#box-1').on("click", function() {
        window.location = "../About/index.html";
    });
    $('#box-2').on("click", function() {
        window.location = "../Overview/index.html";
    });
    $('#box-3').on("click", function() {
        window.location = "../DevTeam/index.html";
    });
    $('#box-4').on("click", function() {
        window.location = "../License/index.html";
    });
    $('#box-5').on("click", function() {
        window.location = "../Watch/index.html";
    });
    $('#box-6').on("click", function() {
        window.location = "../Legends/index.html";
    });

});