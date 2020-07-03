$(document).ready(function () {
    var searchInput;
    var searchUrl;
    var inputEl = $("input");
    var tnUrl;
    var resEl = $(".resluts");
    console.log(resEL)
    var thumb;
    var drinkNm;
    inputEl.keypress(function (event) {
        if (event.originalEvent.keyCode === 13) {
            // console.log(this)
            searchInput = $(this).val();
            // console.log(searchInput)
            searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchInput;
            // console.log(searchUrl)
            search()
        }
    });
    function search() {
        $.ajax({
            url: searchUrl,
            method: "GET"
        }).then(function (response) {
            var cocktails = response.drinks;
            // console.log(cocktails);
            resEl.empty();
            if (cocktails == null) {
            }
            for (i = 0; i < cocktails.length; i++) {
                var cocktail = cocktails[i];
                drinkNm = cocktail.strDrink;
                tnUrl = cocktail.strDrinkThumb;
                genRes(cocktail.idDrink)
            }
                toResult(cocktails);
        })
    }
    function genRes(id) {
        // var ingredient = [];
        var crdNmEl = $("<p>");
        var crdImgEl = $("<img>");
        crdNmEl.attr("class", "drinkName toResult")
        crdNmEl.attr("id", id)
        crdImgEl.attr("class", "cardImg toResult")
        crdImgEl.attr("data_id", id)
        crdNmEl.text(drinkNm);
        crdImgEl.attr("src", tnUrl);
        resEl.append(crdNmEl).append(crdImgEl);
    }


    function toResult(info) {


        $('.toResult').on('click', function (event) {
            event.preventDefault();
            var id = event.target.getAttribute('data_id');
            info.forEach((element) => {
                if (id == element.idDrink) {
                    clearInfo()
                    localStorage.setItem("info", JSON.stringify(element));
                    window.location.href = "../detail/detail.html";
                }
            })

        });



    }
     
    //the content boxes stuff gets appended into
var optionsEL = $("<div>");
optionsEL.attr("class", "filterBox");
var optionsSecondaryEL = $("<div>");
optionsSecondaryEL.attr("class", "filterBox");
var contentEL = $("<div>");
contentEL.attr("class", "contentBox");

//keeps local storage clean
function clearInfo() {
    localStorage.removeItem("info");
    localStorage.removeItem("infoB");
}

//makes the most general search filter
function searchCreate() {

    //create the options box components
    var aleEL = $("<button>");
    aleEL.attr("id", "ale");
    aleEL.attr("class", "type");
    var lagerEL = $("<button>");
    lagerEL.attr("id", "lager");
    lagerEL.attr("class", "type");
    var mixedEL = $("<button>");
    mixedEL.attr("id", "mixed");
    mixedEL.attr("class", "type");
    var meadEL = $("<button>");
    meadEL.attr("id", "mead");
    meadEL.attr("class", "type");
    var intEL = $("<button>");
    intEL.attr("id", "int");
    intEL.attr("class", "type");
    var otherEL = $("<button>");
    otherEL.attr("id", "other");
    otherEL.attr("class", "type");

    //adds the apropiate content to the elements
    aleEL.text('Ales');
    lagerEL.text('Lager');
    mixedEL.text('Hybrid/Mixed Beer');
    meadEL.text('Mead and Cider');
    intEL.text('International Ale');
    otherEL.text('Other');

    //appends into the options box
    optionsEL.append(aleEL);
    optionsEL.append(lagerEL);
    optionsEL.append(mixedEL);
    optionsEL.append(meadEL);
    optionsEL.append(intEL);
    optionsEL.append(otherEL);

    //append options box to body or desired container*************************************
    $(".resluts").append(optionsEL);

    typeToCategory()
}

function typeToCategory() {
    //listens for most general click and sends to next appropriate search filter
    $('.type').on('click', function (event) {
        event.preventDefault();
        var typeChosen = event.target.id;
        var categoryID = [];

        // CATEGORY ID SELECTOR ARRAYS
        // adds the correct catgory to the array depending on type chosen or 
        // if only one category in the type sends directly to styles
        if (typeChosen === 'ale') {
            categoryID = [1, 2, 3, 4, 5, 6];
        }
        else if (typeChosen === 'lager') {
            categoryID = [7, 8, 9];
        }
        else if (typeChosen === 'mixed') {
            categoryID = 11;
            stlyleList(categoryID);
            //clear scond filter box so it displays properly if user is going 
            //back and forth through the search filters
            optionsSecondaryEL.empty();
            //stop running the function
            return;
        }
        else if (typeChosen === 'mead') {
            categoryID = 12;
            stlyleList(categoryID);
            //clear scond filter box so it displays properly if user is going 
            //back and forth through the search filters
            optionsSecondaryEL.empty();
            //stop running the function
            return;
        }
        else if (typeChosen === 'int') {
            categoryID = 10;
            stlyleList(categoryID);
            //clear scond filter box so it displays properly if user is going 
            //back and forth through the search filters
            optionsSecondaryEL.empty();
            //stop running the function
            return;
        }
        else if (typeChosen === 'other') {
            categoryID = [13, 14];
        }

        //make ajax call for category list
        var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/categories?key=c290acd80908777561d0fdb321f75bab&';
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var categoriesData = response.data;
            //clear second filter box so it displays properly because 
            //the space is shared between the different categories
            optionsSecondaryEL.empty();
            //clear sub-box so it displays properly if user is going 
            //back and forth through the search filters
            contentEL.empty();
            //goes through all categories and makes a list off all that still meet search filter criteria
            categoryID.forEach((element) => {
                var num = element;
                categoriesData.forEach((element) => {
                    if (num == element.id) {
                        //creates the HTML elements and appends into the second filter box
                        var categoryEL = $("<button>");
                        categoryEL.attr("id", element.id);
                        categoryEL.attr("class", "category");
                        categoryEL.text(element.name);
                        optionsSecondaryEL.append(categoryEL);
                    }
                })
            })
            //append the second filter box to body or desired container*************************************
            $('.resluts').append(optionsSecondaryEL)
            //listens for choice and sends to styles
            $('.category').on('click', function (event) {
                event.preventDefault();
                stlyleList(event.target.id);

            });

        });
    });

}

