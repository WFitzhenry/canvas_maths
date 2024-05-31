class Arm {
  x: number = 0;
  y: number = 0;
  length: number = 100;
  angle: number = 0;
  centerAngle: number = 0;
  rotationRange: number = Math.PI / 4;
  parent: Arm | null = null;
  phaseOffset: number = 0;

  static create(
    length: number,
    centerAngle: number,
    rotationRange: number,
    phaseOffset: number,
  ): Arm {
    const obj: Arm = new Arm();
    obj.init(length, centerAngle, rotationRange, phaseOffset);
    return obj;
  }

  init(
    length: number,
    centerAngle: number,
    rotationRange: number,
    phaseOffset: number,
  ): void {
    this.length = length;
    this.centerAngle = centerAngle;
    this.rotationRange = rotationRange;
    this.phaseOffset = phaseOffset;
  }

  setPhase(phase: number): void {
    this.angle =
      this.centerAngle +
      Math.sin(phase + this.phaseOffset) * this.rotationRange;
  }

  getEndX(): number {
    let angle = this.angle;
    let parent = this.parent;
    while (parent) {
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
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
}

interface FKSystem {
  arms: Arm[];
  lastArm: Arm | null;
  x: number;
  y: number;
  phase: number;
  speed: number;

  create(x: number, y: number): FKSystem;
  init(x: number, y: number): void;
  addArm(
    length: number,
    centerAngle: number,
    rotationRange: number,
    phaseOffset: number,
  ): void;
  update(): void;
  render(context: CanvasRenderingContext2D): void;
  rotateArm(index: number, angle: number): void;
}

const FKSystem: FKSystem = {
  arms: [],
  lastArm: null,
  x: 0,
  y: 0,
  phase: 0,
  speed: 0.05,

  create(x: number, y: number): FKSystem {
    const obj: FKSystem = Object.create(this);
    obj.init(x, y);
    return obj;
  },

  init(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.arms = [];
  },

  addArm(
    length: number,
    centerAngle: number,
    rotationRange: number,
    phaseOffset: number,
  ): void {
    const arm: Arm = Arm.create(
      length,
      centerAngle,
      rotationRange,
      phaseOffset,
    );
    this.arms.push(arm);
    if (this.lastArm) {
      arm.parent = this.lastArm;
    }
    this.lastArm = arm;
    this.update();
  },

  update(): void {
    for (let i = 0; i < this.arms.length; i++) {
      const arm = this.arms[i];
      arm.setPhase(this.phase);
      if (arm.parent) {
        arm.x = arm.parent.getEndX();
        arm.y = arm.parent.getEndY();
      } else {
        arm.x = this.x;
        arm.y = this.y;
      }
    }
    this.phase += this.speed;
  },

  render(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.arms.length; i++) {
      this.arms[i].render(context);
    }
  },

  rotateArm(index: number, angle: number): void {
    this.arms[index].angle = angle;
  },
};

export function kinematicWalk(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const leg0 = FKSystem.create(width / 2, height / 2);
  const leg1 = FKSystem.create(width / 2, height / 2);
  leg1.phase = Math.PI;

  leg0.addArm(200, Math.PI / 2, Math.PI / 4, 0);
  leg0.addArm(180, 0.87, 0.87, -1.5);
  leg1.addArm(200, Math.PI / 2, Math.PI / 4, 0);
  leg1.addArm(180, 0.87, 0.87, -1.5);

  function draw(): void {
    context.clearRect(0, 0, width, height);

    leg0.update();
    leg0.render(context);
    leg1.update();
    leg1.render(context);

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

let animationFrameId: number | null = null;
export function cancelAnimationKinematicWalkDrawing(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
