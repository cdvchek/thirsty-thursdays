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
pageDisplay(1);
//page handling finished - carsdan dvorachek


//search list
// get api function - marco 
var searchBtn = document.getElementById('searchBtn');
var modIngredientList = document.getElementById('mod-ingr-list');
var cocktailModHeader = document.getElementById('mod-name');
var cocktailModImage = document.getElementById('mod-image');
var cocktailModInstructions = document.getElementById('mod-instructions');

function getApi(url) {
    var ingredientInput = document.querySelector('.ingredients'); //first element of ingredients list
    // defining the search box variables
    console.log(ingredientInput);
    var searchedIngredient = ingredientInput.innerText;
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
                        // display cocktail info onto the cocktail Mod
                        console.log(data);
                        // display corresponding drink name 
                        let drinkName = data.drinks[0].strDrink;
                        cocktailModHeader = drinkName;
                        console.log(cocktailModHeader);
                        // display corresponding cocktail image onto cocktail mod
                        let modImageSource = data.drinks[0].strDrinkThumb;
                        cocktailModImage.src = modImageSource;
                        console.log(cocktailModImage.src);
                        // display instructions to mod
                        let modInstructions = data.drinks[0].strInstructions;
                        cocktailModInstructions = modInstructions;
                        console.log(cocktailModInstructions);
                        // display ingredients and amounts to mod
                        for (let i = 0; i < 15; i++) {
                            let listItem = data.drinks[0]["strIngredient" + (i + 1)];
                            let listItemAmount = data.drinks[0]["strMeasure" + (i + 1)];
                            if ((listItem !== null) || (listItem !== "")){
                                var node = document.createElement('li');
                                node.appendChild(document.createTextNode(listItem));
                                modIngredientList.appendChild(node);
                                console.log(node)
                            }
                            if (listItemAmount !== null){
                                var node = document.createElement('li');
                                node.appendChild(document.createTextNode(listItemAmount));
                                modIngredientList.appendChild(node);
                                console.log(node)
                            }
                            
                        }

                        var cocktailRecipesListEl = document.querySelector('#cocktail-recipes');
                        console.log('stuff: ' + cocktailRecipesListEl);

                        var drinkOverviewLiEl = document.createElement('li');

                        var drinkTitle = document.createElement('h3');
                        drinkTitle.textContent = drinkName;
                        drinkOverviewLiEl.append(drinkTitle);

                        var drinkImage = document.createElement('img');
                        drinkImageSource = data.drinks[0].strDrinkThumb;
                        drinkImage.setAttribute('src',modImageSource);
                        drinkOverviewLiEl.append(drinkImage);

                        var seeRecipeBtn = document.createElement('a');
                        seeRecipeBtn.setAttribute('class','waves-effect waves-light btn modal-trigger');
                        seeRecipeBtn.setAttribute('href','#modal1');
                        seeRecipeBtn.textContent = 'See Recipe';
                        drinkOverviewLiEl.append(seeRecipeBtn);

                        var prevBtn = document.createElement('button');
                        prevBtn.textContent = '<';
                        drinkOverviewLiEl.append(prevBtn);

                        var nextBtn = document.createElement('button');
                        nextBtn.textContent = '>';
                        drinkOverviewLiEl.append(nextBtn);

                        cocktailRecipesListEl.append(drinkOverviewLiEl);

                    });


            }
        });
        pageDisplay(2);
}

searchBtn.addEventListener('click', getApi);
// get api function - marco  

//modal initialization - carsdan dvorachek
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

/* See Recipe Modal Trigger Button
<a class="waves-effect waves-light btn modal-trigger" href="#modal1">See Recipe</a>
*/

//modal initialization finished - carsdan dvorachek

// Kelly
var addBtnEl = $('#add-btn');
var cocktailListEl = $('#cocktail-list');
var cocktailArr = [];

// create function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // select form element by its `name` attribute and get its value
    var cocktailItem = $('input[name="cocktail-input"]').val();

    // if there's nothing in the form entered, don't print to the page
    if (!cocktailItem || cocktailArr.includes(cocktailItem)) {
        console.log("Error, can't add ingredient!");
        return;
    }

    cocktailArr.push(cocktailItem);



  // print to the page
  cocktailListEl.append('<li class="ingredients">' + cocktailItem + '</li>');

    // clear the form input element
    $('input[name="cocktail-input"]').val('');
}

// Create a submit event listener on the form element
addBtnEl.on("click", handleFormSubmit);
// Kelly


// random movie generator -marco
// random movie generator -marco

//prev and next button functions - carsdan dvorachek
//prev and next button functions finished - carsdan dvorachek

