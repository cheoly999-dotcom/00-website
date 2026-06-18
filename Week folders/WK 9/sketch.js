let capture;
let prevFrame;
let dots = [];
let dotSize = 23;
let cols, rows;
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*".split('');

function setup() {
  let windowH = windowWidth * 240 / 320;
  createCanvas(windowWidth, windowH);
  noStroke();
  textAlign(CENTER, CENTER);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  prevFrame = capture.get(0, 0, capture.width, capture.height);
  cols = ceil(width / dotSize);
  rows = ceil(height / dotSize);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * dotSize;
      let y = j * dotSize;
      let c = getColor(x, y);
      let cdot = new Dot(x, y, c);
      dots.push(cdot);
    }
  }
}

function getColor(x, y) {
  let cx = floor(map(x, 0, width, 0, capture.width));
  let cy = floor(map(y, 0, height, 0, capture.height));
  let index = (cx + cy * capture.width) * 4;
  let r = capture.pixels[index];
  let g = capture.pixels[index + 1];
  let b = capture.pixels[index + 2];
  return color(r, g, b);
}

function draw() {
  background(0);
  capture.loadPixels();
  prevFrame.loadPixels();
  for (let cdot of dots) {
    cdot.show();
    cdot.update();
    if (cdot.isMoving()) {
      cdot.d = dotSize * 2;
      cdot.ch = random(chars);
    }
  }
  prevFrame = capture.get(0, 0, capture.width, capture.height);

  // Hint text — visible for 20 seconds, fades out in the last 2 seconds
  let elapsed = millis();
  if (elapsed < 20000) {
    let alpha = elapsed > 18000 ? map(elapsed, 18000, 20000, 200, 0) : 200;
    noStroke();
    fill(255, alpha);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("move in front of your camera to trigger effects", width / 2, height - 24);
  }
}

class Dot {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.d = dotSize / 2;
    this.c = c;
    this.ch = '.';
  }

  show() {
    fill(this.c);
    textSize(this.d);
    text(this.ch, this.x, this.y);
  }

  update() {
    this.c = getColor(this.x, this.y);
    if (this.d > dotSize / 2) {
      this.d--;
    } else {
      this.ch = '.';
    }
  }

  isMoving() {
    let cx = floor(map(this.x, 0, width, 0, capture.width));
    let cy = floor(map(this.y, 0, height, 0, capture.height));
    let index = (cx + cy * capture.width) * 4;
    let r = capture.pixels[index];
    let g = capture.pixels[index + 1];
    let b = capture.pixels[index + 2];
    let pr = prevFrame.pixels[index];
    let pg = prevFrame.pixels[index + 1];
    let pb = prevFrame.pixels[index + 2];
    let distance = dist(r, g, b, pr, pg, pb);
    return distance > 80;
  }
}
