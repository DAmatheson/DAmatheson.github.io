/* dmAssign5.js
   Purpose: Library file for validation and other methods

   Revision History:
        Drew Matheson, 2014.1.29: Created
        Drew Matheson, 2014.1.30: Added validateAddress
        Drew Matheson, 2014.1.31: Fixed validatePostalCode, added trimAllFormTextInputs
        Drew Matheson, 2014.3.19: Renamed getElementsByType to getElementsByTypeValue
        Drew Matheson, 2014.3.19: Added validateCity, updated initializeFormEvents
        Drew Matheson, 2014.3.19: Updated validations to work with hinting
        Drew Matheson, 2014.4.3: Removed parameters and Title Casing from initializeFormEvents
        Drew Matheson, 2014.4.3: Added validateZipCode validateCost validateListPrice validateDescription
        Drew Matheson, 2014.4.3: Added indentifierString argument to validatePhoneNumber
        Drew Matheson, 2014.4.6: Adjusted validateName to match assignment 5's requirements
        Drew Matheson, 2014.4.6: Extracted hintOnFocus, hintOnBlur, removeInvalidOnFocus from initializeFormEvents
        Drew Matheson, 2014.4.6: Added addHintClassToTextboxes
        Drew Matheson, 2014.4.6: Updated initializeFormEvents to be much simpler via jQuery
*/

function getElementsByTypeValue(type, searchArray)
{
    // Requires a type string and an element array. Returns all elements with a matching type value

    var outputArray = []; // Holds all of the matching elements

    for (var i = 0; i < searchArray.length; i++)
    {
        if (searchArray[i].type == type) // If the type value matching the type parameter
        {
            outputArray.push(searchArray[i]); // Add the matching element to the array
        }
    }

    return outputArray; // Return the array of matching elements
}

function findDefaultSelectValue(id)
{
    // Requires an id string as an argument. Returns the element's default value or null if not found

    var defaultValue = null; // Holds the default value or null

    var options = document.getElementById(id).children; // Holds all of the select elements options

    for (var i = 0; i < options.length; i++)
    {
        if (options[i].defaultSelected) // If the options defaultSelected value exists
        {
            defaultValue = options[i].value; // Set defaultValue to its value
            break; // Break out because only one defaultSelected exists
        }
    }

    return defaultValue; // Return the default value
}

function toTitleCase(text)
{
    // Requires a string as an argument and returns a title-cased version of the string
    // Capitalizes the first letter of each word in the string

    var titleCaseText = ""; // Variable to rejoin all of the title-cased words

    if (text !== "")
    {
        var splitText = text.split(' '); // Split the text at spaces

        for (var i = 0; i < splitText.length; i++)
        {
            var firstLetter = splitText[i][0].toUpperCase(); // Upper-cased version of the first letter
            var restOfWord = splitText[i].substr(1).toLowerCase(); // Lower-cased rest of the word

            splitText[i] = firstLetter + restOfWord; // Replace the original word with a title-cased copy
        }

        for (var x = 0; x < splitText.length; x++)
        {
            titleCaseText += splitText[x] + " "; // Add the split word and a space
        }
    }

    return titleCaseText.trim(); // Trim the title-cased copy of the text and return it
}

function hintOnFocus()
{
    // Removes the hint and invalid classes from an element on focus and 
    //  clears its value if it is the default value for the element

    $(this).removeClass("hint invalid");

    if (this.value == this.defaultValue)
    {
        this.value = "";
    }
}

function hintOnBlur()
{
    // Assigns the default value and hint class if the input is empty, otherwise assigns a cleaned up value

    if (this.value == "")
    {
        this.value = this.defaultValue;
        $(this).addClass("hint");
    }
    else if ($(this).hasClass("quantity") && !isNaN(this.value))
    {
        // Floor (implicitly via parseInt) the number and reassign it
        this.value = parseInt(this.value.trim());
    }
    else if ($(this).hasClass("money") && !isNaN(this.value))
    {
        // Round to number to two decimal places and reassign it
        this.value = parseFloat(this.value.trim()).toFixed(2);
    }
    else
    {
        this.value = this.value.trim();
    }
}

