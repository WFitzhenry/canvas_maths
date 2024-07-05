type Context = CanvasRenderingContext2D;

interface Arm {
  x: number;
  y: number;
  length: number;
  angle: number;
  parent: Arm | null;

  create(x: number, y: number, length: number, angle: number): Arm;
  init(x: number, y: number, length: number, angle: number): void;
  getEndX(): number;
  getEndY(): number;
  render(context: Context): void;
  pointAt(x: number, y: number): void;
  drag(x: number, y: number): void;
}

const Arm: Arm = {
  x: 0,
  y: 0,
  length: 100,
  angle: 0,
  parent: null,

  create(x: number, y: number, length: number, angle: number): Arm {
    const obj = Object.create(this);
    obj.init(x, y, length, angle);
    return obj;
  },

  init(x: number, y: number, length: number, angle: number): void {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
  },

  getEndX(): number {
    return this.x + Math.cos(this.angle) * this.length;
  },

  getEndY(): number {
    return this.y + Math.sin(this.angle) * this.length;
  },

  render(context: Context): void {
    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  },

  pointAt(x: number, y: number): void {
    const dx = x - this.x;
    const dy = y - this.y;
    this.angle = Math.atan2(dy, dx);
  },

  drag(x: number, y: number): void {
    this.pointAt(x, y);
    this.x = x - Math.cos(this.angle) * this.length;
    this.y = y - Math.sin(this.angle) * this.length;
    if (this.parent) {
      this.parent.drag(this.x, this.y);
    }
  },
};

interface IKSystem {
  x: number;
  y: number;
  arms: Arm[] | null;
  lastArm: Arm | null;

  create(x: number, y: number): IKSystem;
  init(x: number, y: number): void;
  addArm(length: number): void;
  render(context: CanvasRenderingContext2D): void;
  drag(x: number, y: number): void;
}

const IKSystem: IKSystem = {
  x: 0,
  y: 0,
  arms: [] || null,
  lastArm: null,

  create(x: number, y: number): IKSystem {
    const obj = Object.create(this);
    obj.init(x, y);
    return obj;
  },

  init(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.arms = [];
  },

  addArm(length: number): void {
    const arm = Arm.create(0, 0, length, 0);
    if (this.lastArm) {
      arm.x = this.lastArm.getEndX();
      arm.y = this.lastArm.getEndY();
      arm.parent = this.lastArm;
    } else {
      arm.x = this.x;
      arm.y = this.y;
    }
    this.arms!.push(arm);
    this.lastArm = arm;
  },

  render(context: CanvasRenderingContext2D): void {
    if (this.arms) {
      for (let i = 0; i < this.arms.length; i++) {
        this.arms[i].render(context);
      }
    }
  },

  drag(x: number, y: number): void {
    if (this.lastArm) {
      this.lastArm.drag(x, y);
    }
  },
};

export function kinematicReach(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const iks = IKSystem.create(width / 2, height / 2);
  for (let i = 0; i < 5; i++) {
    iks.addArm(50);
  }

  document.body.addEventListener('mousemove', (event: MouseEvent) => {
    iks.drag(event.clientX, event.clientY);
  });

  update();

  function update(): void {
    context.clearRect(0, 0, width, height);
    iks.render(context);
    requestAnimationFrame(update);
  }
}
