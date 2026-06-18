let t1 = 0;
let t2 = 0;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 80);
  noStroke();
}

function draw() {
  background(220, 50, 5);
  blendMode(ADD);

  for (let band = 0; band < 3; band++) {
    for (let x = 0; x < width; x += 6) {
      let peak   = map(noise(x * 0.004, band * 3, t1), 0, 1, height * 0.15, height * 0.65);
      let spread = map(noise(x * 0.003, band * 7 + 50, t1 * 0.7), 0, 1, 50, 180);
      let hue    = map(noise(x * 0.005, band * 7 + 100, t2), 0, 1, 120, 200);

      for (let y = 0; y < height; y += 8) {
        let d  = abs(y - peak);
        let br = exp(-d * d / (2 * spread * spread)) * 60;
        if (br > 0.5) {
          fill(hue, 40, br, br);
          rect(x, y, 8, 8);
        }
      }
    }
  }

  blendMode(BLEND);
  t1 += 0.03;
  t2 += 0.04;

  // Hint text — visible for 20 seconds, fades out in the last 2 seconds
  let elapsed = millis();
  if (elapsed < 20000) {
    let alpha = elapsed > 18000 ? map(elapsed, 18000, 20000, 200, 0) : 200;
    noStroke();
    fill(255, alpha);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("generative animation — sit back and enjoy", width / 2, height - 24);
  }
}
