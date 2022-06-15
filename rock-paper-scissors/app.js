const computerChoiceDisplay = document.querySelector("#computer-choice");
const userChoiceDisplay = document.querySelector("#user-choice");
const resultsDisplay = document.querySelector("#results");

// Getting all the possible choices
const possibleChoice = document.querySelectorAll("button");

// Grabbing the buttons

// Adding a variable for userChoice
let userChoice;
// Adding a variable for computerChoice
let computerChoice;
// Adding a variable for results
let results;

// For each possible choice we want to pass a possible choice, which will have a click event. And everytime we click, we should get the target id
possibleChoice.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    // Generating a user choice
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;

    // Generating a computer choice
    generateComputerChoice();

    // Generating the results

    getResults();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoice.length) + 1;
  console.log(randomNumber);

  if (randomNumber === 1) {
    computerChoice = "rock";
  } else if (randomNumber === 2) {
    computerChoice = "scissors";
  } else if (randomNumber === 3) {
    computerChoice = "paper";
  }

  computerChoiceDisplay.innerHTML = computerChoice;
}

// Getting the results

function getResults() {
  if (userChoice === computerChoice) {
    resutls = "It's a draw!";
  } else if (computerChoice === userChoice) {
    results = "It's a draw";
  } else if (computerChoice === "rock" && userChoice === "paper") {
    results = "You win!";
  } else if (computerChoice === "rock" && userChoice === "scissors") {
    results = "You lost!";
  } else if (computerChoice === "paper" && userChoice === "scissors") {
    results = "You win!";
  } else if (computerChoice === "paper" && userChoice === "rock") {
    results = "You lost!";
  } else if (computerChoice === "scissors" && userChoice === "rock") {
    results = "You lost!";
  } else if (computerChoice === "scissors" && userChoice === "paper") {
    results = "You lost!";
  }

  resultsDisplay.innerHTML = results;
}
