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

// meal page handling - carsdan dvorachek
function pageMealDisplay(page) {
    let pageMealDisplay = document.querySelectorAll('.meal-page-' + page);
    let other = Math.abs(page - 2) + 1;
    let pageMealHide = document.querySelectorAll('.meal-page-' + other);
    for (let i = 0; i < pageMealDisplay.length; i++) {
        pageMealDisplay[i].setAttribute('style', 'display:inline;');
    }
    for (let i = 0; i < pageMealHide.length; i++) {
        pageMealHide[i].setAttribute('style', 'display:none;');
    }
}
pageMealDisplay(1);

//declaring global variable for scoping purposes (used later)
var drinksArr = [];
var drinksArrInfo = [];
var drinkNumber;
var drinkShowing;
var mealNumber;
var mealShowing;
var mealsArr = [];
var mealsArrInfo = [];
//page handling finished - carsdan dvorachek

//search list
// get api function - marco 
var searchBtn = document.getElementById('searchBtn');
var searchMealBtn = document.getElementById('search-meal-btn');
var modIngredientList = document.getElementById('mod-ingr-list');
var cocktailModHeader = document.getElementById('mod-name');
var cocktailModImage = document.getElementById('mod-image');
var cocktailModInstructions = document.getElementById('mod-instructions');
var seeRecipeBtn = document.getElementById('seeRecipeBtn');
var main = document.getElementById('main');

function getApi() {
    var ingredientInput = $('input[name="cocktail-input"]').val();
    // defining the search box variables
    console.log(ingredientInput);
    var searchedIngredient = ingredientInput;
    var searchedUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchedIngredient;
    console.log(searchedUrl);
    // fetching the corresponding search url 
    fetch(searchedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if(!data.drinks){
                //a wrong ingredient was searched
            } else {
                //run normal code
                console.log(data);
                drinkNumber = data.drinks.length;
                
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
                        //make empty array full of drink info
                        let drinkInfoObj =
                        {
                            drinkName: "",
                            drinkImage: "",
                            drinkInstructions: "",
                            drinkIngredients: [],
                            drinkIngrAmt: []
                        }
                        drinkInfoObj.drinkName = data.drinks[0].strDrink;
                        drinkInfoObj.drinkImage = data.drinks[0].strDrinkThumb;
                        drinkInfoObj.drinkInstructions = data.drinks[0].strInstructions;
                        for (let i = 0; i < 15; i++) {
                            let listItem = data.drinks[0]["strIngredient" + (i + 1)];
                            let listItemAmount = data.drinks[0]["strMeasure" + (i + 1)];
                            // fix empty strings displaying 
                            if ((listItem !== null) && (listItem != "")) {
                                drinkInfoObj.drinkIngredients.push(listItem);
                                drinkInfoObj.drinkIngrAmt.push(listItemAmount);
                            }
                        }
                        drinksArrInfo.push(drinkInfoObj);
                        console.log(drinksArrInfo);
                        
                        //grab modal items
                        var modNameEl = document.querySelector('#mod-name');
                        var modImageEl = document.querySelector('#mod-image');
                        var modInstructionsEl = document.querySelector('#mod-instructions');
                        
                        //function that updates modal
                        function updateModal(){
                            modNameEl.textContent = drinksArrInfo[drinkShowing].drinkName;
                            modImageEl.setAttribute('src',drinksArrInfo[drinkShowing].drinkImage);
                            modInstructionsEl.textContent = drinksArrInfo[drinkShowing].drinkInstructions;
                            for (let i = 0; i < 15; i++) {
                                var ingredientEl = document.querySelector('#ingr'+(i+1));
                                ingredientEl.setAttribute('style','display:none;');
                                numOfIngr = drinksArrInfo[drinkShowing].drinkIngredients.length;
                                if(i < numOfIngr){
                                    ingredientEl.textContent = drinksArrInfo[drinkShowing].drinkIngredients[i] + ' -- ' + drinksArrInfo[drinkShowing].drinkIngrAmt[i];
                                    console.log(drinkInfoObj.drinkIngredients[i]);
                                    console.log(drinkInfoObj.drinkIngrAmt[i]);
                                    ingredientEl.setAttribute('style','display:block;');
                                }
                            }
                        }
                        //on click event runs function
                        var showRecipeBtn = $('#see-recipe-btn');
                        showRecipeBtn.on('click',updateModal)
    
                        //prev and next button functions - carsdan dvorachek
            
                        let drinkObj =
                        {
                            drinkName: "",
                            drinkImage: ""
                        }
                        drinkObj.drinkName = drinkInfoObj.drinkName;
                        drinkObj.drinkImage = drinkInfoObj.drinkImage;
                        drinksArr.push(drinkObj);
                        console.log(drinksArr);
            
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
                            console.log("display first recipe");
                        }
            
                        function displayLastRecipe() {
                            cocktailNameEl.textContent = drinksArr[drinkNumber - 1].drinkName;
                            cocktailImageEl.setAttribute('src', drinksArr[drinkNumber - 1].drinkImage);
                            drinkShowing = drinkNumber - 1;
                            listMarkerEl.textContent = drinkShowing + 1;
                            console.log('display last recipe');
                        }
            
                        function displayNextRecipe() {
                            if ((drinkShowing + 1) >= drinkNumber) {
                                displayFirstRecipe();
                            } else {
                                drinkShowing++;
                                displayRecipe(drinkShowing);
                                listMarkerEl.textContent = drinkShowing + 1;
                                console.log('display next recipe');
                            }
                            textFit(cocktailNameEl);
                        }
            
                        function displayPrevRecipe() {
                            if ((drinkShowing - 1) <= -1) {
                                displayLastRecipe();
                            } else {
                                drinkShowing--;
                                displayRecipe(drinkShowing);
                                listMarkerEl.textContent = drinkShowing + 1;
                                console.log('display prev recipe');
                            }
                            textFit(cocktailNameEl);
                        }
            
                        function displayRecipe(index) {
                            cocktailNameEl.textContent = drinksArr[index].drinkName;
                            cocktailImageEl.setAttribute('src', drinksArr[index].drinkImage);
                            drinkShowing = index;
                            listMarkerEl.textContent = drinkShowing + 1;
                        }
                        var prevButtonEl = $('.prev-btn');
                        var nextButtonEl = $('.next-btn');
                        
                        if(i == 0){
                            prevButtonEl.on('click', displayPrevRecipe);
                            nextButtonEl.on('click', displayNextRecipe);
                        }
    
                        displayFirstRecipe();
                        textFit(cocktailNameEl);
                        //prev and next button functions finished - carsdan dvorachek
                        });
                }
                // get api function - marco  
            }
            pageDisplay(2);
        });
}

