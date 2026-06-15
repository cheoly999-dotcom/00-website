let bgColors = ['#6B3E3E', '#4B2E83', '#1E4D5C', '#5A3D2B'];
let starColors = ['#D9D4FF', '#FFE9A8', '#B8F2E6', '#FFD6E0'];
let outlineColors = ['#C77DFF', '#8BE28B', '#FFB4A2', '#80CFFF'];
let borderColors = ['#8BE28B', '#FFD166', '#A0C4FF', '#FF99C8'];

let currentBg;
let currentStar;
let currentOutline;
let currentBorder;

let starOffsetX = [];
let starOffsetY = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  chooseColors();
  makeOffsets();
}

function draw() {
  background(240);

  let spacingX = 120;
  let spacingY = 200;

  let count = 0;

  for (let x = spacingX / 2; x < width + spacingX; x += spacingX) {
    for (let y = spacingY / 2; y < height + spacingY; y += spacingY) {
      drawPattern(x, y, count);
      count++;
    }
  }
}

function drawPattern(x, y, count) {
  push();
  translate(x, y);

  // ellipse
  fill(currentBg);
  stroke(currentBorder);
  strokeWeight(5);
  ellipse(0, 0, 120, 200);

  // star
  fill(currentStar);
  stroke(currentOutline);
  strokeWeight(3);

  drawStar(starOffsetX[count], starOffsetY[count], 58, 24);

  pop();
}

function drawStar(x, y, w, h) {
  beginShape();

  vertex(x, y - h);
  vertex(x + w * 0.2, y - h * 0.25);
  vertex(x + w, y);
  vertex(x + w * 0.2, y + h * 0.25);
  vertex(x, y + h);
  vertex(x - w * 0.2, y + h * 0.25);
  vertex(x - w, y);
  vertex(x - w * 0.2, y - h * 0.25);

  endShape(CLOSE);
}

function chooseColors() {
  currentBg = random(bgColors);
  currentStar = random(starColors);
  currentOutline = random(outlineColors);
  currentBorder = random(borderColors);
}

function makeOffsets() {
  starOffsetX = [];
  starOffsetY = [];

  let spacingX = 120;
  let spacingY = 200;

  for (let x = spacingX / 2; x < width + spacingX; x += spacingX) {
    for (let y = spacingY / 2; y < height + spacingY; y += spacingY) {
      starOffsetX.push(random(-20, 20));
      starOffsetY.push(random(-40, 40));
    }
  }
}

function mousePressed() {
  chooseColors();
  makeOffsets();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  makeOffsets();
}