function removeInvalidOnFocus()
{
    // Removes the invalid class from an element on focus

    $(this).removeClass("invalid");
}

function addHintClassToTextboxes()
{
    // Adds the hint class to all input elements of type text that have a value equal to their default

    $("input[type='text']").each(function()
    {
        if (this.value == this.defaultValue)
        {
            $(this).addClass('hint');
        }
    });
}

function initializeFormEvents()
{
    // Trims and cleans up all text fields onblur and provides input hinting

    // Call addHintClassToTextboxes 50ms after a reset button has been clicked
    $("input[type='reset']").on("click", function()
    {
        setTimeout(addHintClassToTextboxes, 50);
    });

    addHintClassToTextboxes();

    var form = $("form"); // Assign a jQuery object of all <form> elements

    // Set up events for the form
    // Attach delegated hintOnFocus to forms, bubble up to it when text inputs are focused
    form.on("focusin", "input[type='text']", hintOnFocus);
    // Attach delegated hintOnBlue to forms, bubble up to it when text inputs are blurred
    form.on("focusout", "input[type='text']", hintOnBlur);
    // Attach delegated removeInvalidOnFocus to forms, bubble up to it when <select> elements are focused
    form.on("focusin", "select", removeInvalidOnFocus);
}

function trimAllFormTextInputs(formId)
{
    // Requires a form id string as an argument. Trims all text fields found in that id's form

    // Get all text inputs
    var elements = getElementsByTypeValue("text", document.forms[formId].getElementsByTagName("input"));

    for (var i = 0; i < elements.length; i++)
    {
        elements[i].value = elements[i].value.trim(); // Trim the value and reassign it
    }
}

function validatePostalCode(id)
{
    // Requires an id string as an argument and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the input is a valid Canadian postal code

    var text = document.getElementById(id).value.trim().toUpperCase(); // Trimmed copy of the id's value

    // First 3 characters followed by a space followed by the rest
    text = text.substr(0, 3).trim() + " " + text.substr(3).trim();

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    // Beginning of string; first character: A-Z except DFIOQUWZ, one repetition
    // Second character: Digit, one repetition
    // Third character: A-Z except DFIOQU, one repetition
    // Next characters: Space, one or more repetitions
    // Fifth character: Digit, one repetition
    // Sixth chracter: A-Z except DFIOQU, one repetition
    // Last character: Digit, one repetition
    // End of string
    var rePostalCode = /^(?!.*[DFIOQU])[A-VXY]\d[A-Z]\ *\d[A-Z]\d$/;

    if (text.length <= 0 || text == $("#" + id).prop("defaultValue"))
    {
        // Set the error message for an empty or default input
        errorMessage = "\nPlease enter a Postal Code using the format 'A1A 1A1'";
    }
    else if (!rePostalCode.test(text))
    {
        // Set the error message for an invalid postal code
        errorMessage = "\nYou didn't enter a valid postal code. Please use the format 'A1A 1A1'";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }
    else
    {
        $("#" + id).val(text);
    }

    return errorMessage; // Return the error message
}

function validateZipCode(id)
{
    // Requires an id string as an argument and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the input is a valid ZIP code

    var text = document.getElementById(id).value.trim();

    var errorMessage = ""; // Stores the errorMessage or an empty string if it is valid

    // Beggining of string; First to Fifth characters: 0-9, 5 repetitions
    // Six character: Space or hyphen, zero or one repetition
    // Seven to Eleventh characters: 0-9, zero or 4 repetitions
    // End of string
    var reZipCode = /^\d{5}[-\ ]?\d{4}?$/;

    if (text.length <= 0 || text == $("#" + id).prop("defaultValue"))
    {
        // Set the error message for an empty or default input
        errorMessage = "\nPlease enter a ZIP Code using the format '11111-0000' with the last 5 " +
            "characters being optional.";
    }
    else if (!reZipCode.test(text))
    {
        // Set the error message for an invalid zip code
        errorMessage = "\nYou didn't enter a valid ZIP code. Please use the format '11111-0000'";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }

    return errorMessage;
}

