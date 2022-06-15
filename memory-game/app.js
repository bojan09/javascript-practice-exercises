const cardArray = [
  // Adding a object inside the array
  {
    name: "fries",
    // grabing the images from the img directory
    img: "img/fries.png",
  },
  {
    name: "cheeseburger",
    // grabing the images from the img directory
    img: "img/cheeseburger.png",
  },
  {
    name: "hotdog",
    // grabing the images from the img directory
    img: "img/hotdog.png",
  },
  {
    name: "ice-cream",
    // grabing the images from the img directory
    img: "img/ice-cream.png",
  },
  {
    name: "milkshake",
    // grabing the images from the img directory
    img: "img/milkshake.png",
  },
  {
    name: "pizza",
    // grabing the images from the img directory
    img: "img/pizza.png",
  },

  //Creating 6 more, cuz we need 12 cards for our Grid layout
  {
    name: "fries",
    // grabing the images from the img directory
    img: "img/fries.png",
  },
  {
    name: "cheeseburger",
    // grabing the images from the img directory
    img: "img/cheeseburger.png",
  },
  {
    name: "hotdog",
    // grabing the images from the img directory
    img: "img/hotdog.png",
  },
  {
    name: "ice-cream",
    // grabing the images from the img directory
    img: "img/ice-cream.png",
  },
  {
    name: "milkshake",
    // grabing the images from the img directory
    img: "img/milkshake.png",
  },
  {
    name: "pizza",
    // grabing the images from the img directory
    img: "img/pizza.png",
  },
];

// Sorting the array randomly (it's a shortcut to sort an array randomly)
cardArray.sort(() => Math.random());

// Grabbing the id of grid from the DOM
const gridDisplay = document.querySelector("#grid");

// Grabbing the results from the DOM
const resultDisplay = document.querySelector("#result");

// Creating another array for the cards that we click on, we will use this array to push items to this array
let cardsChosen = [];

// This array will contain the cards id names
let cardsChosenIds = [];

//This array will collect the cards that we have guessed right, basically the cards we have won. So that we can know how many matches we have won
const cardsWon = [];

// A function for the board
function createBoard() {
  // for each item in the array we create a element

  // looping through our Array
  for (let i = 0; i < cardArray.length; i++) {
    // Creating a img element inside the DOM
    const card = document.createElement("img");

    // Setting the source attribute to the img
    card.setAttribute("src", "img/blank.png");

    // Adding a data id so that each item can be unique
    card.setAttribute("data-id", i);

    // Adding a event listener, to listen for whenever we click on a card
    card.addEventListener("click", flipCard);

    // Placing the images within the Grid
    gridDisplay.append(card);
  }
}

createBoard();

// A function that check if the two cards clicked are a match
function checkMatch() {
  // Getting every single cards with img elements in our DOM
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  console.log("Check for match!");

  //   alert when we click the same image
  if (optionOneId == optionTwoId) {
    console.log("You clicked the same card!");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    //   Get both of the items in the cardsChosen array and check if the match
    alert("You found a match");

    // if there is a match go into the cards and find the cards by their data-id name and assign it the card with a id of white if it's match
    cards[optionOneId].setAttribute("src", "img/white.png");
    cards[optionTwoId].setAttribute("src", "img/white.png");
    // Removing the event listener, so that when we click again on the same area nothing happends
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);

    // Adding the cards that we've won. And we push the content from the cards that we've clicked
    cardsWon.push(cardsChosen);
  }
  //   if it's not a match, then flip it back
  else {
    cards[optionOneId].setAttribute("src", "img/blank.png");
    cards[optionTwoId].setAttribute("src", "img/blank.png");
    alert("Sorry try again");
  }
  //   After all of the above has happend we need to restart the process, for the next card
  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  //   if we get all of the cards won
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations, you found them all!";
    alert("Hooray, you've won the Game");
  }
}

// A function for fliping our cards upon click
function flipCard() {
  // The following bellow will give us the card data-id upon click
  const cardId = this.getAttribute("data-id");

  //   Pushing the item name to the cardsChosen array
  cardsChosen.push(cardArray[cardId].name);

  //   Pushing the cardId into the chosenCardsID
  cardsChosenIds.push(cardId);

  //   Passing the card-id to the array in order to recive the img name
  console.log(cardArray[cardId].name);

  //   When we flip the card, (when we click the card/element) add the image
  this.setAttribute("src", cardArray[cardId].img);

  //
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }

  console.log("clicked", cardId);
  console.log(cardsChosen);
}
