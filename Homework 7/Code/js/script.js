$(document).ready(function() {

    const mDuration = 300;
    const mDurationButton = 200;

    /* Contact Us Button */
    const contactUsBtn = ".btn-contact-us";
    $(contactUsBtn)
        .mouseenter(function() {
            $(this).attr("src", "./images/btn_contact_us_hover.png");
        })
        .mouseleave(function() {
            $(this).attr("src", "./images/btn_contact_us.jpg");
        })
        .click(function() {
            $(this).attr("src", "./images/btn_contact_us_clicked.png");
        });

    /* Shop Now Button */
    const shopNowBtn = ".btn-shop-now";
    $(shopNowBtn)
        .mouseenter(function() {
            $(this).attr("src", "./images/btn_shop_now_hover.png");
        })
        .mouseleave(function() {
            $(this).attr("src", "./images/btn_shop_now.jpg");
        })
        .click(function() {
            $(this).attr("src", "./images/btn_shop_now_clicked.png");
        });

    /* Text Container */
    const cateListItems = ".categories-list-items";
    $(cateListItems)
        .mouseenter(function() {
            TweenMax.to($(this).find(".text-container"), 0.2, { backgroundColor: "#cceaeb" });
            TweenMax.to($(this).find("h1"), 0.3, { color: "#00999e" });

        })
        .mouseleave(function() {
            TweenMax.to($(this).find(".text-container"), 0.3, { backgroundColor: "#00999e" });
            TweenMax.to($(this).find("h1"), 0.3, { color: "#ffffff" });
        });
});