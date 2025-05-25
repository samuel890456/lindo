const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

let speed = 10;
let message = "Te quiero";
let color = "#ff69b4";
let fontSize = 16;
let drops = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).fill(1);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Control handlers
document.getElementById("speedControl").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});
document.getElementById("colorPicker").addEventListener("input", (e) => {
  color = e.target.value;
});
document.getElementById("textInput").addEventListener("input", (e) => {
  message = e.target.value || "❤️";
});

// Explosion effect
canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    const angle = (2 * Math.PI * i) / 20;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(e.clientX, e.clientY, dx, dy);
  }
});

function animateExplosion(x, y, dx, dy) {
  let life = 30;
  function frame() {
    if (life <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
    life--;
    requestAnimationFrame(frame);
  }
  frame();
}

// Matrix effect
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;

  drops.forEach((y, i) => {
    const text = message;
    ctx.fillText(text, i * fontSize, y * fontSize);
    drops[i] = y * fontSize > canvas.height || Math.random() > 0.95 ? 0 : y + 1;
  });
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    drawMatrix();
  }, 1000 / speed);
}

animate();