function validateAddress(id)
{
    // Requires an id string as an argument and returns an error message string
    // If the returned string is empty, input is valid
    // Loosely Validates that the input is an address

    var text = document.getElementById(id).value.trim(); // Trimmed copy of the id's value

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    // Beginning of string; first characters: Digit, between one and five repetitions
    // Next characters: Space, one or more repetitions
    // Next characters: a-z or A-Z, one or more repetitions
    // Next characters: Spaces or letters, any number of repetitions
    // End of string
    var reAddress = /^\d{1,5}\ +[a-zA-Z]+[a-zA-Z\ ]*$/;

    if (text.length <= 0 || text == $("#" + id).prop("defaultValue"))
    {
        // Set the error message for an empty or default input
        errorMessage = "\nPlease enter your street number followed by street name.";
    }
    else if (!reAddress.test(text))
    {
        // Set the error message for an invalid input
        errorMessage = "\nYou didn't enter a valid address. Please enter the street number followed " +
            "by street name.";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }

    return errorMessage; // Return the error message
}

function validateCity(id)
{
    // Requires an id string as an argument and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the city is at least 3 characters long

    var element = $("#" + id);

    var text = element.val().trim(); // Trimmed copy of the id's value

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    if (text.length < 3 || text == element.prop("defaultValue"))
    {
        // Set the error message for invalid input
        errorMessage = "\nPlease enter a City that is at least 3 characters long.";

        element.addClass("invalid");
    }

    return errorMessage; // Return the error message
}

function validatePhoneNumber(id, identifierString)
{
    // Requires two strings as arguments and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the input is a phone number

    var text = document.getElementById(id).value.trim(); // Trimmed copy of the id's value

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    // Beginning of string; first character: Literal '(', zero or one repetitions
    // Next three characters: Any digit, exactly 3 repetitions
    // Fifth character: Literal ')', zero or one repetitions
    // Next characters: Space, any number of repetitions
    // Seventh character: Any digit, exactly 3 repetitions
    // Eighth character: Select from 2 alternatives: '-' or space, any number of repetitions
    // Final 4 characters: Any digit, exactly 4 repetitions
    // End of string
    var rePhoneNumber = /^\(?(\d{3})\)?\ *(\d{3}[-|\ *]\d{4})$/;

    if (text.length <= 0 || text == $("#" + id).prop("defaultValue"))
    {
        // Set the error message for an empty or default input
        errorMessage = "\nYou didn't enter a " + toTitleCase(identifierString) + " number. Please enter " +
            "a " + toTitleCase(identifierString) + " number using the format '(111) 111-1111'";
    }
    else if (!rePhoneNumber.test(text))
    {
        // Set the error message for an invalid input
        errorMessage = "\nYou didn't enter a valid " + toTitleCase(identifierString) + " number. Please " +
            "use the format '(111) 111-1111'";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }

    return errorMessage; // Return the error message
}

function validateSelect(id)
{
    // Requires an id string as an argument and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the selected value isn't equal to the default value

    var errorMessage = ""; // Stores the error message or an empty string if selection is valid

    if (document.getElementById(id).value == findDefaultSelectValue(id))
    {
        // Set the error message for selected value being the default value
        errorMessage = "\nYou didn't select a " + toTitleCase(document.getElementById(id).name) + ".";

        $("#" + id).addClass("invalid");
    }

    return errorMessage; // Return the error message
}

