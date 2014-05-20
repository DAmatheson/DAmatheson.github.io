function randomName(namesId, outputId)
{
    var reNameSplit = /[,?\s*]+/; // 0-1 commas, any # spaces, one or more repetitions
    var reStartTrim = /^[,?\s*]+/; // At the start, 0-1 commas, any # spaces, one or more repetitions
    var reEndTrim = /[,?\s*]+$/; // At the end, 0-1 commas, any # spaces, one or more repetitions
    
    var names = document.getElementById(namesId).value;
    var trimmedNames = names.replace(reStartTrim, '').replace(reEndTrim, '');
    
    var splitNames = trimmedNames.split(reNameSplit);
    
    var randomNumber = getRandomInt(0, splitNames.length - 1);
    
    var pickedName = splitNames[randomNumber];
    
    document.getElementById(outputId).innerHTML = pickedName;
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;   
}