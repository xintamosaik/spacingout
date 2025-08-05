const FPS = 60;

const canvas = window.space;

const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d", { alpha: false });
// Set the "actual" size of the canvas
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
// Scale the context to ensure correct drawing operations
ctx.scale(dpr, dpr);
// Set the "drawn" size of the canvas
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

const ship = {
  x: 50,
  y: 50,
  angle: 0,
  acceleration: {
    max: 10,
    x: 0,
    y: 0,
  },
  tip: {
    x: 0,
    y: 0,
  },
  wings: {
    left: {
      x: 0,
      y: 0,
    },
    right: {
      x: 0,
      y: 0,
    },
  },
};

const STEP = 1000 / FPS;
let last = STEP;
function animate(timestamp) {
  if (timestamp > last + STEP) {
    last = timestamp;
    if (right) {
      if (ship.angle <= 0) ship.angle = 360;
      ship.angle -= 3;
    }
    if (left) {
      if (ship.angle >= 360) ship.angle = 0;
      ship.angle += 3;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radiansRight = ((ship.angle + 135) * Math.PI) / 180;
    ship.wings.right.x = 20 * Math.sin(radiansRight) + ship.x;
    ship.wings.right.y = 20 * Math.cos(radiansRight) + ship.y;

    const radiansLeft = ((ship.angle + 225) * Math.PI) / 180;
    ship.wings.left.x = 20 * Math.sin(radiansLeft) + ship.x;
    ship.wings.left.y = 20 * Math.cos(radiansLeft) + ship.y;

    /**
     * Used for the tip, acceleration and possibly projectiles
     */
    const radiansTip = (ship.angle * Math.PI) / 180;
    const sinTip = Math.sin(radiansTip);
    const cosTip = Math.cos(radiansTip);

    ship.tip.x = 40 * sinTip + ship.x;
    ship.tip.y = 40 * cosTip + ship.y;

    if (up) {
      ship.acceleration.x += sinTip;
      ship.acceleration.y += cosTip;
    }
    if (down) {
      ship.acceleration.x -= sinTip / 3;
      ship.acceleration.y -= cosTip / 3;
    }
    if (ship.acceleration.x >= ship.acceleration.max)
      ship.acceleration.x = ship.acceleration.max;
    if (ship.acceleration.x <= -ship.acceleration.max)
      ship.acceleration.x = -ship.acceleration.max;
    if (ship.acceleration.y >= ship.acceleration.max)
      ship.acceleration.y = ship.acceleration.max;
    if (ship.acceleration.y <= -ship.acceleration.max)
      ship.acceleration.y = -ship.acceleration.max;

    if (ship.y > canvas.scrollHeight) ship.y = 0;
    if (ship.x > canvas.scrollWidth) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.scrollHeight;
    if (ship.x < 0) ship.x = canvas.scrollWidth;

    ship.x += ship.acceleration.x;
    ship.y += ship.acceleration.y;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(ship.wings.left.x, ship.wings.left.y);
    ctx.lineTo(ship.wings.right.x, ship.wings.right.y);
    ctx.lineTo(ship.tip.x, ship.tip.y);
    ctx.lineTo(ship.wings.left.x, ship.wings.left.y);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

let up = false;
let left = false;
let right = false;
let down = false;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      up = true;
      break;
    case "ArrowDown":
      down = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowRight":
      right = true;
      break;

    default:
      console.log(event.key);
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      up = false;
      break;
    case "ArrowDown":
      down = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowRight":
      right = false;
      break;

    default:
      console.log(event.key);
  }
});
