/* File description:
This is the source code file 'script.js'. This is the first initialization of the whole website. Currently, it consists of the initialization of fullpage.js and of the two pages animation. */

/////////////////////////////////////////////////////////////////////////////////
/// Export global variables
/////////////////////////////////////////////////////////////////////////////////

/*--------- FULL PAGE ANIMATIONS ---------*/
// Code explanation: $(".section") yields us two sections, which is map to the CreatePageAnimations() function to create Timeline animation for each page

export let pageAnimations = $(".section").map(CreatePageAnimations);

function CreatePageAnimations(index, element) {
    const animationPosition = "#page" + index + "Go";
    let mTimeline = new TimelineMax({ paused: true });

    switch (index) {
        case 0: // First page
            const distance = 100;

            mTimeline
                .from(".pb-intro h1:nth-child(1)", 1, { y: distance, opacity: 0 }, animationPosition)
                .from(".pb-intro h1:nth-child(2)", 0.5, { y: distance, opacity: 0 }, animationPosition + 0.5)
                .from(".pb-intro .btn-play-now", 1.5, { y: distance, opacity: 0 }, animationPosition + 0.75)
                .from(".btn-scroll-down", 1, { opacity: 0 }, "#scrollDownBtnDisplay")

            break;

        case 1: // Second page
            const boxAnimationDuration = 1;
            const otherAnimationStartDuration = boxAnimationDuration - 0.4;
            const boxAnimationDistance = 50;

            mTimeline
                .from("#box-1", boxAnimationDuration, { x: -200, rotationZ: -180, opacity: 0, ease: Quad.easeOut }, animationPosition)
                // middle animation
                .from("#footer", 0.5, { opacity: 0 }, boxAnimationDuration)
                .from("#box-5", boxAnimationDuration, { y: boxAnimationDistance, scale: 0.9, opacity: 0, ease: Quad.easeOut }, otherAnimationStartDuration)
                .from("#box-6", boxAnimationDuration, { y: boxAnimationDistance, scale: 0.9, opacity: 0, ease: Quad.easeOut }, otherAnimationStartDuration)
                .from("#box-2", boxAnimationDuration, { y: -boxAnimationDistance, opacity: 0, ease: Quad.easeOut }, otherAnimationStartDuration)
                // last animation
                .from("#box-3", boxAnimationDuration, { y: boxAnimationDistance, opacity: 0, ease: Quad.easeOut }, otherAnimationStartDuration + 0.25)
                .from("#box-4", boxAnimationDuration, { x: boxAnimationDistance, opacity: 0, ease: Quad.easeOut }, otherAnimationStartDuration + 0.25);

            break;

        default:
            console.log("Page animation is not included in case: " + index);
            break;

    }

    return (mTimeline);
}

/////////////////////////////////////////////////////////////////////////////////
/// Documents ready
/////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

    /*--------- FULL PAGE ---------*/
    const mFullPage = new fullpage("#fullpage", {
        autoScrolling: true, // no scroll bar
        navigation: true, // navigation dot
        anchors: ["section1", "section2"], // section hyper link
        scrollingSpeed: 750,
        responsiveHeight: 400,
        afterLoad: PlayPageAnimations
    });

    /*------ PAGES' ANIMATIONS ------*/
    function PlayPageAnimations(origin, destination, direction) {
        // Reset previous page animation
        if (origin) {
            pageAnimations[origin.index].reverse();
        }

        // First page one-time animation
        // if (destination.index == 0 && direction != "up") {
        //     new TimelineMax()
        //         .from(".pb-nav-menu", 2, { opacity: 0 }, "#firstPageGo")
        //         .from(".pb-nav-bar", 2, { opacity: 0 }, "#firstPageGo");
        // }

        pageAnimations[destination.index].play();
    }

});