function validateName(id, identifierString)
{
    // Requires two strings as arguments and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the name is five+ characters, only letters, 4 or fewer spaces, and 5 or fewer hyphens

    // Assign a trimmed and lowercased copy of text
    var text = document.getElementById(id).value.trim().toLowerCase();
    var errorMessage = ""; // A string to hold the error message

    var letterCount = 0; // A counter for the number of letters in the name
    var hyphenCount = 0; // A counter for the number of hyphens in the name
    var spaceCount = 0; // A counter for the number of spaces in the name

    if (text.length >= 5 && toTitleCase(text) != $("#" + id).prop("defaultValue"))
    {
        for (var i = 0; i < text.length; i++)
        {
            // charCodeAt returns the ascii value of the character. 97 = a, 122 = z
            if (text[i].charCodeAt() >= 97 && text[i].charCodeAt() <= 122)
            {
                letterCount++; // Increment the letter count
            }
            else if (letterCount === 0 && text[i] == '-')
            {
                errorMessage = "\nPlease enter at least one letter before a hyphen in the " +
                    toTitleCase(identifierString) + " Name field.";

                break; // Break out of the loop as the input is invalid
            }
            else if (text[i] == '-' && hyphenCount < 5)
            {
                hyphenCount++; // Increment the hyphen count
            }
            else if (text[i] == ' ' && spaceCount < 4)
            {
                spaceCount++; // Increment the space count
            }
            else
            {
                errorMessage = "\nPlease enter a " + toTitleCase(identifierString) + " Name containing " +
                    "only letters, four or fewer spaces, and five or fewer hypens.";

                break; // Break out of the loop as the input is invalid
            }
        }
    }
    else
    {
        errorMessage = "\nPlease enter a 5 character or longer " + toTitleCase(identifierString) +
            " Name containing only letters, four or fewer spaces, and five or fewer hyphens.";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }

    return errorMessage; // Return the error message, or an empty string if there isn't one
}

function validateItemQuantity(id, identifierString)
{
    // Requires two strings as arguments and returns an error message string
    // If the returned string is empty, input is valid
    // Validates that the input is a number

    var element = $("#" + id);

    var text = element.val().trim(); // Trimmed copy of the id's value

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    if (text.length <= 0 || isNaN(text))
    {
        errorMessage = "\nPlease enter quantity of " + identifierString + " as a positive " +
            "number.";

        element.addClass("invalid");
    }
    else
    {
        element.val(Math.floor(text));
    }

    return errorMessage; // Return the error message, or an empty string if the data is valid
}

function validateCost(id)
{
    // Requires and id string as an argument and returns an error string
    // If the returned string is empty, input is valid
    // Validates that the cost is greater than zero

    var element = $("#" + id);

    // Trim input, parse it to float, and round it to two decimal places
    var cost = parseFloat(element.val().trim()).toFixed(2);

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    if (isNaN(cost) || cost <= 0)
    {
        errorMessage = "\nPlease enter a cost greater than zero.";

        element.addClass("invalid");
    }
    else
    {
        element.val(cost); // Assign the trimmed and rounded value to the input
    }

    return errorMessage;
}

function validateListPrice(costId, listPriceId)
{
    // Requires two id strings as arguments and returns an error string
    // If the returned string is empty, input is valid
    // Validates that the list price is greater than the cost

    var listPriceElement = $("#" + listPriceId);

    // Trim inputs, parse them to float, and round them to two decimal places
    var cost = parseFloat($("#" + costId).val().trim()).toFixed(2);
    var listPrice = parseFloat(listPriceElement.val().trim()).toFixed(2);

    var errorMessage = ""; // Stores the error message or an empty string if it is valid

    if (isNaN(cost) || isNaN(listPrice) || listPrice <= cost)
    {
        errorMessage = "\nPlease enter a list price greater than the cost.";

        listPriceElement.addClass("invalid");
    }
    else
    {
        listPriceElement.val(listPrice); // Assign the trimmed and rounded value to the input
    }

    return errorMessage;
}

function validateDescription(id)
{
    // Requires an id string as an argument and returns an error string
    // If the returned string is empty, input is valid
    // Validates that the description is 5 characters long

    var text = $("#" + id).val().trim();

    var errorMessage = "";

    if (text.length < 5 || toTitleCase(text) == $("#" + id).prop("defaultValue"))
    {
        errorMessage = "\nPlease enter a description that is at least 5 characters long.";
    }
    else if (text.length > 30)
    {
        errorMessage = "\nPlease enter a description that is 30 characters or less long.";
    }

    if (errorMessage !== "")
    {
        $("#" + id).addClass("invalid");
    }

    return errorMessage;
}