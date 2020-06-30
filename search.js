//call API when clicked or submited with the right parameters



//store response in local storage or variable

var inputEl = $("input")
var drinks;
var beers;


    for (var i = 0; i < drinks.length; i++) {
    var drink = drinks[i]
<<<<<<< HEAD
    if (input == drink) {
=======
    if (imput == drink) {
>>>>>>> master
        //display infromation and images
    }
    for (var i = 0; i < beers.length; i++) {
        var beer = beers[i]
<<<<<<< HEAD
        if (input == beer) {
=======
        if (imput == beer) {
>>>>>>> master
           //display infromation and images
        }

inputEl.on("click", function () {
    console.log(this)
})

inputEl.keypress(function (event) {
    if (event.originalEvent.keyCode === 13) {
        var value = $(this).val();
        var key = $(this).attr("class")
        console.log(value)
        console.log(key)
        localStorage.setItem(key, value)
    }

})

//Create result cards
    //card body
    //drink title w/ link to detailed results
    //pictures
//create detailed results
    //take account of all info were getting and displaying it properly