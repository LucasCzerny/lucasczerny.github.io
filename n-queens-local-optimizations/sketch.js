let slider;
let sliderTextPos;

let width, height;
let boardSize, cellSize;
let topLeft;

let queenImage;
let queenPositions = [];
let threatsPerQueen = [];

let n = 8;

function preload() {
  queenImage = loadImage("queen.png")
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  createCanvas(width, height);

  slider = createSlider(4, 8, 8);
  slider.input(() => {
    loop();
  });

  resizeBoard();
  resizeSlider();
  generateQueenPositions();
}

function draw() {
  noLoop();
  
  background(240);

  const newN = slider.value();

  if (newN != n) {
    n = newN;

    resizeBoard();
    resizeSlider();
    generateQueenPositions();
  }

  noStroke()

  fill("black")
  textAlign(CENTER, CENTER);
  textSize(10 + 2 * n);
  textStyle(NORMAL);
  text(`n = ${n}`, sliderTextPos[0], sliderTextPos[1]);

  const colors = ["white", "green"];
  let colorIndex = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const xPos = topLeft[0] + x * cellSize;
      const yPos = topLeft[1] + y * cellSize;

      fill(colors[colorIndex])
      rect(xPos, yPos, cellSize, cellSize);

      if (queenAtPosition(x, y)) {
        image(queenImage, xPos, yPos, cellSize, cellSize);
      }

      colorIndex = (colorIndex + 1) % 2;
    }

    if (n % 2 == 0) {
      colorIndex = (colorIndex + 1) % 2;
    }
  }

  stroke("red");
  strokeWeight(5);

  for (let i = 0; i < n; i++) {
    const xPos = topLeft[0] + queenPositions[i][0] * cellSize + 0.5 * cellSize;
    const yPos = topLeft[1] + queenPositions[i][1] * cellSize + 0.5 * cellSize;

    for (let threat of threatsPerQueen[i]) {
      const otherXPos = topLeft[0] + queenPositions[threat][0] * cellSize + 0.5 * cellSize;
      const otherYPos = topLeft[1] + queenPositions[threat][1] * cellSize + 0.5 * cellSize;

      line(xPos, yPos, otherXPos, otherYPos);
    }
  }

  fill("black");
  noStroke();
  
  for (let i = 0; i < n; i++) {
    const xPos = topLeft[0] + queenPositions[i][0] * cellSize + 0.9 * cellSize;
    const yPos = topLeft[1] + queenPositions[i][1] * cellSize + 0.9 * cellSize;

    textStyle(BOLD);
    text(threatsPerQueen[i].length, xPos, yPos);
  }
}

function mouseClicked() {
  const bottomRight = [topLeft[0] + boardSize, topLeft[1] + boardSize];
  
  if (
    mouseX < topleft[0] ||
    mouseY < topLeft[1] ||
    mouseX > bottomRight[0] ||
    mouseY > bottomRight[1]
  ) {
    return;
  }
  
  
}

function resizeBoard() { 
  boardSize = height * (0.75 - (8 - n) * 0.1);
  cellSize = boardSize / n;
  topLeft = [
    (width - boardSize) / 2,
    (height - boardSize) / 2
  ];

  heightOffset = (height - boardSize) / 2;
}

function resizeSlider() {
  const sliderSize = height * 0.75;
  const sliderX = (width - sliderSize) / 2;
  const sliderY = height * 0.075;

  slider.position(sliderX, sliderY);
  slider.size(sliderSize);

  sliderTextPos = [sliderX + (sliderSize) / 2, sliderY - 10];
}

function generateQueenPositions() {
  queenPositions = [];
  threatsPerQueen = [];

  while (queenPositions.length < n) {
    let x = Math.floor(Math.random() * (n - 1));
    let y = Math.floor(Math.random() * (n - 1));

    if (!queenAtPosition(x, y)) {
      queenPositions.push([x, y])
    }
  }

  for (let i = 0; i < n; i++) {
    threatsPerQueen[i] = [];
    const position = queenPositions[i];

    for (let j = 0; j < n; j++) {
      if (i == j) continue;

      const otherPosition = queenPositions[j];
      
      if (
        position[0] == otherPosition[0] ||
        position[1] == otherPosition[1] ||
        position[0] - otherPosition[0] == position[1] - otherPosition[1] ||
        position[0] - otherPosition[0] == otherPosition[1] - position[1]
      ) {
         threatsPerQueen[i].push(j);
      }
    }
  }
}

function windowResized() {
  width = window.innerWidth;
  height = window.innerHeight;

  resizeCanvas(window.innerWidth, window.innerHeight);

  resizeBoard();
  resizeSlider();

  loop();
}

// Helper functions

function queenAtPosition(x, y) {
  return queenPositions.some(position => position[0] === x && position[1] === y);
}
