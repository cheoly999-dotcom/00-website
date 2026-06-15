let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/dqwQUDP_x/';
let video;
let label = "";
let isModelReady = false;
let isClassifying = false;
let intensity = 0;
let drawW, drawH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', {
    flipped: true,
  }, () => {
    isModelReady = true;
  });
}

function draw() {
  background(0);

  if (isModelReady && !isClassifying && video && video.elt.readyState === 4) {
    isClassifying = true;
    classifier.classify(video, gotResult);
  }
	
  let vidRatio = 320 / 240;
  let canvasRatio = width / height;
  if (canvasRatio > vidRatio) {
    drawW = width;
    drawH = width / vidRatio;
  } else {
    drawW = height * vidRatio;
    drawH = height;
  }

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

  pop();

  drawChromaShift();
  drawNoise();

  if (label === 'close') {
    intensity = lerp(intensity, 1.0, 0.05);
  } else if (label === 'mid') {
    intensity = lerp(intensity, 0.5, 0.05);
  } else {
    intensity = lerp(intensity, 0.0, 0.05);
  }

  if (intensity > 0.1) {
    let lineSpacing = floor(lerp(20, 6, intensity)); 
    let lineAlpha = lerp(30, 120, intensity);
    stroke(0, 255, 255, lineAlpha); 
    strokeWeight(1);
    for (let y = 0; y < height; y += lineSpacing) {
      line(0, y, width, y);
    }
  }

  if (intensity > 0.6) {
    noFill();
    strokeWeight(2);

    for (let i = 0; i < floor(intensity * 4); i++) {
      let rx = random(width);
      let ry = random(height);
      let rw = random(20, 200);
      let rh = random(10, 80);
      stroke(0, 255, 255, random(80, 200));
      rect(rx, ry, rw, rh);
    }

    let bSize = 40;
    let bX = width / 2 - 150;
    let bY = height / 2 - 100;
    stroke(255, 0, 255, lerp(0, 200, intensity));
    strokeWeight(2);

    line(bX, bY, bX + bSize, bY);
    line(bX, bY, bX, bY + bSize);

    line(bX + 300, bY, bX + 300 - bSize, bY);
    line(bX + 300, bY, bX + 300, bY + bSize);

    line(bX, bY + 200, bX + bSize, bY + 200);
    line(bX, bY + 200, bX, bY + 200 - bSize);

    line(bX + 300, bY + 200, bX + 300 - bSize, bY + 200);
    line(bX + 300, bY + 200, bX + 300, bY + 200 - bSize);

    if (random() > 0.7) {
      let barY = random(height);
      let barH = random(5, 20);
      fill(255, 0, 255, random(30, 80));
      noStroke();
      rect(0, barY, width, barH);
    }
  }
	
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(30);
  fill(255, 255, 255, map(intensity, 0, 0.3, 180, 0));  
  text('move closer to activate', width / 2, height - 10);
}

function gotResult(results) {
  if (results && results[0]) {
    if (results[0].probability < 0.65) {
      label = "far";
    } else {
      label = results[0].label.toLowerCase().trim();
    }
  }
  isClassifying = false;
}

function drawNoise() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    if (random() < intensity * 0.1) {  
      let n = random(255);
      pixels[i] = n;
      pixels[i+1] = n;
      pixels[i+2] = n;
      pixels[i+3] = 255;
    }
  }
  updatePixels();
}

function drawChromaShift() {
  let shift = floor(lerp(0, 20, intensity));
  if (shift < 2) return;

  push();
  translate(width, 0);
  scale(-1, 1);
  
  tint(255, 0, 0, 100);
  image(video, (width - drawW) / 2 + shift, (height - drawH) / 2, drawW, drawH);
  
  tint(0, 0, 255, 100);
  image(video, (width - drawW) / 2 - shift, (height - drawH) / 2, drawW, drawH);
  
  noTint();
  pop();
}