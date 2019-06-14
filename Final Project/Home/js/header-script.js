/* File description:
This is the source code file 'HeaderScript.js'. This file is mostly about the behaviour of the navigation bar. */

$(document).ready(function() {
    /*--------- CONSTANT VARIABLES ---------*/
    const SCREEN_LARGE_WIDTH = 800;
    const SCREEN_MEDIUM_WIDTH = 640;
    const SLIDE_DOWN_DURATION = 0.5;

    /*--------- COMMON FUNCTIONS ---------*/
    function ShowNavMenu() {
        $navMenu.css({
            "display": "block",
            "opacity": "1",
            "transform": "scaleY(1)"
        });
    }

    function HideNavMenu() {
        // Hide the nav menu
        $navMenu.css({
            "display": "none",
            "opacity": "0",
            "transform": "scaleY(0)"
        });
    }

    function CreateHamburgerAnimation() {
        const duration = 0.2;
        const topDownOffset = 40;
        const topDownInitialOffset = 9;

        // Create the animation
        let mTimeline = new TimelineMax({ paused: true, reversed: true })
            .to('.hamburger .top', duration, { y: -topDownInitialOffset }, "#hamburgerGo")
            .to('.hamburger .bot', duration, { y: topDownInitialOffset }, "#hamburgerGo")
            // fade out the mid line
            .to(".hamburger .mid", duration, { opacity: 0 }, "#hamburgerGo")
            // translate the top & bottom line to the mid line position for rotation
            .to('.hamburger .top', duration, { y: topDownOffset }, '#hamburgerRotate')
            .to('.hamburger .bot', duration, { y: -topDownOffset }, '#hamburgerRotate')
            // rotate by center the top & bottom line
            .to('.hamburger .top', duration, { rotationZ: 45, transformOrigin: "center" }, '#hamburgerRotate')
            .to('.hamburger .bot', duration, { rotationZ: -45, transformOrigin: "center" }, '#hamburgerRotate')
            // slide down the nav menu
            .fromTo($navMenu, SLIDE_DOWN_DURATION, { scaleY: 0, transformOrigin: "top center", opacity: 0, ease: Quad.easeOut }, { scaleY: 1, transformOrigin: "top center", opacity: 1, ease: Quad.easeOut }, '#hamburgerRotate');

        return (mTimeline);
    }
    /*--------- COMMON VARIABLES ---------*/
    const $navMenu = $(".pb-nav-menu");
    const $helpDropDown = $(".pb-help-drop-down");
    let expandedHelpDropDownHeight = $helpDropDown.height();
    let isHelpDropDownExpanded = false;
    let hamburgerAnimation = CreateHamburgerAnimation();

    /*--------- MEDIA QUERIES ---------*/
    $(window).on("resize", function() {
        const windowWidth = $(window).width();

        /*------ NAV BAR ------*/

        if (windowWidth > SCREEN_LARGE_WIDTH) {
            // Always show the nav menu when expanded
            ShowNavMenu();
        } else {
            // Hide the nav menu when the window screen width is not large, and when the hamburger is not opened
            if (hamburgerAnimation.progress() == 0) {
                HideNavMenu();
            }
        }

        /*------ HELP DROP DOWN ------*/

        // Change help drop down height according to its children
        function GetHelpDropDownChildrenTotalHeight() {
            let totalHeight = 0;

            $helpDropDown.children().each(function() {
                totalHeight = totalHeight + $(this).outerHeight(true);
            });

            return (totalHeight);
        }

        expandedHelpDropDownHeight = GetHelpDropDownChildrenTotalHeight();

        // Resize the height of the help drop down if it is expanded
        if (isHelpDropDownExpanded) {
            $helpDropDown.height(expandedHelpDropDownHeight);
        }

        // Show the help drop down when the window screen width is large; hide it otherwise
        if (windowWidth > SCREEN_LARGE_WIDTH) {
            $helpDropDown.css({ "display": "" });
        } else {
            $helpDropDown.css({ "display": "none" });
        }
    });

    /*------ HAMBURGER ------*/
    // Show the nav menu to avoid hiding side-effect created by "CreateHamburgerAnimation" when the window screen width is large
    if ($(window).width() > SCREEN_LARGE_WIDTH) {
        ShowNavMenu();
    }

    // Create the event handler for clicking the hamburger
    $(".hamburger").on("click", function() {
        if (hamburgerAnimation.reversed()) {
            // Display the nav menu as block for playing animation
            $navMenu.css({ "display": "block" });

            // Play the animation showing the nav menu
            hamburgerAnimation.play();
        } else {
            // Add the on-complete call back function to the animation, to hide the nav menu
            hamburgerAnimation.tweenTo(0, { onComplete: HideNavMenu });

            // Reverse the animation showing the nav menu
            hamburgerAnimation.reverse();
        }
    });

    /*------ HELP DROP DOWN ------*/
    function CreateHelpDropDownAnimation() {
        // Create the animation
        let mTimeline = new TimelineMax({ paused: true, reversed: true })
            // slide down the help drop down
            .fromTo($helpDropDown, SLIDE_DOWN_DURATION, { scaleY: 0, transformOrigin: "top center", opacity: 0, ease: Back.easeOut }, { scaleY: 1, transformOrigin: "top center", opacity: 1, ease: Back.easeOut }, "#helpDropDownGo");

        return (mTimeline);
    }

    let helpDropDownAnimation = CreateHelpDropDownAnimation();

    // Create the event handler for clicking the caret down
    $("#caret-down").on("click", function() {
        if (helpDropDownAnimation.reversed()) {
            // Play the animation showing the nav menu
            helpDropDownAnimation.play();
        } else {
            // Reverse the animation showing the nav menu
            helpDropDownAnimation.reverse();
        }
    });
});