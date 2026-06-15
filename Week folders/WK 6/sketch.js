let maxw = 60;
let effectRadius = 120;
let ellipse = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let cols = floor(width/maxw) + 1;
  let rows = floor(height/maxw) + 1;

  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      ellipse.push(new RotatingEllipse(i*maxw, j*maxw));
    }
  }
}

function draw() {
  background('#f64a00');
  
  for(let e of ellipse) {
    e.update();
    e.show();
  }
  
}

class RotatingEllipse {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = maxw;
    this.hue = 0;
    this.rad = 0;
  }
  
  show() {
    strokeWeight(2);
    stroke(this.hue, 255, 255);
    if (this.distance < effectRadius) {
      fill(255);
    } else {
      noFill();
    }
    
    push();
    translate(this.x, this.y);
    rotate(this.rad);
    arc(0, 0, this.w, this.w, PI, TWO_PI, CHORD);
    pop();   
  }
  
  update() {
    this.rad = atan2(mouseY-this.y, mouseX-this.x);

    this.distance = dist(this.x, this.y, mouseX, mouseY);
    let limitedDistance = constrain(this.distance, 0, effectRadius);
    this.w = map(limitedDistance, 0, effectRadius, 0, maxw);
    this.hue = map(limitedDistance, 0, effectRadius, 0, 360);

  }
}
