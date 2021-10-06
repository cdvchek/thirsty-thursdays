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

//declaring global variable for scoping purposes (used later)
var drinksArr = [];
var drinkNumber;
var drinkShowing;
//page handling finished - carsdan dvorachek


//search list
// get api function - marco 
var searchBtn = document.getElementById('searchBtn');
var modIngredientList = document.getElementById('mod-ingr-list');
var cocktailModHeader = document.getElementById('mod-name');
var cocktailModImage = document.getElementById('mod-image');
var cocktailModInstructions = document.getElementById('mod-instructions');
var seeRecipeBtn = document.getElementById('seeRecipeBtn');
var main = document.getElementById('main')

function getApi() {
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
                        // create new modal element
                        var newMod = document.createElement("div");
                        newMod.classList.add("modal");
                        newMod.id = "modal" + (i + 1);
                        main.appendChild(newMod);
                        var newModContent = document.createElement("div");
                        newModContent.classList.add("modal-content");
                        newMod.appendChild(newModContent);
                        // display corresponding drink name 
                        let drinkName = data.drinks[0].strDrink;
                        cocktailModHeader = drinkName;
                        // create modal element
                        var modTitle = document.createElement("h4");
                        modTitle.textContent = cocktailModHeader;
                        newModContent.appendChild(modTitle);
                        // create mod footer

                        var modFooter = document.createElement("div");
                        modFooter.classList.add("modal-footer");
                        newMod.appendChild(modFooter);
                        var modA = document.createElement("a");
                        modA.classList.add("modal-close", "waves-effect", "waves-green", "btn-flat");
                        modA.setAttribute("href","#!");
                        modFooter.appendChild(modA);
                        document.addEventListener('DOMContentLoaded', function () {
                            var elems = document.querySelectorAll('.modal');
                            var instances = M.Modal.init(elems);
                        });
                        
                        // display corresponding cocktail image onto cocktail mod
                        let modImageSource = data.drinks[0].strDrinkThumb;
                        cocktailModImage.src = modImageSource;
                        console.log(cocktailModImage.src);
                        // create modal element
                        modImageDisplay = document.createElement("img");
                        modImageDisplay.src = cocktailModImage.src;
                        newModContent.appendChild(modImageDisplay);

                        // display instructions to mod
                        let modInstructions = data.drinks[0].strInstructions;
                        cocktailModInstructions = modInstructions;
                        console.log(cocktailModInstructions);
                        // create modal element
                        modInstructionsDisplay = document.createElement("p");
                        modInstructionsDisplay.textContent = cocktailModInstructions;
                        newModContent.appendChild(modInstructionsDisplay);
                        // create ul for modal
                        modIngredientsDisplayList = document.createElement("ul");
                        newModContent.appendChild(modIngredientsDisplayList);
                        // display ingredients and amounts to mod
                        for (let i = 0; i < 15; i++) {
                            let listItem = data.drinks[0]["strIngredient" + (i + 1)];
                            let listItemAmount = data.drinks[0]["strMeasure" + (i + 1)];
                            // fix empty strings displaying 
                            if ((listItem !== null)) {
                                modIngredientItem = document.createElement("li");
                                modIngredientItem.textContent = listItem;
                                modIngredientsDisplayList.appendChild(modIngredientItem);
                                // var node = document.createElement('li');
                                // node.appendChild(document.createTextNode(listItem));
                                // modIngredientList.appendChild(node);
                                // console.log(node)
                            }
                            if (listItemAmount !== null) {
                                modAmountItem = document.createElement("li");
                                modAmountItem.textContent = listItemAmount;
                                modIngredientsDisplayList.appendChild(modAmountItem);
                                // var node = document.createElement('li');
                                // node.appendChild(document.createTextNode(listItemAmount));
                                // modIngredientList.appendChild(node);
                                // console.log(node)
                            }
                        }
                    });
                    
            }
            
            
            // get api function - marco  

            //prev and next button functions - carsdan dvorachek

            drinkNumber = data.drinks.length;
            for (let i = 0; i < drinkNumber; i++) {
                let drinkObj =
                {
                    drinkName: "",
                    drinkImage: ""
                }
                drinkObj.drinkName = data.drinks[i].strDrink;
                drinkObj.drinkImage = data.drinks[i].strDrinkThumb;
                drinksArr.push(drinkObj);
            }
            console.log(drinksArr);
            console.log("array of my drinks: " + drinksArr[0].drinkName);


            var cocktailNameEl = document.querySelector('#cocktail-name');
            var cocktailImageEl = document.querySelector('#cocktail-image');
            var listMarkerEl = document.querySelector('#list-marker');
            var listMarkerLengthEl = document.querySelector('#list-marker-length');

            listMarkerLengthEl.textContent = drinkNumber;

            function displayFirstRecipe() {
                cocktailNameEl.textContent = drinksArr[0].drinkName;
                cocktailImageEl.setAttribute('src', drinksArr[0].drinkImage);
                drinkShowing = 0;
                listMarkerEl.textContent = drinkShowing + 1;
            }

            function displayLastRecipe() {
                cocktailNameEl.textContent = drinksArr[drinkNumber - 1].drinkName;
                cocktailImageEl.setAttribute('src', drinksArr[drinkNumber - 1].drinkImage);
                drinkShowing = drinkNumber - 1;
                listMarkerEl.textContent = drinkShowing + 1;
            }

            function displayNextRecipe() {
                if ((drinkShowing + 1) >= drinkNumber) {
                    displayFirstRecipe();
                } else {
                    drinkShowing++;
                    displayRecipe(drinkShowing);
                    listMarkerEl.textContent = drinkShowing + 1;
                }
            }

            function displayPrevRecipe() {
                if ((drinkShowing - 1) <= -1) {
                    displayLastRecipe();
                } else {
                    drinkShowing--;
                    displayRecipe(drinkShowing);
                    listMarkerEl.textContent = drinkShowing + 1;
                }
            }

            function displayRecipe(index) {
                cocktailNameEl.textContent = drinksArr[index].drinkName;
                cocktailImageEl.setAttribute('src', drinksArr[index].drinkImage);
                drinkShowing = index;
                listMarkerEl.textContent = drinkShowing + 1;
            }
            var prevButtonEl = $('.prev-btn');
            var nextButtonEl = $('.next-btn');

            prevButtonEl.on('click', displayPrevRecipe);
            nextButtonEl.on('click', displayNextRecipe);
            
           

            displayFirstRecipe();
            //prev and next button functions finished - carsdan dvorachek

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


