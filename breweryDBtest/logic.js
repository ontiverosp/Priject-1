
function beer() {

    //the two content boxes stuff gets appended into
    var optionsEL = $("<div>");
    optionsEL.attr("class", "filterBox");
    var optionsSecondaryEL = $("<div>");
    optionsSecondaryEL.attr("class", "filterBox");
    var contentEL = $("<div>");
    contentEL.attr("class", "contentBox");

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

        //fills in the options box
        optionsEL.append(aleEL);
        optionsEL.append(lagerEL);
        optionsEL.append(mixedEL);
        optionsEL.append(meadEL);
        optionsEL.append(intEL);
        optionsEL.append(otherEL);

        //append options box to the HTML
        $("body").append(optionsEL);


    }
    searchCreate();

    //listens for most general click and sends to next appropriate search filter
    $('.type').on('click', function (event) {
        event.preventDefault();
        var typeChosen = event.target.id;
        var categoryID = [];

        // // CATEGORY ID SELECTOR ARRAYS 
        if (typeChosen === 'ale') {
            categoryID = [1, 2, 3, 4, 5, 6];
        }
        else if (typeChosen === 'lager') {
            categoryID = [7, 8, 9];
        }
        else if (typeChosen === 'mixed') {
            categoryID = 11;
            stlyleList(categoryID);
            optionsSecondaryEL.empty();
            return;
        }
        else if (typeChosen === 'mead') {
            categoryID = 12;
            stlyleList(categoryID);
            optionsSecondaryEL.empty();
            return;
        }
        else if (typeChosen === 'int') {
            categoryID = 10;
            stlyleList(categoryID);
            optionsSecondaryEL.empty();
            return;
        }
        else if (typeChosen === 'other') {
            categoryID = [13, 14];
        }
        else {
            console.log('ERROR! I didnt get a valid type');
        }



        var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/categories?key=c290acd80908777561d0fdb321f75bab&';
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var categoriesData = response.data;
            optionsSecondaryEL.empty();
            contentEL.empty();
            //goes through all categories and makes a list off all that still meet search filter criteria
            categoryID.forEach((element) => {
                var num = element;
                categoriesData.forEach((element) => {
                    if (num == element.id) {
                        var categoryEL = $("<button>");
                        categoryEL.attr("id", element.id);
                        categoryEL.attr("class", "category");
                        categoryEL.text(element.name);
                        optionsSecondaryEL.append(categoryEL);
                    }
                })
            })
            $('body').append(optionsSecondaryEL)
            $('.category').on('click', function (event) {
                event.preventDefault();
                stlyleList(event.target.id);

            });

        });
    });


    //goes through all styles and makes a list off all that still meet search filter criteria
    function stlyleList(chosenStyle) {
        var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/styles?key=c290acd80908777561d0fdb321f75bab';

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var styles = response.data;
            contentEL.empty();
            //cretes the html elements and appends
            styles.forEach((element) => {
                var num = element.category.id;
                if (num == chosenStyle) {
                    var styleEL = $("<div>");
                    styleEL.attr("id", element.id);
                    styleEL.attr("class", "style");
                    styleEL.text(element.name);
                    contentEL.append(styleEL);

                }
            })
            $("body").append(contentEL);
            //listens for click and sends to next filter
            $('.style').on('click', function (event) {
                event.preventDefault();
                beerList(event.target.id);
            });

        });


    }

    //goes through beers that match chosen style and sends to results
    function beerList(chosenStyle) {
        var queryURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?key=c290acd80908777561d0fdb321f75bab&styleId=' + chosenStyle;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            contentEL.empty();

            if (response.totalResults == 0) {
                var beerEL = $("<div>");
                beerEL.attr("class", "beer");
                beerEL.text('No results because im not paing for a full version of the API');
                contentEL.append(beerEL);
            }
            //cretes the html elements and appends
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
                        window.location.href = "test/result-beer.html";
                    }
                })

            });

        });
    }
}

function clearInfo() {
    localStorage.removeItem("info");
    localStorage.removeItem("infoB");
}

beer();
