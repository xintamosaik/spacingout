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
ctx.strokeStyle = "yellow";

const ship_size = 32;
const ship = ctx.createImageData(ship_size, ship_size);
let acceleration = 0;
let angle = 0;
let x = 100;
let y = 100;
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
    if (left) {
      if (angle <= 0) angle = 360;
      angle--;
    }
    if (right) {
      if (angle >= 360) angle = 0;
      angle++;
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
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    newX = 100 * sin + 50;
    newY = 100 * cos + 50;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    // ctx.moveTo(x - 10, y);
    //ctx.lineTo(x, y + 30);
    //ctx.lineTo(x + 10, y);
    ctx.lineTo(newX, newY);
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
