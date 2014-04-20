/* dmPHPEmporium_Load.js
    Purpose: Setup pages loaded via AJAX

    Revision History:
        Drew Matheson, 2014.4.19: Created
*/

$(document).on('pagecontainertransition', function ()
{
    var id = $("div.page").pagecontainer("getActivePage");


    alert(id);
    if (id == "vendor_get")
    {
        alert("hi");
        initializeFormEvents();

        /// -- Events --
        // Make the reset button setup the province picker 50ms after click
        $("input[type='reset']").on("click", function ()
        {
            setTimeout(setupProvincePicker, 50);
        });

        $(document).on("pagecontainershow", sizeContentHeightToScreen);
        $(window).on("resize, orientationchange", sizeContentHeightToScreen);

        $("#cboCountry").change(setupProvincePicker); // Setup the change event

        // Add hint text to inputs via jQuery so that those without JS don't have to delete it
        $("#txtName").prop("defaultValue", "Vendor Name");
        $("#txtAddress").prop("defaultValue", "Address");
        $("#txtCity").prop("defaultValue", "City");
        $("#txtPostalCode").prop("defaultValue", "Postal/Zip");
        $("#txtPhone").prop("defaultValue", "Phone Number");
        $("#txtFax").prop("defaultValue", "Fax Number");

        $("label").addClass("ui-hidden-accessible"); // Hide labels but leave them for screenreader

        setupProvincePicker(); // Setup cboProvince in case of page refresh with a country selected
        setupSpacing("#txtName, #txtPostalCode, #cboProvince, #txtFax"); // Setup page to JS layout
        setupFormSize(); // Size form elements to my liking
        sizeContentHeightToScreen(); // Size content to the screen size
    }

    else if (id == "query_get")
    {
        initializeFormEvents();

        // Add hint text to input via jQuery so that those without JS don't have to delete it
        $("#txtMaxQuantity").prop("defaultValue", "Enter Threshold");
        $("label").addClass("ui-hidden-accessible"); // Hide labels but leave them for screenreader

        setupSpacing("#txtMaxQuantity"); // Setup page to JS layout
        setupFormSize(); // Size form elements to my liking
        sizeContentHeightToScreen(); // Size content to the screen size
    }



    else if (id == "index")
    {
        setupSpacing(); // Setup page to JS layout
        sizeContentHeightToScreen(); // Size content to the screen size
    }
});
