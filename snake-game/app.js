// Grabing the gameBoard aka our canvas
const gameBoard = document.querySelector("#gameBoard");
// Next, declaring our context
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
// Defining our width and height for the gameBoard
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
// Adding some colors
const boardBackground = "white";
const snakeColor = "limegreen";
const snakeBorder = "black";
const foodColor = "firebrick";
// Unit size is 25px
const unitSize = 25;
// Using the next constant to see if our game is running or not
let running = false;
// The following one means how far we move on the x axis every single game tick. It's been set with the unitSize meaning we will be moving 25px with each game tick.
// If xVelocity is a positive number we'll move to the right, if it's a negative we'll move to the left
let xVelocity = unitSize;
// The following one means that we won't be moving up nor down. If we set the yVelocity = unitSize we'll move up, if we set the yVelocity = -unitSize we'll move down. But this will be done within a function bellow
let yVelocity = 0;
// Setting the coordinates of our food, for now undeclared. But down in the code they will be generated randomly.
let foodX;
let foodY;
// Setting the score to 0
let score = 0;

// Setting up the snake, it will be an array of objects. Each object will have a x,y coordinate. Last one is the tail.
// We'll create 5 body parts. Each time it eats a food, it'll increase by 1. But this will also be done inside a function bellow.
let snake = [
  //   10px to the right of the tail
  { x: unitSize * 4, y: 0 },
  //   75px to the right of the tail
  { x: unitSize * 3, y: 0 },
  //   50px to the right of the tail
  { x: unitSize * 2, y: 0 },
  //   25px to the right of the tail
  { x: unitSize, y: 0 },
  //   the tail, being set in the top left corner
  { x: 0, y: 0 },
];

// Adding a eventListener to our window to listen for key events, and passing in a function for changing the direction
window.addEventListener("keydown", changeDirection);
// Adding a click event, for restarting the game when we click the resetBtn
resetBtn.addEventListener("click", resetGame);

//! Invoking the function required to start the game
gameStart();

//! Declaring all the functions that will be needed

// Function for starting the game
function gameStart() {
  running = true;
  scoreText.textContent = score;

  // invoking the createFood function
  createFood();
  // invoking the drawFood function
  drawFood();
  // invoking the nextTick function
  nextTick();
}

