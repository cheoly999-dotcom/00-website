let chars = [];
let inputWord = "";
let state = "input";
let cursorVisible = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (state === "effect") buildChars();
}

function draw() {
  background(255);

  if (state === "input") {
    drawInputScreen();
  } else {
    drawEffectScreen();
  }
}

function drawInputScreen() {
  if (frameCount % 28 === 0) cursorVisible = !cursorVisible;

  noFill();
  stroke(0);
  strokeWeight(1.5);
  let barW = min(700, width * 0.8);
  rect(width / 2 - barW / 2, height / 2 - 40, barW, 80, 4);

  fill(0);
  noStroke();
  textSize(50);
  textAlign(CENTER, CENTER);
  text(inputWord + (cursorVisible ? "|" : " "), width / 2, height / 2);
}

function drawEffectScreen() {
  for (let c of chars) {
    c.update();
    c.display();
  }

  fill(180);
  noStroke();
  textSize(16);
  textAlign(CENTER, BOTTOM);
  text("press enter to restart", width / 2, height - 30);
}

function keyPressed() {
  if (state === "input") {
    if (keyCode === ENTER && inputWord.length > 0) {
      buildChars();
      state = "effect";
    } else if (keyCode === BACKSPACE) {
      inputWord = inputWord.slice(0, -1);
    }
  } else {
    if (keyCode === ENTER || keyCode === ESCAPE) {
      state = "input";
      inputWord = "";
      chars = [];
    }
  }
}

function keyTyped() {
  if (state === "input") {
    inputWord += key.toUpperCase();
  }
}

function buildChars() {
  chars = [];

  let maxWidth = width * 0.85;
  let baseSize = 350;
  let spacing = baseSize * 0.65;
	
  if ((inputWord.length - 1) * spacing > maxWidth) {
    spacing = maxWidth / (inputWord.length - 1);
    baseSize = spacing / 0.65;
  }

  let startX = width / 2 - (inputWord.length - 1) * spacing / 2;

  for (let i = 0; i < inputWord.length; i++) {
    chars.push(new RubberChar(startX + i * spacing, height / 2, inputWord[i], baseSize));
  }
}

class RubberChar {

  constructor(x, y, ch, size) {
    this.homeX = x;
    this.homeY = y;
    this.x = x;
    this.y = y;
    this.ch = ch;
    this.baseSize = size;
    this.vx = 0;
    this.vy = 0;
    this.spring = 0.06;
    this.damping = 0.75;
  }

  update() {
    if (mouseIsPressed) {
      let d = dist(mouseX, mouseY, this.x, this.y);
      let influenceRadius = 300;

      if (d < influenceRadius && d > 0) {
        let force = map(d, 0, influenceRadius, 20, 0);
        let angle = atan2(mouseY - this.y, mouseX - this.x);
        this.vx += cos(angle) * force;
        this.vy += sin(angle) * force;
      }
    }

    this.vx += (this.homeX - this.x) * this.spring;
    this.vy += (this.homeY - this.y) * this.spring;

    this.vx *= this.damping;
    this.vy *= this.damping;

    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    let dx = this.x - this.homeX;
    let dy = this.y - this.homeY;
    let displacement = dist(0, 0, dx, dy);
    let angle = atan2(dy, dx);

    let stretch = map(displacement, 0, 220, 1, 4.0);
    let squeeze = map(displacement, 0, 220, 1, 0.2);

    let r = 0;
    let g = map(displacement, 0, 220, 0, 191);
    let b = map(displacement, 0, 220, 0, 255);

    push();
    translate(this.x, this.y);
    rotate(angle);
    scale(stretch, squeeze);
    fill(r, g, b);
    noStroke();
    textSize(this.baseSize);
    textAlign(CENTER, CENTER);
    text(this.ch, 0, 0);
    pop();
  }
}
