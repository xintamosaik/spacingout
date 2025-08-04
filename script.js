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
ctx.fillStyle = "red";

const ship_size = 32;
const ship = ctx.createImageData(ship_size, ship_size);
let acceleration = 0;
let angle = 0;
let x = 100;
let y = 100;

let rightX = 0;
let rightY = 0;
let leftX = 0;
let leftY = 0;
let tipX = 0;
let tipY = 0;
for (let i = 0; i < ship.data.length; i += 4) {
  const normal = i ? i / 4 : 0;
  const pos = normal / ship_size;
  const floored = Math.floor(pos);
  const mod_hundred = normal % ship_size;
  const negative = ship_size - floored;
  const negative_half = negative / 2;
  const material =
    mod_hundred > negative_half && mod_hundred < ship_size - negative_half;

  ship.data[i + 0] = material ? 190 : 0; // R value
  ship.data[i + 1] = material ? 255 : 0; // G value
  ship.data[i + 2] = material ? 255 : 0; // B value
  ship.data[i + 3] = 255; // A value
}
const STEP = 1000 / FPS;
let last = STEP;
function animate(timestamp) {
  if (timestamp > last + STEP) {
    last = timestamp;
    // update
    if (up) {
      if (acceleration <= 100) acceleration++;
    }
    if (down) {
      if (acceleration >= 0) acceleration--;
    }
    if (right) {
      if (angle <= 0) angle = 360;
      angle -= 3;
    }
    if (left) {
      if (angle >= 360) angle = 0;
      angle += 3;
    }
    // ...___________...
    // ..A:::::|;;;;;B..
    // ...\:x::|;;x;/...
    // ....\:::o;;;/....
    // .....\::|;;/.....
    // ......\:|;/......
    // .......\|/.......
    // ........C........
    // .................
    //
    // |----- c = 20 --|...___
    // |...............B....|.
    // |............../.....|.
    // |............./......|.
    // |............/.......|.
    // |.........../........|.
    // |........../.........|.
    // |........./..........a = 20
    // |......../...........|.
    // |......./............|.
    // |....../.............|.
    // |...../..............|.
    // |..../...............|.
    // |.../................|.
    // |../.................|.
    // |./..................|.
    // |/.................._L_ angle = 45
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radiansRight = ((angle + 135) * Math.PI) / 180;
    const cosRight = Math.cos(radiansRight);
    const sinRight = Math.sin(radiansRight);
    rightX = 20 * sinRight + x;
    rightY = 20 * cosRight + y;

    const radiansLeft = ((angle + 225) * Math.PI) / 180;
    const cosLeft = Math.cos(radiansLeft);
    const sinLeft = Math.sin(radiansLeft);
    leftX = 20 * sinLeft + x;
    leftY = 20 * cosLeft + y;

    const radiansTip = (angle * Math.PI) / 180;
    const cosTip = Math.cos(radiansTip);
    const sinTip = Math.sin(radiansTip);
    tipX = 40 * sinTip + x;
    tipY = 40 * cosTip + y;

    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();

    ctx.strokeStyle = "magenta";
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    ctx.strokeStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(leftX, leftY);
    ctx.stroke();

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(leftX, leftY);
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
