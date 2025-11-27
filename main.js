const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const objects = [];
const gravity = 2;
const swipePoints = [];

// ------------------------
// CLASS FOR FALLING OBJECT
// ------------------------
class FallingObject {
  constructor() {
    this.x = Math.random() * (canvas.width - 30);
    this.y = -30;
    this.size = 30;
    this.speed = Math.random() * 3 + 2;
    this.cut = false;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  checkCut(swipe) {
    for (let i = 0; i < swipe.length; i++) {
      const p = swipe[i];
      if (
        p.x > this.x &&
        p.x < this.x + this.size &&
        p.y > this.y &&
        p.y < this.y + this.size
      ) {
        this.cut = true;
      }
    }
  }
}

// ---------------------
// SPAWN OBJECTS
// ---------------------
function spawnObject() {
  objects.push(new FallingObject());
}

// ---------------------
// MAIN GAME LOOP
// ---------------------
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw & update falling objects
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    obj.update();
    obj.draw();
    obj.checkCut(swipePoints);

    if (obj.cut || obj.y > canvas.height) {
      objects.splice(i, 1);
    }
  }

  // draw swipe trail
  drawSwipe();

  requestAnimationFrame(gameLoop);
}

// --------------------------
// DRAW SWIPE LINE
// --------------------------
function drawSwipe() {
  if (swipePoints.length < 2) return;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(swipePoints[0].x, swipePoints[0].y);

  for (let point of swipePoints) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();
}

// -----------------------------
// MOUSE INPUT
// -----------------------------
let isSwiping = false;

canvas.addEventListener("mousedown", () => {
  isSwiping = true;
  swipePoints.length = 0;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isSwiping) return;

  const rect = canvas.getBoundingClientRect();
  swipePoints.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  });

  if (swipePoints.length > 20) swipePoints.shift(); 
});

canvas.addEventListener("mouseup", () => {
  isSwiping = false;
  swipePoints.length = 0;
});

// ------------------------
// AUTO SPAWN OBJECTS
// ------------------------
setInterval(spawnObject, 800);

// Start game loop
gameLoop();
