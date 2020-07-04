// var testObject = {
//     "idDrink": "11007",
//     "strDrink": "Margarita",
//     "strDrinkAlternate": null,
//     "strDrinkES": null,
//     "strDrinkDE": null,
//     "strDrinkFR": null,
//     "strDrinkZH-HANS": null,
//     "strDrinkZH-HANT": null,
//     "strTags": "IBA,ContemporaryClassic",
//     "strVideo": null,
//     "strCategory": "Ordinary Drink",
//     "strIBA": "Contemporary Classics",
//     "strAlcoholic": "Alcoholic",
//     "strGlass": "Cocktail glass",
//     "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
//     "strInstructionsES": null,
//     "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
//     "strInstructionsFR": null,
//     "strInstructionsZH-HANS": null,
//     "strInstructionsZH-HANT": null,
//     "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
//     "strIngredient1": "Tequila",
//     "strIngredient2": "Triple sec",
//     "strIngredient3": "Lime juice",
//     "strIngredient4": "Salt",
//     "strIngredient5": null,
//     "strIngredient6": null,
//     "strIngredient7": null,
//     "strIngredient8": null,
//     "strIngredient9": null,
//     "strIngredient10": null,
//     "strIngredient11": null,
//     "strIngredient12": null,
//     "strIngredient13": null,
//     "strIngredient14": null,
//     "strIngredient15": null,
//     "strMeasure1": "1 1/2 oz ",
//     "strMeasure2": "1/2 oz ",
//     "strMeasure3": "1 oz ",
//     "strMeasure4": null,
//     "strMeasure5": null,
//     "strMeasure6": null,
//     "strMeasure7": null,
//     "strMeasure8": null,
//     "strMeasure9": null,
//     "strMeasure10": null,
//     "strMeasure11": null,
//     "strMeasure12": null,
//     "strMeasure13": null,
//     "strMeasure14": null,
//     "strMeasure15": null,
//     "strCreativeCommonsConfirmed": "Yes",
//     "dateModified": "2015-08-18 14:42:59"
// }
// localStorage.setItem("info", JSON.stringify(testObject));

//makes sure only one type of search term is passed on
function clearTerms() {
    localStorage.removeItem("term");
    return;
}

//sends you back to the home page and runs new search
// $("#searchIngredient").on("click", function () {
//     var term = $("#termIngredient").val();
//     console.log(term);
//     window.location.href = "../index.html";
//     clearTerms();
//     localStorage.setItem("term", term);
//     localStorage.setItem("searchFlag", true);
// });

$("searchAlcohol").keypress(function(event)
{
    console.log("enter pressed");
    if (event.originalEvent.which === 13) {
    var term = $("#termAlcohol").val();
    localStorage.setItem("term", term);
    localStorage.setItem("searchFlag", true);
    console.log(term);
    window.location.href = "../index.html";
    clearTerms();
    }
});
// $("#searchSomething").on("click", function () {
//     var term = $("#termSomething").val();
//     console.log(term);
//     window.location.href = "../index.html";
//     clearTerms();
//     localStorage.setItem("term", term);
//     localStorage.setItem("searchFlag", true);
// });

//displays the info.
function detailedInfo() {
    //Get the info I need from local storage
    var info = JSON.parse(localStorage.getItem('info'));
    var name = info.strDrink;
    var instructions = info.strInstructions;
    var alcoholic = info.strAlcoholic;
    var glass = info.strGlass;
    var img = info.strDrinkThumb;
    var classification = info.strIBA;
    var category = info.strCategory;
    var ingredients = [];
    var measurements = [];
    for (i = 1; i < 16; i++) {
        var ingredient = eval('info.strIngredient' + i);
        if (ingredient != null) {
            ingredients.push(ingredient);
        }
    }
    for (i = 1; i < 16; i++) {
        var measurement = eval('info.strMeasure' + i);
        if (measurement != null) {
            measurements.push(measurement);
        }
    }
    //create the html elements
    var infoEL = $("<div>");
    infoEL.attr("class", "infoBox");

    var formatbox = $("<div>");
    formatbox.attr("class", "formatbox");

    var nameEL = $("<h2>");
    nameEL.attr("class", "name");
    var instructionsEL = $("<p>");
    instructionsEL.attr("class", "instructions");
    var glassEL = $("<p>");
    glassEL.attr("class", "glass");
    var imgEL = $("<img>");
    var instructionsTitle = $("<h3>");
    instructionsTitle.attr("class", "instsubtitle");
    var ingredientsTitle = $("<h6>");
    ingredientsTitle.attr("class", "subtitle");
    var measurementsTitle = $("<h6>");
    measurementsTitle.attr("class", "subtitle");
    var glassTitle = $("<h6>");
    glassTitle.attr("class", "subtitle");

    //add content to element
    nameEL.text(name);
    instructionsEL.text(instructions);
    glassEL.text(glass);
    imgEL.attr("src", img);
    imgEL.attr("class", "drinkImage");
    instructionsTitle.text("Instructions");
    ingredientsTitle.text("Ingredients");
    measurementsTitle.text("Measurements");
    glassTitle.text("Glass to use");


    //append to infoBox
    infoEL.append(nameEL);
    infoEL.append(imgEL);
    formatbox.append(glassTitle);
    formatbox.append(glassEL);
    formatbox.append(ingredientsTitle);


    //for ingredients and measurments its running in a for loop in the append section
    for (i = 0; i < ingredients.length; i++) {
        var ingredientsEL = $("<p>");
        ingredientsEL.attr("class", "ingredients");
        ingredientsEL.text(ingredients[i]);
        formatbox.append(ingredientsEL);
    }
    formatbox.append(measurementsTitle);

    for (i = 0; i < measurements.length; i++) {
        var measurementsEL = $("<p>");
        measurementsEL.attr("class", "measurements");
        measurementsEL.text(measurements[i]);
        formatbox.append(measurementsEL);
    }

    $("body").append(infoEL);
    $("body").append(formatbox);
    formatbox.append(instructionsTitle);
    formatbox.append(instructionsEL);
}

function beerInfo() {
    //Get the info needed from local storage
    var info = JSON.parse(localStorage.getItem('infoB'));
    var name = info.name;
    //not all beers have all the info available so making sure we have a back up comment.
    var description = info.description;
    if (typeof description == 'undefined') {
        description = 'No description available';
    }
    var abv = info.abv;
    if (typeof abv == 'undefined') {
        abv = 'No ABV available';
    }
    var ibu = info.ibu;
    if (typeof ibu == 'undefined') {
        ibu = 'No IBU available';
    }
    var imgLink;
    var labels = info.labels;
    if (typeof labels !== 'undefined') {
        imgLink = labels.large;
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
    //append info box to body 
    $('body').append(infoEl);
}



function infoType() {
    var check = JSON.parse(localStorage.getItem('info'));
    if (check) {
        detailedInfo();
    }
    else {
        check = JSON.parse(localStorage.getItem('infoB'));
        if (check) {
            beerInfo()
        }
        else {
            console.log('ERROR! Didnt find any info')
        }
    }

}

infoType();