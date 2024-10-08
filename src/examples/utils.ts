import { cancelAnimationKinematicArm } from './kinematic_arm';
import { cancelAnimationKinematicArmDrawing } from './kinematic_arm_drawing';
import { cancelAnimationKinematicSnakeDrawing } from './kinematic_reach';
import { cancelAnimationKinematicWalkDrawing } from './kinematic_walk';
import { cancelAnimationLissajous } from './lissajous_curves';

export function cancelAllAnimations(): void {
  const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  const context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
  context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // const canvas3 = document.getElementById('canvas3') as HTMLCanvasElement;
  // const gl = canvas3.getContext('webgl') as WebGL2RenderingContext;
  // gl.clearColor(0, 0, 0, 0);
  // gl.clear(gl.COLOR_BUFFER_BIT);

  cancelAnimationLissajous();
  cancelAnimationKinematicArm();
  cancelAnimationKinematicArmDrawing();
  cancelAnimationKinematicWalkDrawing();
  cancelAnimationKinematicSnakeDrawing();
}