searchBtn.addEventListener('click', function(){
    var cocktailItem = $('input[name="cocktail-input"]').val();
   if(cocktailItem){
    getApi()
   }
   
});
// get api function - marco  

function getMealApi() {
    var ingredientMealInput = $('input[name="meal-input"]').val();
    // defining the search box variables
    console.log(ingredientMealInput);
    var searchedMealIngredient = ingredientMealInput;
    var searchedMealUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + searchedMealIngredient;
    console.log(searchedMealUrl);
    // fetching the corresponding search url 
    fetch(searchedMealUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.meals);
            if(data.meals === 'null'){
                //a wrong ingredient was searched
            } else {
                //run normal code
                console.log(data);
                mealNumber = data.meals.length;
                
                // searching returned cocktails by ID 
                for (let i = 0; i < mealNumber; i++) {
                    var idMealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + data.meals[i].idMeal;
                    console.log(idMealUrl);
                    
                    fetch(idMealUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        //make empty array full of drink info
                        let mealInfoObj =
                        {
                            mealName: "",
                            mealImage: "",
                            mealInstructions: "",
                            mealIngredients: [],
                            mealIngrAmt: []
                        }
                        mealInfoObj.mealName = data.meals[0].strMeal;
                        mealInfoObj.mealImage = data.meals[0].strMealThumb;
                        mealInfoObj.mealInstructions = data.meals[0].strInstructions;
                        for (let i = 0; i < 20; i++) {
                            let mealListItem = data.meals[0]["strIngredient" + (i + 1)];
                            let mealListItemAmount = data.meals[0]["strMeasure" + (i + 1)];
                            // fix empty strings displaying 
                            if ((mealListItem !== null) && (mealListItem != "")) {
                                mealInfoObj.mealIngredients.push(mealListItem);
                                mealInfoObj.mealIngrAmt.push(mealListItemAmount);
                            }
                        }
                        mealsArrInfo.push(mealInfoObj);
                        console.log(mealsArrInfo);
                        
                        //grab modal items
                        var modMealNameEl = document.querySelector('#mod-meal-name');
                        var modMealImageEl = document.querySelector('#mod-meal-image');
                        var modMealInstructionsEl = document.querySelector('#mod-meal-instructions');
                        
                        //function that updates modal
                        function updateMealModal(){
                            modMealNameEl.textContent = mealsArrInfo[mealShowing].mealName;
                            modMealImageEl.setAttribute('src',mealsArrInfo[mealShowing].mealImage);
                            modMealInstructionsEl.textContent = mealsArrInfo[mealShowing].mealInstructions;
                            for (let i = 0; i < 20; i++) {
                                var ingredientMealEl = document.querySelector('#meal-ingr'+(i+1));
                                ingredientMealEl.setAttribute('style','display:none;');
                                numOfMealIngr = mealsArrInfo[mealShowing].mealIngredients.length;
                                if(i < numOfMealIngr){
                                    ingredientMealEl.textContent =  mealsArrInfo[mealShowing].mealIngredients[i] + ' -- ' + mealsArrInfo[mealShowing].mealIngrAmt[i];
                                    console.log(mealInfoObj.mealIngredients[i]);
                                    console.log(mealInfoObj.mealIngrAmt[i]);
                                    ingredientMealEl.setAttribute('style','display:block;');
                                }
                            }
                        }
                        //on click event runs function
                        var showMealRecipeBtn = $('#see-meal-recipe-btn');
                        showMealRecipeBtn.on('click',updateMealModal)
    
                        //prev and next button functions - carsdan dvorachek
            
                        let mealObj =
                        {
                            mealName: "",
                            mealImage: ""
                        }
                        mealObj.mealName = mealInfoObj.mealName;
                        mealObj.mealImage = mealInfoObj.mealImage;
                        mealsArr.push(mealObj);
                        console.log(mealsArr);
            
                        var mealNameEl = document.querySelector('#meal-name');
                        var mealImageEl = document.querySelector('#meal-image');
                        var mealListMarkerEl = document.querySelector('#meal-list-marker');
                        var mealListMarkerLengthEl = document.querySelector('#meal-list-marker-length');
            
                        mealListMarkerLengthEl.textContent = mealNumber;
            
                        function displayFirstMealRecipe() {
                            mealNameEl.textContent = mealsArr[0].mealName;
                            mealImageEl.setAttribute('src', mealsArr[0].mealImage);
                            mealShowing = 0;
                            mealListMarkerEl.textContent = mealShowing + 1;
                            console.log("display first meal recipe");
                        }
            
                        function displayLastMealRecipe() {
                            mealNameEl.textContent = mealsArr[mealNumber - 1].mealName;
                            mealImageEl.setAttribute('src', mealsArr[mealNumber - 1].mealImage);
                            mealShowing = mealNumber - 1;
                            mealListMarkerEl.textContent = mealShowing + 1;
                            console.log('display last meal recipe');
                        }
            
                        function displayNextMealRecipe() {
                            if ((mealShowing + 1) >= mealNumber) {
                                displayFirstMealRecipe();
                            } else {
                                mealShowing++;
                                displayMealRecipe(mealShowing);
                                mealListMarkerEl.textContent = mealShowing + 1;
                                console.log('display next meal recipe');
                            }
                            textFit(mealNameEl);
                        }
            
                        function displayPrevMealRecipe() {
                            if ((mealShowing - 1) <= -1) {
                                displayLastMealRecipe();
                            } else {
                                mealShowing--;
                                displayMealRecipe(mealShowing);
                                mealListMarkerEl.textContent = mealShowing + 1;
                                console.log('display prev meal recipe');
                            }
                            textFit(mealNameEl);
                        }
            
                        function displayMealRecipe(index) {
                            mealNameEl.textContent = mealsArr[index].mealName;
                            mealImageEl.setAttribute('src', mealsArr[index].mealImage);
                            mealShowing = index;
                            mealListMarkerEl.textContent = mealShowing + 1;
                        }
                        var prevMealButtonEl = $('.prev-meal-btn');
                        var nextMealButtonEl = $('.next-meal-btn');
                        
                        if(i == 0){
                            prevMealButtonEl.on('click', displayPrevMealRecipe);
                            nextMealButtonEl.on('click', displayNextMealRecipe);
                        }
    
                        displayFirstMealRecipe();
                        textFit(mealNameEl);
                        //prev and next button functions finished - carsdan dvorachek
                        });
                }
                // get api function - marco  
            }
            pageMealDisplay(2);
            console.log("i ran");
        });
}