// The nextTick function is what we want to happend every round everytime we eat the fruit, a new one should appear
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      //The nextTick function means, if our game currently isn't running that means the game is over!
      nextTick();
    }, 125); //miliseconds wait after all of the functions above are invoked, basically the speed of the snake and how fast the food apears
  }
  // Adding a else statement for if we hit a wall or a part of the snake's body, then we want the game to be over
  else {
    displayGameOver();
  }
}
// The clearBoard function is in charge of repainting the board
function clearBoard() {
  // clearing the board
  ctx.fillStyle = boardBackground;
  // setting our rectangle in the top left corner,  first two arguments are coordinates, second two are the width and height of the arguments
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
// The createFood function will find a random place within our gameBoard to place a food item
function createFood() {
  // Creating a inner function with two parameters
  function randomFood(min, max) {
    // creating a constant with a random number, using the math method to calculate. To acurately place the apple in the 0 position (top left corner) we will divide by the unitSize, and then multiply everything with the unitSize again
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize; //
    //   The code above means, divide our gameBoard width by 25px each time we eat the food, and place the next food item in a random place on the gameBoard
    return randNum;
  }

  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}

// The drawFood function will paint the food within our gameBoard
function drawFood() {
  // setting the food color
  ctx.fillStyle = foodColor;
  //   creating a rectangle for the food, it takes two coordinates x,y and the third & fourth argument is the size that those coordinates will be, which is 25px (the unitSize)
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

// The moveSnake function is for moving the snake around our gameBoard
function moveSnake() {
  // to move the snake we're going to create a new head of the snake in the direction that we are moving and then we'll delete the tail

  // The head contains a set of objects on our x coordinates and xVelocity (which means if it's positive we move right, if it's a negative we move left) same goes for the y coordinate, if it's positive value we move up, and if it's a negative value we move down
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

  // Adding a if statement for eliminating the tail after each movement
  // Within this if statement we'll check to see if the food was eaten
  // If the head of the food, and the snake are overlaping then the snake has eaten the apple
  if (snake[0].x == foodX && snake[0].y == foodY) {
    // If the food was eaten, add +1 on the player score
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    // This will remove our tail each time we move
    snake.pop();
  }

  // To add this constant to our snake, we do the following
  snake.unshift(head);
}
// The drawSnake function will paint the snake within our gameBoard
function drawSnake() {
  // giving the snake a color
  ctx.fillStyle = snakeColor;
  // putting a border on each snake body element
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    // for every snake part, we'll begin painting where that snake part is on the x axis and the y axis
    // first two are coordinates, second two are the size of the x,y coordinates
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
// The changeDirection function will determine which key we press and then move the snake in that direction
// This function is holding one event
function changeDirection(event) {
  const keyPressed = event.keyCode;

  // Storing the keys
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  //! Storing the values from above in constant boolean variables

  // We'll write condition, is the yVelocity of our snake equal to the negative unitSize (unitSize is 25px)
  // If the yVelocity of the snake is -25px that means we're moving up
  const goingUp = yVelocity == -unitSize;
  // If the yVelocity of the snake is +25px that means we're moving down
  const goingDown = yVelocity == unitSize;
  // If the xVelocity is equal to positive unitSize (+25px), then we're moving right
  const goingRight = xVelocity == unitSize;
  // If the xVelocity is equal to negative unitSize (-25px), then we're moving left
  const goingLeft = xVelocity == -unitSize;

  // writing a switch statement that will examin true, against many matching cases
  switch (true) {
    // If we're going left, we can continue going left, or up or down. But not turn right
    case keyPressed == LEFT && !goingRight:
      // -25px on x axis, meaning we're going left
      xVelocity = -unitSize;
      yVelocity = 0;
      break;

    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      // -25px on y axis, meaning we're going up
      yVelocity = -unitSize;
      break;

    case keyPressed == RIGHT && !goingLeft:
      // +25px on x axis, meaning we're going right
      xVelocity = unitSize;
      yVelocity = 0;
      break;

    case keyPressed == DOWN && !goingUp:
      // +25px on y axis, meaning we're going down
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
// The checkGameOver function will check if the game is over
function checkGameOver() {
  // if we  hit the wall or a part of our body then GAME OVER

  switch (true) {
    // This bellow means we went over the left border
    case snake[0].x < 0:
      // If the above is true, then game is over
      running = false;
      break;

    // This bellow means we went over the right border
    case snake[0].x >= gameWidth:
      running = false;
      break;
    // This bellow means we went over the top border
    case snake[0].y < 0:
      running = false;
      break;

    // This bellow means we went over the bottom border
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }

  // This bellow checks if we hit any body parts of the snake, if we do hit a body part then Game Over
  // we're starting at 1, meaning if we hit any body part after the head
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
// The displayGameOver function will be invoked when we hit a wall, or part of the body snake
function displayGameOver() {
  // taking the context and applying some styles
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  running = false;
}
// The resetGame function does as it's described with the name
function resetGame() {
  // selecting the score
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;

  // We want our snake to be re-created after we reset the game
  snake = [
    //   10px to the right of the tail
    { x: unitSize * 4, y: 0 },
    //   75px to the right of the tail
    { x: unitSize * 3, y: 0 },
    //   50px to the right of the tail
    { x: unitSize * 2, y: 0 },
    //   25px to the right of the tail
    { x: unitSize, y: 0 },
    //   the tail, being set in the top left corner
    { x: 0, y: 0 },
  ];

  // And finally invoking the gameStart() function
  gameStart();
}
