import gsap from 'gsap';
import { ScrollTrigger } from '../core/gsap';
import { EASING } from '../core/constants';

export function createCounterAnimation(
  element: HTMLElement | null,
  targetValue: number,
  options?: { duration?: number; suffix?: string }
): gsap.core.Tween | null {
  if (!element) return null;

  const obj = { count: 0 };
  const duration = options?.duration || 2.2;
  const suffix = options?.suffix || '';

  return gsap.to(obj, {
    count: targetValue,
    duration,
    ease: EASING.power3Out,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.innerText = `${Math.floor(obj.count)}${suffix}`;
    },
  });
}