searchMealBtn.addEventListener('click', function(){
    var mealItem = $('input[name="meal-input"]').val();
    if(mealItem){
        getMealApi();
    }
});
// get api function - marco  

//modal initialization - carsdan dvorachek
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

var goBackBtn = document.getElementById("go-back-btn");
goBackBtn.addEventListener('click',function(){
    location.reload();
})


/* See Recipe Modal Trigger Button
<a class="waves-effect waves-light btn modal-trigger" href="#modal1">See Recipe</a>
*/

//modal initialization finished - carsdan dvorachek

// // Kelly
// var addBtnEl = $('#add-btn');
// var cocktailListEl = $('#cocktail-list');
// var cocktailArr = [];

// // create function to handle form submission
// function handleFormSubmit(event) {
//     event.preventDefault();

//     // select form element by its `name` attribute and get its value
//     var cocktailItem = $('input[name="cocktail-input"]').val();

//     // if there's nothing in the form entered, don't print to the page
//     if (!cocktailItem || cocktailArr.includes(cocktailItem)) {
//         console.log("Error, can't add ingredient!");
//         return;
//     }

//     cocktailArr.push(cocktailItem);

//     // print to the page
//     cocktailListEl.append('<li class="ingredients">' + cocktailItem + '</li>');

//     // clear the form input element
//     $('input[name="cocktail-input"]').val('');
// }

// // Create a submit event listener on the form element
// addBtnEl.on("click", handleFormSubmit);
// // Kelly
