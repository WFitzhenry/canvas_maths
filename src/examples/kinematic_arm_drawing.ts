interface IArm {
  x: number;
  y: number;
  length: number;
  angle: number;
  parent: Arm | null;

  getEndX(): number;
  getEndY(): number;
  render(context: CanvasRenderingContext2D): void;
}

class Arm implements IArm {
  x: number;
  y: number;
  length: number;
  angle: number;
  parent: Arm | null;

  constructor(x: number, y: number, length: number, angle: number) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.parent = null;
  }

  static create(x: number, y: number, length: number, angle: number): Arm {
    return new Arm(x, y, length, angle);
  }

  getEndX(): number {
    let angle = this.angle;
    let parent = this.parent;
    while (parent !== null) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return this.x + Math.cos(angle) * this.length;
  }

  getEndY(): number {
    let angle = this.angle;
    let parent = this.parent;
    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return this.y + Math.sin(angle) * this.length;
  }

  render(context: CanvasRenderingContext2D): void {
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
}

export function kinematicArmDrawing(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
  if (!context) {
    throw new Error('Canvas context not available');
  }

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  let angle = 0;

  const arm = Arm.create(width / 2, height / 2, 100, 0);
  const arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 1.3);
  const arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 1.3);

  arm2.parent = arm;
  arm3.parent = arm2;
  context2.lineWidth = 0.25;

  function draw(): void {
    context2.beginPath();
    context2.moveTo(arm3.getEndX(), arm3.getEndY());

    context.clearRect(0, 0, width, height);
    arm.angle = Math.sin(angle) * 2.476;
    arm2.angle = Math.cos(angle * 0.502 + 2) * 2.92;
    arm3.angle = Math.sin(angle * 1.498 - 0.5) * 2.34;
    arm2.x = arm.getEndX();
    arm2.y = arm.getEndY();
    arm3.x = arm2.getEndX();
    arm3.y = arm2.getEndY();
    angle += 0.03;
    arm.render(context);
    arm2.render(context);
    arm3.render(context);

    context2.lineTo(arm3.getEndX(), arm3.getEndY());
    context2.stroke();

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

let animationFrameId: number | null = null;
export function cancelAnimationKinematicArmDrawing(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
