$(document).ready(function () {
    var searchInput;
    var searchUrl;
    var inputEl = $("input");
    var tnUrl;
    var resEl = $(".results");
    var thumb;
    var drinkNm;
    





    inputEl.keypress(function (event) {
        if (event.originalEvent.keyCode === 13) {
            console.log(this)
            searchInput = $(this).val();
            console.log(searchInput)
            searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchInput;
            console.log(searchUrl)
            search()

        }
    });

    function search() {
        $.ajax({
            url: searchUrl,
            method: "GET"
        }).then(function (response) {
            var cocktails = response.drinks;
            resEl.empty();
            if (cocktails == null) {
                console.log("No results found for " + searchInput + ".")
            }
            
            for (i = 0; i < cocktails.length; i++) {
                var cocktail = cocktails[i];
                
                // for (i = 1; i < 16; i++) {
                //     var ingredients = [];
                //     var ingredient = eval('cocktail.strIngredient' + i);
                //     if (ingredient != null) {
                //         ingredients.push(ingredient);
                //     }
                // }
                       
                console.log(cocktail.strDrink);
                drinkNm = cocktail.strDrink;
                tnUrl = cocktail.strDrinkThumb;
                
                console.log(tnUrl)

                genRes()
            }

        })
    }
    // function genRes(){
    //     var tnEl = $("<img>");        
    //     thumb = tnEl.attr("src",tnUrl);        
    //     resEl.append(thumb)
    // }

    function genRes() {
        var ingredient = [];
        var crdNmEl = $("<p>");
        var crdImgEl = $("<img>");
       crdNmEl.attr("class","drinkName")
       crdImgEl.attr("class","cardImg")
        
        
        crdNmEl.text(drinkNm);
        crdImgEl.attr("src", tnUrl);
        resEl.append(crdNmEl).append(crdImgEl);
    }




});