import { cancelAnimationKinematicArm } from './kinematic_arm';
import { cancelAnimationLissajous } from './lissajous_curves';

export function cancelAllAnimations(): void {
  cancelAnimationLissajous();
  cancelAnimationKinematicArm();
}
