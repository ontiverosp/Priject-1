$(document).ready(function () {
    var searchInput;
    var searchUrl;
    var inputEl = $("input");
    var tnUrl;
    var resEl = $(".results");
    var thumb;
    
    

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
                var drinkName = cocktail.strDrink;                
                console.log(cocktail.strDrink);
                tnUrl = cocktail.strDrinkThumb;
                console.log(tnUrl)
                
                genRes()
            }
            
        })
    }
    function genRes(){
        var cardTitle = $(".card-title");
        var cartText = $(".card-text");
        var cardImg = $(".card-image");
        var card = $(".cardSection");
        card.attr("style","display:block");    
        cardImg.attr("src",tnUrl);
        cardTitle.text(drinkName);        
        resEl.append(card);
    }

});