$(document).ready(function () {
    var searchInput;
    var searchUrl;
    var inputEl = $("input");
    var inputclick = $(".btn-primary");
    var tnUrl;
    var resEl = $(".cardSection");
    var thumb;
    var drinkNm;
    var fnlCont = $(".results");
    var selAlcEl = $("#DrinkSelector");
    var inputEl = $("input");
    var AlcUrl;
    var searchInput = String;
    var searchInput;
    var ingString;
    var selAlc;
    var searchUrl;
    var cocktails;


    console.log(resEl)

    // function startLoaded() {
    //     var searchFlag = localStorage.getItem('searchFlag');
    //     var term = localStorage.getItem('term');


    //     if (searchFlag == 'true') {
    //         searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + term;
    //         search()
    //         console.log(term);
    //     }


    //     localStorage.setItem("searchFlag", false);
    // }


    inputclick.on('click', function (event) {
        searchInput = $(this).val();
        ingString = searchInput.replace(/\s/g, '');
        console.log(ingString);
        console.log(typeof ingString);
        searchUrl = AlcUrl + "," + ingString;
        console.log(searchUrl);
        $(".cardSection").empty();
        search()
    });

    selAlcEl.change(function (event) {
        selAlc = $("#DrinkSelector option:selected").text();
        AlcUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + selAlc;

        console.log(AlcUrl)

    })

    inputEl.keypress(function (event) {
        if (event.originalEvent.keyCode === 13) {
            searchInput = $(this).val();
            ingString = searchInput.replace(/\s/g, '');
            console.log(ingString);
            console.log(typeof ingString);
            searchUrl = AlcUrl + "," + ingString;
            console.log(searchUrl);
            $(".cardSection").empty();
            search()
        }
    });

    function search() {
        $.ajax({
            url: searchUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            cocktails = response.drinks;
            console.log(cocktails + '<<<<')
            resEl.empty();
            for (i = 0; i < cocktails.length; i++) {
                var cocktail = cocktails[i];
                // console.log(cocktail.strDrink);
                drinkNm = cocktail.strDrink;
                tnUrl = cocktail.strDrinkThumb;

                // console.log(tnUrl)

                genRes(cocktail.idDrink)

            }
        });
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
        console.log(cocktails)
        toResult(cocktails);


    }

    function toResult(info) {


        $('.toResult').on('click', function (event) {
            event.preventDefault();
            var id = event.target.getAttribute('data_id');
            info.forEach((element) => {
                if (id == element.idDrink) {
                    clearInfo()

                    localStorage.setItem("info", JSON.stringify(element));
                    $(".cardSection").empty()
                    finalResult();
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
        fnlCont.append(optionsEL);

        typeToCategory()
    }

    function typeToCategory() {
        //listens for most general click and sends to next appropriate search filter
        $('.type').on('click', function (event) {
            event.preventDefault();
            resEl.empty();
            $(".cardSection").empty()
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
                fnlCont.append(optionsSecondaryEL)
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
            resEl.append(contentEL);
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
                beerEL.text('No results because im not paying for a full version of the API');
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

            //listens for click on beer and sends info of beer and the user to info page
            $('.beer').on('click', function (event) {
                event.preventDefault();
                var beerID = event.target.id;
                response.data.forEach((element) => {
                    if (beerID == element.id) {
                        clearInfo();
                        localStorage.setItem("infoB", JSON.stringify(element));
                        finalResult();
                    }
                })

            });

        });
    }
    function finalResult() {
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

            $(".cardSection").append(infoEL);
            $(".cardSection").append(formatbox);
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
            infoEl.attr("class", "infoBox-beer");
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
            imgEl.attr("class", "beer-img");
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
            $(".cardSection").empty();
            $('.cardSection').append(infoEl);
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
    }


    searchCreate();
    // startLoaded();

});