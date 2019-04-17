$(document).ready(function() {

    const mDuration = 300;
    const mDurationButton = 200;

    /* Play Button */
    const playButton = ".btn-play";
    $(playButton)
        .mouseenter(function() {
            $(this).fadeOut(mDuration, function() {
                $(this).attr("src", "./images/btn_play_hover.png");
                $(this).fadeIn(mDurationButton);
            });
        })
        .mouseleave(function() {
            $(this).fadeOut(mDuration, function() {
                $(this).attr("src", "./images/btn_play.png");
                $(this).fadeIn(mDuration);
            });
        });

    /* Categories List */
    const hoverHorizontalLineHTML = "<div class='hover-horizontal-line'></div>";
    const boxBackGroundHTML = "<div class='box-background'></div>";

    const cateListItems = ".categories-list-items";

    $(cateListItems).append(hoverHorizontalLineHTML); // Create horizontal line in each 'categories-list-items'
    $(".hover-horizontal-line").hide(); // Hide all horizontal lines

    $(cateListItems).append(boxBackGroundHTML);
    $(".box-background").hide();

    $(cateListItems).each(function(index) {
        $(this).children().css("z-index", "200");
        $(this).find(".box-background").css("z-index", "100"); //Set z-index so that "box-background" stays low
        $(this).find("img").css("z-index", "10"); //Set z-index so that "img" stays at the lowest level
    });

    $(cateListItems)
        .mouseenter(function() {
            $(this).find(".box-background").fadeIn(mDuration);

            $(this).find("h3").animate({
                "top": "36px"
            }, mDuration);

            $(this).find(".hover-horizontal-line").fadeIn(mDuration);

            $(this).find("p").animate({
                "top": "65px"
            }, mDuration);
        })
        .mouseleave(function() {
            $(this).find(".box-background").fadeOut(mDuration);

            $(this).find("h3").animate({
                "top": "42px"
            }, mDuration);

            $(this).find(".hover-horizontal-line").fadeOut(mDuration);

            $(this).find("p").animate({
                "top": "63px"
            }, mDuration);
        });



    /* Dropdown Menu Button */
    const dropDownMenu = ".dropdown-menu";
    const dropDownItems = ".dropdown-menu-items";

    $(dropDownMenu).parent().on('show.bs.dropdown', function() {
        TweenMax.to(dropDownItems, 0, { opacity: 1, y: "0%" }); // Reset to original position
        TweenMax.staggerFrom(dropDownItems, 0.3, { opacity: 0, y: "-10%" }, 0.1);
        $(dropDownMenu).stop(true, true).fadeIn(mDuration);
    });

    $(dropDownMenu).parent().on('hide.bs.dropdown', function() {
        TweenMax.staggerTo(dropDownItems, 0.3, { opacity: 0, y: "-10%" }, 0.1);
        $(dropDownMenu).stop(true, true).fadeOut(mDuration);
    })

    /* Dropdown Menu Items Hover */
    $(dropDownItems).append(boxBackGroundHTML);
    $(".box-background").hide();

    $(dropDownItems).each(function(index) {
        $(this).children().css("z-index", "200");
        $(this).find(".box-background").css("z-index", "100"); //Set z-index so that "box-background" stays low
        $(this).find("img").css("z-index", "10"); //Set z-index so that "img" stays at the lowest level
    });

    $(dropDownItems)
        .mouseenter(function() {
            // $(this).find(".box-background").fadeIn(mDuration);
            $(this).find(".box-background").fadeIn(mDuration);
        })
        .mouseleave(function() {
            $(this).find(".box-background").fadeOut(mDuration);
        });
});