﻿/* dmMobile.js
    Purpose: Library file for mobile related functions

    Revision History:
        Drew Matheson, 2014.4.19: Created
*/

/// <reference path="../jQuery/jquery-1.11.0.js"/>

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
    
    // Adjust the spacing for the header to match the header's current size
    $(".ui-content").css("margin-top", "-" + $(".ui-header").outerHeight() + "px");
    $("div#main").css("padding-top", $(".ui-header").outerHeight());
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
            $select.parent().css("maxWidth", $select.css("maxWidth")).css("maxWidth", "-=52");

            // Select elements are enclosed in two divs so we must updated the second parent also
            $select.parent().parent().css("maxWidth", $select.css("maxWidth")).css("maxWidth", "-=52").addClass('ui-mini');

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
    
    // Event that requires resizing the content panel
    //$(document).on("pagecontainershow", pageId, sizeContentHeightToScreen);

    setupSpacing(bottomMarginSelector); // Setup page to JS layout
    setTimeout(sizeContentHeightToScreen, 5); // Delay fixes issue with page being longer than needed
}