//goes through all styles and makes a list off all that still meet search filter criteria
function stlyleList(chosenStyle) {
    // make ajax call for list of all styles
    var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/styles?key=c290acd80908777561d0fdb321f75bab';
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var styles = response.data;
        //clear content box so it displays properly because 
        //the space is shared between the style list and beer list
        contentEL.empty();
        //goes through the styles and selects the ones that match the chosen style
        styles.forEach((element) => {
            var num = element.category.id;
            if (num == chosenStyle) {
                //creates the HTML elements and appends into the content box
                var styleEL = $("<div>");
                styleEL.attr("id", element.id);
                styleEL.attr("class", "style");
                styleEL.text(element.name);
                contentEL.append(styleEL);
            }
        })
        //append the content box to body or desired container************************************* 
        $(".resluts").append(contentEL);
        //listens for click and sends to beer list of chosen style
        $('.style').on('click', function (event) {
            event.preventDefault();
            beerList(event.target.id);
        });

    });


}

//goes through beers that match chosen style and sends the results
function beerList(chosenStyle) {
    //make a call with the chosen style
    var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?key=c290acd80908777561d0fdb321f75bab&styleId=' + chosenStyle;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // clear content box so it displays properly because 
        //the space is shared between the style list and beer list
        contentEL.empty();

        //some don't give results because I didnt pay for the full data access
        if (response.totalResults == 0) {
            var beerEL = $("<div>");
            beerEL.attr("class", "beer");
            beerEL.text('No results because im not paing for a full version of the API');
            contentEL.append(beerEL);
        }
        //cretes the html elements and appends to the content
        //note. (no need to append the content to the body because
        //the function that calls this function already did)
        else {
            response.data.forEach((element) => {
                var beerEL = $("<div>");
                beerEL.attr("id", element.id);
                beerEL.attr("class", "beer");
                beerEL.text(element.name);
                contentEL.append(beerEL);
            })
        }

        // //listens for click on beer and sends info of beer and the user to info page
        // $('.beer').on('click', function (event) {
        //     event.preventDefault();
        //     var beerID = event.target.id;
        //     response.data.forEach((element) => {
        //         if (beerID == element.id) {
        //             clearInfo();
        //             localStorage.setItem("infoB", JSON.stringify(element));
        //             window.location.href = "../detail/detail.html";
        //         }
        //     })

        // });

    });
}


searchCreate();


});