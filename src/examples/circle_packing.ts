interface Circle {
  x: number;
  y: number;
  radius: number;
}

export function circlePacking(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const circles: Circle[] = [];
  const maxCircles = 100;
  const maxRadius = 50;
  const minRadius = 10;

  function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function doesCircleOverlap(newCircle: Circle, circles: Circle[]): boolean {
    for (const circle of circles) {
      const dx = newCircle.x - circle.x;
      const dy = newCircle.y - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < newCircle.radius + circle.radius) {
        return true;
      }
    }
    return false;
  }

  function createRandomCircle(): Circle {
    let circle: Circle;
    let tries = 0;
    do {
      const radius = getRandom(minRadius, maxRadius);
      const x = getRandom(radius, canvas.width - radius);
      const y = getRandom(radius, canvas.height - radius);
      circle = { x, y, radius };
      tries++;
      if (tries > 1000) {
        break;
      }
    } while (doesCircleOverlap(circle, circles));
    return circle;
  }

  function drawCircle(circle: Circle): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  function packCircles(): void {
    for (let i = 0; i < maxCircles; i++) {
      const circle = createRandomCircle();
      if (!doesCircleOverlap(circle, circles)) {
        circles.push(circle);
        drawCircle(circle);
      }
    }
  }

  // Initialize the canvas and start packing circles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  packCircles();
}
