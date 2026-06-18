let vine = [];  

function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSB, 360, 100, 100, 100);
  background(255); // 흰색 배경
}

function mousePressed() {
  for (let i = 0; i < 10; i++) {           // 10번 반복
    vine.push(new Vine(mouseX, mouseY));  
  }
}

function draw() {
  background('#ffffff10');  // 트레일 이펙트
  for (let i = 0; i < vine.length; i++) {
    let v = vine[i];

    if (v.isDone()) {
      vine.splice(i, 1);
    } else {
      v.show();
      v.update();
    }
  }

  // Hint text — visible for 20 seconds, fades out in the last 2 seconds
  let elapsed = millis();
  if (elapsed < 20000) {
    let alpha = elapsed > 18000 ? map(elapsed, 18000, 20000, 180, 0) : 180;
    noStroke();
    fill(0, alpha);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("click anywhere to create rings", width / 2, height - 24);
  }
}


class Vine {


  constructor(x, y) {
    this.x = x;             
    this.y = y;             
    this.d = random(10, 200);             
    this.dx = random(10);
    this.dy = random(0);  
    this.hue = random([65, 75, 120, 0, 350]);   
  }

  
  show() {
    stroke(this.hue, 25, 85, 20);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.d, this.d * 0.5);
  }

 
  update() {
    this.px = this.x;       
    this.py = this.y;       

    this.x += this.dx;     
    this.y += this.dy;    

    
    this.dx += random(-0.20, 0.20);   
    this.dy += random(-0.01, 0.01);    
  }

  
  isDone() {
    if (this.x > width  ||  
        this.x < 0      ||  
        this.y > height ||  
        this.y < 0)          
      return true;           
    else
      return false;          
  }

}