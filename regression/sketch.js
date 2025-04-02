let width, height;

let x = [];
let y = [];

let degree = 1;

let slider;
let sliderPosition;
let sliderWidth;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  slider = createSlider(1, 20, 1);
  resizeSlider();

  createCanvas(width, height);
}

// drawing

function draw() {
  noLoop();

  background("#121212");

  drawCoordinateSystem();
  drawPoints();

  degree = slider.value();
  drawSliderText(degree);

  if (x.length <= 1) {
    return;
  }

  const weights = regression();
  drawPolynomial(weights);
}

function drawCoordinateSystem() {
  stroke("#EEE");
  strokeWeight(2);

  const centerX = width / 2;
  const centerY = height / 2;

  const left = [20, centerY];
  const right = [width - 20, centerY];
  const top = [centerX, 20];
  const bottom = [centerX, height - 20];

  // x axis
  line(left[0], left[1], right[0], right[1]);
  // arrows
  line(left[0], left[1], left[0] + 8, left[1] - 8);
  line(left[0], left[1], left[0] + 8, left[1] + 8);
  line(right[0], right[1], right[0] - 8, right[1] - 8);
  line(right[0], right[1], right[0] - 8, right[1] + 8);

  // y axis
  line(top[0], top[1], bottom[0], bottom[1]);
  // arrows
  line(top[0], top[1], top[0] - 8, top[1] + 8);
  line(top[0], top[1], top[0] + 8, top[1] + 8);
  line(bottom[0], bottom[1], bottom[0] - 8, bottom[1] - 8);
  line(bottom[0], bottom[1], bottom[0] + 8, bottom[1] - 8);
}

function drawPoints() {
  noStroke();
  fill("lightblue");

  for (let i = 0; i < x.length; i++) {
    const posX = x[i] * width;
    const posY = y[i] * height;

    circle(posX, posY, 10);
  }
}

function drawSliderText(degree) {
  noStroke();
  fill("white");
  textSize(20);

  text(degree, sliderPosition - 30, 37);
}

function drawPolynomial(weights) {
  stroke("red");

  let previousPoint = [];

  for (let xPos = 0; xPos < width; xPos++) {
    const xNorm = xPos / width;
    const yNorm = predict(xNorm, weights);
    const yPos = yNorm * height;

    if (previousPoint.length != 0) {
      line(previousPoint[0], previousPoint[1], xPos, yPos);
    }

    previousPoint = [xPos, yPos];
  }
}

// math

function regression() {
  const n = x.length;

  let poly_X = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(x[i], j));
    }
    poly_X.push(row);
  }

  poly_X = math.matrix(poly_X);

  const poly_X_T = math.transpose(poly_X);
  const poly_X_T_X = math.multiply(poly_X_T, poly_X);
  const poly_X_T_X_inv = math.inv(poly_X_T_X);
  const poly_X_T_y = math.multiply(poly_X_T, math.matrix(y));

  const w = math.multiply(poly_X_T_X_inv, poly_X_T_y);

  return w.toArray();
}

function predict(xValue, weights) {
  let result = 0;
  for (let i = 0; i < degree + 1; i++) {
    result += Math.pow(xValue, i) * weights[i];
  }

  return result;
}

function mean(list) {
  const sum = list.reduce((acc, num) => acc + num, 0);
  return sum / list.length;
}

// events

function mouseClicked() {
  if (
    mouseX > sliderPosition - 40 &&
    mouseX < sliderPosition + sliderWidth + 40 &&
    mouseY < 60
  ) {
    loop();
    return false;
  }

  const normalizedX = mouseX / width;
  const normalizedY = mouseY / height;

  x.push(normalizedX);
  y.push(normalizedY);

  loop();
}

function windowResized() {
  width = window.innerWidth;
  height = window.innerHeight;

  resizeCanvas(width, height);

  resizeSlider();

  loop();
}

function resizeSlider() {
  const availableWidth = width / 2 - 40;

  const minWidth = 100;
  const maxWidth = 500;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  sliderWidth = clamp(availableWidth, minWidth, maxWidth);

  const marginLeft = (availableWidth - sliderWidth) / 2;
  sliderPosition = width / 2 + 20 + marginLeft;

  slider.position(sliderPosition, 20);
  slider.size(sliderWidth);
}
