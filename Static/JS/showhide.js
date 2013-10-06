function divToHide(linkId, divToHideOrShow)
{
    var link = document.getElementById(linkId);
    var div = document.getElementById(divToHideOrShow);

    if (div.style.display == "block")
    {
        div.style.display = "none";
        link.innerHTML = 'Show';
    }
    else
    {
        div.style.display = "block";
        link.innerHTML = 'Hide';
    }
}

/* Makes all tables equal to the widest table */
$(document).ready(function() {
    var largest = 0;
    $('table').each(function() {
        var width = $(this)[0].offsetWidth;
        if(width > largest) {
            largest = width;
        }
    }).width(largest);
});