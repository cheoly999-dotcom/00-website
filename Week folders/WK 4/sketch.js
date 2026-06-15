let rad=0;
rad2=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#0e005e');

  //first layer 
  for (let x =0; x<width; x+=200) {
    for (let y =0; y<height; y+=200) {

      push();
      translate(x,y);
      rotate(rad);
      noStroke();
      fill('#e500d2');
      scale(0.1);
      beginShape();

      //shape 1
      vertex(538.71,-213.76);
      bezierVertex(248.31,-641.36,-333.29,-494.26,-213.79,-234.26);
      bezierVertex(-94.29,25.74,-526.79,-113.26,-506.29,370.74);
      bezierVertex(-485.79,854.74,653.21,686.74,219.71,260.24);
      bezierVertex(-213.79,-166.26,901.71,320.74,538.71,-213.76);
      
      endShape();
      pop();
    }
  }
 

  //second layer
  for (let x=0; x<width+1000; x+=180) {
    for (let y=0; y<height+2000; y+=180) {

    push(); 
    translate(x, y);
    rotate(rad2);
    noStroke();
    fill('#A6EA57');
    scale(0.6);
    
    beginShape();
    vertex(47.5, -248);
    vertex(-206, 0);
    vertex(47.5, 70);
    vertex(47.5, 342.5);
    vertex(368.5, 70);
    vertex(74.5, 24.5);
    endShape(CLOSE); 
    
    pop();
    }
  }
  rad+=PI/180;
  rad2+=PI/180;
}