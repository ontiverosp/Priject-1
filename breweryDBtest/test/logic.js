function beerInfo() {
    //Get the info I need from local storage
    var info = JSON.parse(localStorage.getItem('infoB'));
    var name = info.name;
    var description = info.description;
    if (typeof description == 'undefined') {
        description = 'No description available'
    }
    var abv = info.abv;
    if (typeof abv == 'undefined') {
        abv = 'No ABV available'
    }
    var ibu = info.ibu;
    if (typeof ibu == 'undefined') {
        ibu = 'No IBU available'
    }
    var imgLink;
    var labels = info.labels;
    if (typeof labels !== 'undefined') {
        imgLink = labels.medium
    }
    else {
        imgLink = 'http://clipart-library.com/images/kcKByEL6i.png';
    }

    //create HTML elements
    var infoEl = $("<div>");
    infoEl.attr("class", "infoBox");
    var nameEl = $("<h2>");
    nameEl.attr("class", "name");
    var descriptionEl = $("<p>");
    descriptionEl.attr("class", "info");
    descriptionEl.attr("id", "description");
    var abvEl = $("<p>");
    abvEl.attr("class", "info");
    abvEl.attr("class", "abv");
    var ibuEl = $("<p>");
    ibuEl.attr("class", "info");
    ibuEl.attr("class", "ibu");
    var imgEl = $("<img>");
    imgEl.attr("class", "img");
    //add content to elements
    nameEl.text(name);
    descriptionEl.text(description);
    abvEl.text('ABV: ' + abv);
    ibuEl.text('IBU: ' + ibu);
    imgEl.attr("src", imgLink);
    //append elements into info box
    infoEl.append(nameEl);
    infoEl.append(abvEl);
    infoEl.append(ibuEl);
    infoEl.append(imgEl);
    infoEl.append(descriptionEl);
    //apend info box to body 
    $('body').append(infoEl);
}
beerInfo();