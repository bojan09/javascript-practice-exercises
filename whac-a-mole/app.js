// selecting all the squares
const squares = document.querySelectorAll(".square");
// storing the mole
const mole = document.querySelector(".mole");
// storing the timeLeft
const timeLeft = document.querySelector("#timeLeft");
// storing the score
const score = document.querySelector("#score");

// This is for the results to be displayed later on in the #score
let results = 0;
// this is for the randomSquare function for whenever we hit a mole
let hitPosition;
// This is for the countDown function to display the current time
let currentTime = 60;
// setting the timerId to a global variable
let timerId = null;

// A random function for our mole
function randomSquare() {
  // using forEach loop method
  squares.forEach((square) => {
    // if there is a mole in our square, remove the class mole
    square.classList.remove("mole");
  });

  //   gives a random number between 0 and 9
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  //   whatever random position is in our square we will add the mole clas. Basically we will have our mole in a random square each time
  randomSquare.classList.add("mole");
  console.log(randomSquare);

  // Setting the hit position to be the whole square
  // getting the randomSquare id (from 1 to 9), and adding it to hitPosition
  hitPosition = randomSquare.id;
}

// Listening for when we hit the mole, when we hit the mole we should recive a +1 score
squares.forEach((square) => {
  // listening for a mouse click on any of the squares containing the mole
  square.addEventListener("mousedown", () => {
    // if the square id that we click on is the same as the hit position id then that means we hit the mole and we should recive a point
    if (square.id == hitPosition) {
      // then we want to get the results
      results++;

      // Display the results in our score
      score.textContent = results;
      // clear the hitPosition
      hitPosition = null;
    }
  });
});

// Next up, putting it with a timer, in a function
function moveMole() {
  // random square lights up with our mole at every 500ms
  timerId = setInterval(randomSquare, 750);
}
moveMole();

// a countdown function for our gameplay time
function countDown() {
  currentTime--; // this will minus 1 from 60, each second
  timeLeft.textContent = currentTime;

  // This checks if your current time has ended
  if (currentTime == 0) {
    clearInterval(countDowntimerId);
    clearInterval(timerId);
    alert("Game Over, Your final score is " + results);
  }
}

let countDowntimerId = setInterval(countDown, 1000);
