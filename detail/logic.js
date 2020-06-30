
//makes sure only one type of search term is passed on
function clearTerms(){
    localStorage.removeItem("termI");
    localStorage.removeItem("termA");
    localStorage.removeItem("termS");
    return;
}

//sends you back to the home page and runs new search
$("#searchIngridient").on("click", function () {
    var term = $("#termIngridient").val();
    console.log(term);
    window.location.href = "../index.html";
    clearTerms();
    localStorage.setItem("termI", term);
    localStorage.setItem("searchFlag", true);
});
$("#searchAlcohol").on("click", function () {
    var term = $("#termAlcohol").val();
    console.log(term);
    window.location.href = "../index.html";
    clearTerms();
    localStorage.setItem("termA", term);
    localStorage.setItem("searchFlag", true);
});
$("#searchSomething").on("click", function () {
    var term = $("#termSomething").val();
    console.log(term);
    window.location.href = "../index.html";
    clearTerms();
    localStorage.setItem("termS", term);
    localStorage.setItem("searchFlag", true);
});

//displays the info.
