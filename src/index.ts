// Import helpers.
import { bezierOne } from './examples/bezier_one';
import { lissajous } from './examples/lissajous_curves';
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
  });

  bezierOne();
});
