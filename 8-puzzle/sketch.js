let width, height;

let board;
let emptyPos;

let boardSize;
let cellSize;

let xOffset;
let yOffset;

let solved = false;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  createCanvas(width, height);
  resizeBoard();

  initializeBoard();
}

function draw() {
  noLoop();

  background("white");

  strokeWeight(cellSize * 0.085);

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(cellSize * 0.3);

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const screenX = xOffset + x * cellSize;
      const screenY = yOffset + y * cellSize;

      const number = board[y][x];

      if (number == 0) {
        fill("black");
      } else {
        fill("midnightblue");
      }

      stroke("black");
      rect(screenX, screenY, cellSize, cellSize);

      if (number == 0) {
        continue;
      }

      fill("white");
      noStroke();
      text(number, screenX, screenY, cellSize, cellSize);
    }
  }

  if (solved) {
    drawWinScreen();
  }
}

function drawWinScreen() {
  const popupWidth = cellSize * 2;
  const popupHeight = cellSize;

  const x = (width - popupWidth) / 2;
  const y = (height - popupHeight) / 2;

  noStroke();

  fill("blue");
  rect(x, y, popupWidth, popupHeight);

  fill("white");
  text("YOU WIN!!!", x, y, popupWidth, popupHeight);
}

function mouseClicked() {
  // screenX = xOffset + cellX * cellSize
  // <==> cellX = (screenX - xOffset) / cellSize
  // same for y

  const cellX = Math.floor((mouseX - xOffset) / cellSize);
  const cellY = Math.floor((mouseY - yOffset) / cellSize);

  if (
    cellX < 0 ||
    cellX > 2 ||
    cellY < 0 ||
    cellY > 2
  ) {
    return; 
  }

  moveTile(cellX, cellY);
}

function moveTile(x, y) {
  if (solved) return;
  checkSolved();
  
  const [emptyX, emptyY] = emptyPos;

  const xDiff = abs(x - emptyX);
  const yDiff = abs(y - emptyY);
  
  if (
    xDiff + yDiff != 1
  ) {
    return;
  }

  [board[y][x], board[emptyY][emptyX]] = [board[emptyY][emptyX], board[y][x]];
  emptyPos = [x, y];

  checkSolved();

  loop();
}

function checkSolved() {
  // i love js
  if (![[0, 0], [2, 0], [0, 2], [2, 2]].some(pos => pos[0] === emptyPos[0] && pos[1] === emptyPos[1])) {
    console.log("what.");
    return;
  }

  let previous = board[0][0];

  for (let i = 1; i < 9; i++) {
    const y = Math.floor(i / 3);
    const x = i - y * 3;

    const number = board[y][x];

    if (number == 0) {
      continue;
    }

    if (number - previous != 1) {
      return;
    }

    previous = number;
  }

  solved = true;
}

function initializeBoard() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  shuffleArray(numbers);

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const index = y * 3 + x;      

      const number = numbers[index];
      board[y][x] = number;

      if (number == 0) {
        emptyPos = [x, y];
      }
    }
  }
}

function resizeBoard() { 
  const shorterSide = width < height ? width : height;

  boardSize = shorterSide * 0.75;
  cellSize = boardSize / 3;

  xOffset = (width - boardSize) / 2;
  yOffset = (height - boardSize) / 2;
}

function windowResized() {
  width = window.innerWidth;
  height = window.innerHeight;

  resizeCanvas(width, height);
  resizeBoard();

  loop();
}

// helper functions

function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}
