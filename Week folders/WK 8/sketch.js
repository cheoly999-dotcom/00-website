let img;

let flapWidth = 10;
let range = 600;
let flaps = [];

let cols, rows;

function preload() {
  img = loadImage('galaxy.jpg');
}

function setup() {
  createCanvas(1000, 1000);
  noFill();

  cols = ceil(width/(flapWidth*1));
  rows = ceil(height/(flapWidth*1));

  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      let x = i*(flapWidth*1.8);
      let y = j*(flapWidth*1.8);
      let flap = new Flap(x, y);
      flaps.push(flap);
    }
  }
}

function starDist(cx, cy, px, py, points) {
  let dx = px - cx;
  let dy = py - cy;
  let angle = atan2(dy, dx);
  angle = ((angle % TWO_PI) + TWO_PI) % TWO_PI;  // safer wrap for all environments
  let slice = TWO_PI / points;
  let sectorAngle = angle % slice;
  let t = abs(sectorAngle / slice - 0.5) * 2;
  return lerp(range * 0.1, range, t);
}

function draw() {
  background(0);

  for(let flap of flaps) {
    flap.show();
    flap.update();
  }

  let grad = drawingContext.createRadialGradient(
    mouseX, mouseY, 0, 
    mouseX, mouseY, range*0.7
  ); 
  grad.addColorStop(0, 'rgba(0,0,0,0)');     
  grad.addColorStop(0.5, 'rgba(0,0,0,0)');    
  grad.addColorStop(1, 'rgba(0,0,0,0.85)'); 
  
  drawingContext.fillStyle = grad;
  drawingContext.fillRect(0, 0, width, height);

}

class Flap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 0;
    let ix = map(this.x, 0, width, 0, img.width);
    let iy = map(this.y, 0, height, 0, img.height);
    this.c = img.get(ix, iy);
  }

  show() {
    stroke(this.c);
    strokeWeight(6);
    push();
    translate(this.x, this.y);
    rotate(this.rad);
    line(0, 0, flapWidth, flapWidth);
    pop();
  }

  update() {
    let starR = starDist(mouseX, mouseY, this.x, this.y, 5); 
    let distance = dist(mouseX, mouseY, this.x, this.y); 
    this.rad = map(distance, 0, starR, 0, PI);
  
  }
}