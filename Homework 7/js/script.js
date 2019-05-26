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


/* Media Query */
function myFunction(x) {
    if (x.matches) { // If media query matches
        document.getElementById("btn-nav-search").src = "../images/btn_nav_search_collapse.png";
        document.getElementById("btn-nav-favourite").src = "../images/btn_nav_favourite_collapse.png";
        document.getElementById("btn-nav-shopping-cart").src = "../images/btn_nav_shopping_cart_collapse.png";
        document.getElementById("btn-nav-user").src = "../images/btn_nav_user_collapse.png";
    } else {
        document.getElementById("btn-nav-search").src = "../images/btn_nav_search.png";
        document.getElementById("btn-nav-favourite").src = "../images/btn_nav_favourite.png";
        document.getElementById("btn-nav-shopping-cart").src = "../images/btn_nav_shopping_cart.png";
        document.getElementById("btn-nav-user").src = "../images/btn_nav_user.png";
    }
}

var x = window.matchMedia("(max-width: 992px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes