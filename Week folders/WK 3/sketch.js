function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();

  // Scale and center the original 1000x1000 design to fit the window
  let s = min(windowWidth / 1000, windowHeight / 1000);
  translate((windowWidth - 1000 * s) / 2, (windowHeight - 1000 * s) / 2);
  scale(s);

  let joy = drawingContext.createRadialGradient(250,250,50,250,250,300);
  joy.addColorStop(0, '#FFF176');
  joy.addColorStop(1, '#FF8A65');
  drawingContext.fillStyle = joy;
  rect(0,0,500,500);

  fill('#FFD54F');
  ellipse(250,250,200);
  ellipse(250,250,140);
  ellipse(250,250,80);

  fill('#FFB300');
  ellipse(150,150,40);
  ellipse(350,150,40);
  ellipse(150,350,40);
  ellipse(350,350,40);

  let sad = drawingContext.createLinearGradient(500,0,500,500);
  sad.addColorStop(0, '#B3E5FC');
  sad.addColorStop(1, '#0D47A1');
  drawingContext.fillStyle = sad;
  rect(500,0,500,500);

  fill('#90CAF9');
  ellipse(750,200,120);
  ellipse(750,260,140);
  ellipse(750,330,160);
  ellipse(750,420,180);

  fill('#E3F2FD');
  ellipse(750,260,80);
  ellipse(750,330,90);

  let anger = drawingContext.createLinearGradient(0,500,500,1000);
  anger.addColorStop(0, '#FF5252');
  anger.addColorStop(1, '#7F0000');
  drawingContext.fillStyle = anger;
  rect(0,500,500,500);

  fill('#FF1744');
  triangle(50,900,100,600,150,900);
  triangle(120,900,170,600,220,900);
  triangle(190,900,240,600,290,900);
  triangle(260,900,310,600,360,900);
  triangle(330,900,380,600,430,900);

  fill('#FF5252');
  triangle(80,900,120,650,160,900);
  triangle(210,900,250,650,290,900);
  triangle(340,900,380,650,420,900);

  let fear = drawingContext.createRadialGradient(750,750,50,750,750,300);
  fear.addColorStop(0, '#9FA8DA');
  fear.addColorStop(1, '#000000');
  drawingContext.fillStyle = fear;
  rect(500,500,500,500);

  fill('#111111');
  beginShape();
  curveVertex(700,650);
  curveVertex(750,600);
  curveVertex(820,650);
  curveVertex(800,800);
  curveVertex(750,900);
  curveVertex(700,800);
  endShape();

  fill('#9FA8DA');
  ellipse(730,730,25);
  ellipse(790,730,25);

  fill('#9FA8DA');
  ellipse(760,800,20);
}