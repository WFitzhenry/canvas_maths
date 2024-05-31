// Import helpers.
import { bezierOne } from './examples/bezier_one';
import { lissajous } from './examples/lissajous_curves';
import { circlePacking } from './examples/circle_packing';
import { kinematicArm } from './examples/kinematic_arm';
import { forceDirectedLayout } from './examples/force_directed_layout';
import { cancelAllAnimations } from './examples/utils';

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById(
    'select-canvas',
  ) as HTMLSelectElement;

  dropdown.addEventListener('change', (event: Event) => {
    cancelAllAnimations();
    const target = event.target as HTMLSelectElement;

    const selectedValue = target.value;
    if (selectedValue === 'bezierOne') {
      bezierOne();
    }

    if (selectedValue === 'lissajous') {
      lissajous();
    }

    if (selectedValue === 'circlepacking') {
      circlePacking();
    }

    if (selectedValue === 'forcedirectedlayout') {
      forceDirectedLayout();
    }

    if (selectedValue === 'kinematicarm') {
      kinematicArm();
    }
  });

  kinematicArm();
});
