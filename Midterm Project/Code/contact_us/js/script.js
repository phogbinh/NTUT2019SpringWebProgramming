$(document).ready(function() {
    /*-----------------------------FORM-----------------------------*/
    /*
        ~ Remark:
        ~ Try to make sure that the attribute 'name' of each input is similar to each column name of the spread sheet
    */
    var $form = $('form#mForm'),
        url = 'https://script.google.com/macros/s/AKfycbzhG7xvSnW3KyPUgJ2MdZ7-qaKhOU2E7-4_oEgdAdoyDS09sXBI/exec'

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
            // $(this).find(".box-background").fadeIn(mDuration);
            $(this).find(".box-background").fadeIn(mDuration);
        })
        .mouseleave(function() {
            $(this).find(".box-background").fadeOut(mDuration);
        });

});


/*
    ~ READ DATA FROM GOOGLE SHEET
    ~ Warning: Must be outside '$(document).ready(function() {...};'
*/
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1L14C4cmVqUEwXlqdbC1LiH4kDwlz98kjXYu8OsBpFhc/edit?usp=sharing';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: DisplaySheetDataInHTML,
        simpleSheet: true
    })
}

function DisplaySheetDataInHTML(data, tabletop) {
    // Append the data from the Google Sheet into HTML

    data.forEach(rowData => {
        let mValues = Object.values(rowData);
        // Create the container for each entry
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

        let mStr = "";
        // Concatenate 'name', some underscore symbols, and 'message'
        mValues.forEach(element => {
            if (mStr === "") {
                mStr = mStr + `<p>${element}</p><p>____</p>`;
            } else {
                mStr = mStr + `<p>${element}</p>`;
            }

        });
        // Append entry to HTML
        $(".sheet-data-container .grid").append(`<div class="grid-item${mGridWidth}${mGridHeight}">${mStr}</div>`);
    });

    // Mansory animation initialization for the entries' containers
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });
}

window.addEventListener('DOMContentLoaded', init)