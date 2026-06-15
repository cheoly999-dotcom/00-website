function setup() {
  createCanvas(1000, 1400);
}

function draw() {
  background (0);
  ellipseMode(CENTER);

  //1st circle
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(840,74,230);
  
  //2nd circle
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(173,700,107);

  //3rd circle
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(80,846,230);

  //4th circle
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(526,1119,276);

  //5th circle
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(641,1318,61);

  //__________________________

  //1st line
  stroke(255);
  strokeWeight(60);
  line(641,197,641,711);

  //2nd line
  stroke(255);
  strokeWeight(60);
  line(550,-26,550,292);

  //3rd line
  stroke(255);
  strokeWeight(60);
  line(400,319,400,705) 

  //4th line
  stroke(255);
  strokeWeight(60);
  line(202,81,202,541)

  //5th line
  stroke(255);
  strokeWeight(60);
  line(309,791,309,1066)

  //6th line
  stroke(255);
  strokeWeight(60);
  line(499,920,499,1104)

  //__________________________

  //1st dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(641,711,53);

  //2nd dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(550,292,53);

  //3rd dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(400,705,53);

  //4th dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(202,541,53);

  //5th dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(309,1066,53);

  //6th dot
  fill(0);
  stroke(255);
  strokeWeight(7);
  ellipse(499,1104,53); 

  //7th dot
  fill(0);
  stroke(255);
  strokeWeight(2);
  ellipse(641,1318,53);
  
}