import gsap from 'gsap';
import { EASING, DURATIONS } from '../core/constants';

export function createHeroIntro(container: HTMLElement | null): gsap.core.Timeline | null {
  if (!container) return null;

  const eyebrow = container.querySelector('.hero__eyebrow');
  const titleLines = container.querySelectorAll('.hero__title-line');
  const description = container.querySelector('.hero__description');
  const actions = container.querySelector('.hero__actions');
  const meta = container.querySelector('.hero__meta');
  const scrollIndicator = container.querySelector('.hero__scroll-indicator');

  const timeline = gsap.timeline({
    defaults: {
      ease: EASING.power4Out,
    },
    delay: 0.2,
  });

  // Eyebrow reveal
  if (eyebrow) {
    timeline.fromTo(
      eyebrow,
      {
        y: 20,
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATIONS.medium,
      }
    );
  }

  // Title lines reveal (Masked SplitText-style)
  if (titleLines.length > 0) {
    timeline.fromTo(
      titleLines,
      {
        y: 120,
        opacity: 0,
        rotateX: 20,
        filter: 'blur(12px)',
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: DURATIONS.normal,
        stagger: 0.15,
      },
      '-=0.4'
    );
  }

  // Description
  if (description) {
    timeline.fromTo(
      description,
      {
        y: 35,
        opacity: 0,
        filter: 'blur(6px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATIONS.medium,
      },
      '-=0.6'
    );
  }

  // Actions / Buttons
  if (actions) {
    timeline.fromTo(
      actions,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: DURATIONS.medium,
      },
      '-=0.5'
    );
  }

  // Meta & scroll indicator
  if (meta) {
    timeline.fromTo(
      meta,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: DURATIONS.medium,
      },
      '-=0.4'
    );
  }

  if (scrollIndicator) {
    timeline.fromTo(
      scrollIndicator,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.medium,
      },
      '-=0.3'
    );
  }

  return timeline;
}
