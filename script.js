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
  cocktailListEl.append('<li>' + cocktailItem + '</li>');

  // clear the form input element
  $('input[name="cocktail-input"]').val('');
}

// Create a submit event listener on the form element
addBtnEl.on("click", handleFormSubmit);