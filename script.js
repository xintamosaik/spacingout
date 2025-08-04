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
ctx.beginPath();

ctx.moveTo(100, 100);
ctx.lineTo(110, 130);
ctx.lineTo(120, 100);
ctx.stroke();

const ship_size = 32;
const ship = ctx.createImageData(ship_size, ship_size);

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
  ship.data[i + 1] = material ? 0 : 0; // G value
  ship.data[i + 2] = material ? 255 : 0; // B value
  ship.data[i + 3] = 255; // A value
}
const STEP = 1000 / FPS;
let last = STEP;
ctx.putImageData(ship, 20, 20);
function animate(timestamp) {
  if (timestamp > last + STEP) {
    console.log("step");
    last = timestamp;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
