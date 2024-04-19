export function lissajous(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  interface Bee {
    angleX: number;
    angleY: number;
    speedX: number;
    speedY: number;
    radius: number;
  }

  const bees: Bee[] = [];
  const numBees = 50;

  function initBee(): void {
    const bee = {
      angleX: Math.random() * Math.PI * 2,
      angleY: Math.random() * Math.PI * 2,
      speedX: Math.random() * 0.1 - 0.05,
      speedY: Math.random() * 0.1 - 0.05,
      radius: 100 + Math.random() * 100,
    };
    bees.push(bee);
  }

  function updateAndDrawBee(bee: Bee): void {
    const { speedX, speedY, radius } = bee;

    bee.angleX += speedX;
    bee.angleY += speedY;

    const x = Math.cos(bee.angleX) * radius;
    const y = Math.sin(bee.angleY) * radius;

    context.beginPath();
    context.arc(width / 2 + x, height / 2 + y, 2, 0, Math.PI * 2, false);
    context.fill();
  }

  for (let i = 0; i < numBees; i += 1) {
    initBee();
  }

  draw();

  function draw(): void {
    context.clearRect(0, 0, width, height);
    bees.forEach(updateAndDrawBee);
    requestAnimationFrame(draw);
  }
}
