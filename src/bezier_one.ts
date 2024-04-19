import type { Point } from './types';

export function bezierOne(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const p0 = {
    x: Math.random() * width,
    y: Math.random() * height,
  };
  const p1 = {
    x: Math.random() * width,
    y: Math.random() * height,
  };

  const p2 = {
    x: Math.random() * width,
    y: Math.random() * height,
  };

  const cp: Point = {
    x: p1.x * 2 - (p0.x + p2.x) / 2,
    y: p1.y * 2 - (p0.y + p2.y) / 2,
  };

  drawPoint(p0);
  drawPoint(p1);
  drawPoint(p2);
  drawPoint(cp);

  context.strokeStyle = 'lightgray';
  context.beginPath();
  context.moveTo(p0.x, p0.y);
  context.lineTo(cp.x, cp.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();

  context.strokeStyle = 'black';
  context.beginPath();
  context.moveTo(p0.x, p0.y);
  context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
  context.stroke();

  function drawPoint(p: Point): void {
    context.beginPath();
    context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
    context.fill();
  }
}
