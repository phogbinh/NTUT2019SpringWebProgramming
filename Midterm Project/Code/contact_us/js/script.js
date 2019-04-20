$(document).ready(function() {
    /*-----------------------------FORM-----------------------------*/
    /*
        ~ WRITE DATA TO GOOGLE SHEETS ON SUBMIT BUTTON BEING CLICKED
        ~ Remark:
        ~ Do make sure that the attribute 'name' of each input in HTML is similar to each column name of the Google Sheets
    */
    const $form = $('form#mForm');
    const url = 'https://script.google.com/macros/s/AKfycbzhG7xvSnW3KyPUgJ2MdZ7-qaKhOU2E7-4_oEgdAdoyDS09sXBI/exec';

    $('#submit-form').on('click', function(e) {
        e.preventDefault();
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: $form.serializeObject()
        }).done(
            // Reload website
            () => {
                location.reload();
            }
        );
    })

    /*-----------------------------ANIMATION-----------------------------*/
    /* Dropdown Menu Button */
    const mDuration = 300;
    const boxBackGroundHTML = "<div class='box-background'></div>";
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
            $(this).find(".box-background").fadeIn(mDuration);
        })
        .mouseleave(function() {
            $(this).find(".box-background").fadeOut(mDuration);
        });

});


/*
    ~ READ DATA FROM GOOGLE SHEETS ON PAGE LOAD
    ~ Warning: Must be outside the jQuery function '$(document).ready(function() {...};'
*/

function init() {
    Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1L14C4cmVqUEwXlqdbC1LiH4kDwlz98kjXYu8OsBpFhc/edit?usp=sharing',
        callback: DisplaySheetDataInHTML,
        simpleSheet: true
    })
}

function DisplaySheetDataInHTML(data, tabletop) {
    // Append the 'data' from Google Sheets into HTML

    data.forEach(rowData => {
        let mValues = Object.values(rowData);

        // Create the Mansory container for each entry
        let mRandomWidth = parseInt((Math.random() * 100) % 4, 10);
        let mRandomHeight = parseInt((Math.random() * 100) % 4, 10);

        if (mRandomWidth !== 0) {
            mGridWidth = ` grid-item--width${mRandomWidth}`;
        } else {
            mGridWidth = "";
        }

        if (mRandomHeight !== 0) {
            mGridHeight = ` grid-item--height${mRandomHeight}`;
        } else {
            mGridHeight = "";
        }

        // Concatenate Google Sheets 'name', underscore symbols, and Google Sheets 'message'
        let mStr = "";
        mValues.forEach(element => {
            if (mStr === "") {
                // Google Sheets 'name' and underscore symbols
                mStr = mStr + `<p>${element}</p><p>____</p>`;
            } else {
                // Google Sheets 'message'
                mStr = mStr + `<p>${element}</p>`;
            }

        });

        // Append the entry (consisting of container and text) to HTML
        $(".sheet-data-container .grid").append(`<div class="grid-item${mGridWidth}${mGridHeight}">${mStr}</div>`);
    });

    // Mansory Animation Initialization for the entries' containers
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 200
    });
}

// Call 'Tabletop.init()' to read data from Google Sheets on page load
window.addEventListener('DOMContentLoaded', init);