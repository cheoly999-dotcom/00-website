let handPose;
let video;
let hands = [];
let icingStrokes = [];
let selectedColor = '#FFB3C6';
let prevTip = null;
let phase = 'icing';
let bites = [];
let prevPinch = false;

const BG = '#FFF8E7';
let paletteColors = ['#FFB3C6', '#B3D4FF', '#FFE566', '#FFFFFF', '#8B4513'];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(BG);

  drawCookie();

  for (let i = 1; i < icingStrokes.length; i++) {
    let prev = icingStrokes[i - 1];
    let curr = icingStrokes[i];
    if (prev.col === curr.col && !curr.newStroke) {
      stroke(curr.col);
      strokeWeight(50);
      strokeCap(ROUND);
      noFill();
      line(prev.x, prev.y, curr.x, curr.y);
    }
  }

  fill(BG);
  noStroke();
  for (let b of bites) {
    circle(b.x, b.y, b.size);
  }

  drawHint();

  if (phase === 'icing') {
    drawPalette();

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      let tip = hand.keypoints[8];
      let tx = map(tip.x, 0, video.width, width, 0);
      let ty = map(tip.y, 0, video.height, 0, height);

      checkPalette(tx, ty);

      if (isInsideCookie(tx, ty)) {
        let newStroke = false;
        if (prevTip && dist(tx, ty, prevTip.x, prevTip.y) > 40) {
          newStroke = true;
        }
        icingStrokes.push({ x: tx, y: ty, col: selectedColor, newStroke: newStroke });
        prevTip = { x: tx, y: ty };
      } else {
        prevTip = null;
      }

      fill(255, 0, 0, 180);
      noStroke();
      circle(tx, ty, 20);
    }

    if (icingStrokes.length > 0) {
      fill('#C4813A');
      noStroke();
      rect(width - 150, height - 70, 120, 45, 20);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(18);
      text('DONE ✓', width - 90, height - 48);
    }
  }

  if (phase === 'eating') {
    fill('#C4813A');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text('Pinch to bite!', width / 2, height - 40);

    let pinchingThisFrame = false;

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      let indexTip = hand.keypoints[8];
      let thumbTip  = hand.keypoints[4];

      let ix = map(indexTip.x, 0, video.width, width, 0);
      let iy = map(indexTip.y, 0, video.height, 0, height);
      let thx = map(thumbTip.x, 0, video.width, width, 0);
      let thy = map(thumbTip.y, 0, video.height, 0, height);

      let pinchDist = dist(ix, iy, thx, thy);
      let mx = (ix + thx) / 2;
      let my = (iy + thy) / 2;
      let isPinching = pinchDist < 60;

      if (isPinching && !prevPinch && isInsideCookie(mx, my)) {
        bites.push({ x: mx, y: my, size: random(140, 300) });
      }
      pinchingThisFrame = pinchingThisFrame || isPinching;

      fill(255, 0, 0, 180);
      noStroke();
      circle(ix, iy, 20);
      circle(thx, thy, 20);

      if (isPinching) {
        fill(255, 200, 0, 200);
        noStroke();
        circle(mx, my, 28);
      }
    }

    prevPinch = pinchingThisFrame;
  }
}

function isInsideCookie(tx, ty) {
  let cx = width / 2;
  let cy = height / 2;
  
  let lx = (tx - cx) / 2.5;
  let ly = (ty - cy) / 2.5;

  if (dist(lx, ly, 0, -60) < 35) return true;
  // body area
  if (dist(lx, ly, 0, 20) < 40) return true;
  // left arm
  if (dist(lx, ly, -70, -10) < 25) return true;
  // right arm
  if (dist(lx, ly, 70, -10) < 25) return true;
  // left leg
  if (dist(lx, ly, -35, 85) < 25) return true;
  // right leg
  if (dist(lx, ly, 35, 85) < 25) return true;

  return false;
}

function checkPalette(tx, ty) {
  let px = 60;
  let startY = height / 2 - (paletteColors.length * 60) / 2;
  for (let i = 0; i < paletteColors.length; i++) {
    let py = startY + i * 60;
    if (dist(tx, ty, px, py) < 25) {
      selectedColor = paletteColors[i];
    }
  }
}

function drawCookie() {
  let cx = width / 2;
  let cy = height / 2;
  let s = 2.5 
  push();
  translate(cx, cy);
  scale(s);
  fill(180, 130, 80, 60);
  noStroke();
  drawGinger(5, 5);
  fill('#C4813A');
  noStroke();
  drawGinger(0, 0);
  pop();
}

function drawGinger(ox, oy) {
  push();
  translate(ox, oy);
  beginShape();
  vertex(0, -90);
  bezierVertex(40, -90, 60, -60, 50, -30);
  bezierVertex(80, -40, 110, -20, 100, 10);
  bezierVertex(90, 30, 70, 20, 50, 10);
  bezierVertex(60, 40, 70, 90, 50, 110);
  bezierVertex(30, 130, 10, 110, 20, 80);
  vertex(0, 70);
  vertex(-20, 80);
  bezierVertex(-10, 110, -30, 130, -50, 110);
  bezierVertex(-70, 90, -60, 40, -50, 10);
  bezierVertex(-70, 20, -90, 30, -100, 10);
  bezierVertex(-110, -20, -80, -40, -50, -30);
  bezierVertex(-60, -60, -40, -90, 0, -90);
  endShape(CLOSE);
  pop();
}

function drawPalette() {
  let px = 60;
  let startY = height / 2 - (paletteColors.length * 60) / 2;
  for (let i = 0; i < paletteColors.length; i++) {
    let py = startY + i * 60;
    fill(0, 0, 0, 20);
    noStroke();
    ellipse(px + 3, py + 3, 44, 44);
    fill(paletteColors[i]);
    stroke(paletteColors[i] === selectedColor ? '#FF0000' : '#C0A080');
    strokeWeight(paletteColors[i] === selectedColor ? 4 : 2);
    ellipse(px, py, 40, 40);
  }
}

function mousePressed() {
  if (phase === 'icing' && icingStrokes.length > 0) {
    if (mouseX > width - 150 && mouseX < width - 30 &&
        mouseY > height - 70 && mouseY < height - 25) {
      phase = 'eating';
    }
  }
}


function gotHands(results) {
  hands = results;
}

function drawHint() {
  let elapsed = millis();
  if (elapsed >= 20000 || phase === 'eating') return;
  let alpha = elapsed > 18000 ? map(elapsed, 18000, 20000, 200, 0) : 200;
  noStroke();
  fill(80, alpha);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text("raise your index finger to ice the cookie — pick colors from the left palette", width / 2, height - 24);
}