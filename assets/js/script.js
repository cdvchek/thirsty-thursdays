// page handling - carsdan dvorachek
function pageDisplay(page) {
    let pageDisplay = document.querySelectorAll('.page-' + page);
    let other = Math.abs(page - 2) + 1;
    let pageHide = document.querySelectorAll('.page-' + other);
    for (let i = 0; i < pageDisplay.length; i++) {
        pageDisplay[i].setAttribute('style', 'display:inline;');
    }
    for (let i = 0; i < pageHide.length; i++) {
        pageHide[i].setAttribute('style', 'display:none;');
    }
}
//page handling finished - carsdan dvorachek


//search list
// get api function -marco 
var ingredientInput = document.getElementById('ingredientInput');
var searchBtn = document.getElementById('searchBtn');

function getApi(url) {
    // defining the search box variables
    var searchedIngredient = ingredientInput.value;
    var searchedUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchedIngredient;
    // fetching the corresponding search url 
    fetch(searchedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // searching returned cocktails by ID 
            for (let i = 0; i < data.drinks.length; i++) {
                var idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data.drinks[i].idDrink;
                console.log(idUrl);
                fetch(idUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        console.log("helloworld");
                        for (let i = 0; i < 15; i++) {
                        console.log(data.drinks[0]["strIngredient" + (i + 1)])
                        }
                        
                    });

            }
        });
}

searchBtn.addEventListener('click', getApi);