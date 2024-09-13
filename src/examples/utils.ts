import { cancelAnimationKinematicArm } from './kinematic_arm';
import { cancelAnimationKinematicArmDrawing } from './kinematic_arm_drawing';
import { cancelAnimationKinematicSnakeDrawing } from './kinematic_reach';
import { cancelAnimationKinematicWalkDrawing } from './kinematic_walk';
import { cancelAnimationLissajous } from './lissajous_curves';

export function cancelAllAnimations(): void {
  const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  const context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
  context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
  cancelAnimationLissajous();
  cancelAnimationKinematicArm();
  cancelAnimationKinematicArmDrawing();
  cancelAnimationKinematicWalkDrawing();
  cancelAnimationKinematicSnakeDrawing();
}
