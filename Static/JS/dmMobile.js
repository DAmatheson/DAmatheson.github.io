/* dmMobile.js
    Purpose: Library file for mobile related functions

    Revision History:
        Drew Matheson, 2014.4.19: Created
*/

/// <reference path="../jQuery/jquery-1.11.0.js"/>

function inactive(eventArgs)
{
    alert('This page requires a server running PHP so it is not active.');
    
    eventArgs = eventArgs || window.event;
    
    eventArgs.preventDefault ? eventArgs.preventDefault() : eventArgs.returnValue =  false;
}

function setupSpacing(bottomMarginSelector)
{
    // Setup spacing for JS layout

    $("label").css("margin-left", 0); // Remove margin used for no-JS spacing

    $("form br").remove(); // Remove br used for no-JS spacing

    if (typeof bottomMarginSelector == 'string' || bottomMarginSelector instanceof String)
    {
        // Replace br spacing with bottom margin
        $(bottomMarginSelector).parent().css("margin-bottom", 16);
    }
}

function sizeContentHeightToScreen()
{
    // Makes the screen completely filled even if content is small

    var screen = window.innerHeight || $(window).height(); // Screen size
    var contentHeight = $(".ui-content").height(); // Content size

    // Adjust the spacing for the header to match the header's current size
    $(".ui-content").css("margin-top", "-" + $(".ui-header").outerHeight() + "px");
    $("div#main").css("padding-top", $(".ui-header").outerHeight());

    // If the content height is less than the screen size, make it fill the screen
    if (contentHeight < screen)
    {
        var header = $(".ui-header").hasClass("ui-header-fixed") ?
                         $(".ui-header").outerHeight() - 1 :
                         $(".ui-header").outerHeight();

        var footer = $(".ui-footer").hasClass("ui-footer-fixed") ?
                         $(".ui-footer").outerHeight() - 1 :
                         $(".ui-footer").outerHeight();

        var contentCurrent = $(".ui-content").outerHeight() - contentHeight;

        var content = screen - header - footer - contentCurrent;

        $(".ui-content").height(content);
    }
}

function setupFormSize()
{
    // Size various things to my prefered style
    // maxWidth allows the form to size down but not up

    // For each form, set up its width based on its child elements
    $("form").each(function()
    {
        var largestWidth = 0;

        // Make the jQuery mobile container divs' widths match child input element
        $(this).find("input").each(function()
        {
            var $input = $(this);
            var type = $input.prop("type");

            // Center buttons
            if (type == "submit" || type == "reset" || type == "button")
            {
                $input.parent().css(
                {
                    "margin-left": "auto",
                    "margin-right": "auto"
                });
            }

            // Make parent element's max width match child
            $input.parent().css("maxWidth", $input.css("maxWidth")).addClass("ui-mini");

            if (parseInt($input.css("maxWidth")) > largestWidth)
            {
                largestWidth = parseInt($input.css("maxWidth"));
            }
        });

        // Make parent elements' max width match child select element
        $(this).find("select").each(function()
        {
            var $select = $(this);

            // 52px seems to be the width of the selection part of the element
<<<<<<< HEAD
            $select.parent().css("maxWidth", $select.css("maxWidth")).css("maxWidth", "-=52");

            // Select elements are enclosed in two divs so we must updated the second parent also
            $select.parent().parent().css("maxWidth", $select.css("maxWidth")).css("maxWidth", "-=52").addClass('ui-mini');
=======
            $select.parent().css("maxWidth", $select.css("maxWidth") - 52);

            alert($select.css("maxWidth") - 52);

            // Select elements are enclosed in two divs so we must updated the second parent also
            $select.parent().parent().css("maxWidth", $select.css("maxWidth") - 52).addClass('ui-mini');
>>>>>>> 2eb907f28fbfbb82ab04500f1481fdc051d6c451

            if (parseFloat($select.css("maxWidth")) > largestWidth)
            {
                largestWidth = parseFloat($select.css("maxWidth"));
            }
        });

        // Allow the form to be as wide as the widest element
        $(this).css("maxWidth", largestWidth);
    });
}

function generic_Load(bottomMarginSelector)
{
    // Takes an option argument selector string. The matching elements get bottom margin added to them
    // Sets up form events and layout on load

    //$.mobile.ajaxEnabled = false; // Disable ajax loading

    // Events that require resizing the content panel
    $(document).on("pagecontainershow", sizeContentHeightToScreen);
    $(window).on("resize orientationchange", sizeContentHeightToScreen);

    setupSpacing(bottomMarginSelector); // Setup page to JS layout
    sizeContentHeightToScreen(); // Size content to the screen size
}

//function pageChange_Load(event, ui)
//{

// Problem with AJAX is that one page loads with a 100px width so I can't size my form based off of it
// and maxWidth can't be used because it can be different unit types
    //$(document).on("pagechange", pageChange_Load);

//    var url = ui.toPage[0].baseURI;
//    url = url.slice(url.lastIndexOf("/") + 1);

//    alert(url);

//    if (url === "index.html")
//    {
//        index_Load();
//    }
//    else if (url === "vendor_get.html")
//    {
//        vendor_get_Load();
//    }
//    else if (url === "query_get.html")
//    {
//        query_get_Load();
//    }
//}