import gsap from 'gsap';
import { ScrollTrigger } from '../core/gsap';
import { EASING, DURATIONS } from '../core/constants';
import { prefersReducedMotion } from '../../lib/device';

export function createTextReveal(element: HTMLElement | null, options?: { delay?: number; scrub?: boolean | number }): gsap.core.Tween | gsap.core.Timeline | null {
  if (!element) return null;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    element,
    {
      y: 60,
      opacity: 0,
      filter: 'blur(8px)',
    },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: DURATIONS.normal,
      ease: EASING.power4Out,
      delay: options?.delay || 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        scrub: options?.scrub ?? false,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createStaggerLinesReveal(container: HTMLElement | null): gsap.core.Timeline | null {
  if (!container) return null;

  const lines = container.querySelectorAll('.reveal-line');
  if (lines.length === 0) return null;

  if (prefersReducedMotion()) {
    gsap.set(lines, { opacity: 1, y: 0 });
    return null;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 82%',
      end: 'top 40%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.fromTo(
    lines,
    {
      y: 80,
      opacity: 0,
      rotateX: 15,
      filter: 'blur(10px)',
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: DURATIONS.normal,
      stagger: 0.12,
      ease: EASING.power4Out,
    }
  );

  return tl;
}
