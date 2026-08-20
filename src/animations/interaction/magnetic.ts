import gsap from 'gsap';
import { isTouchDevice, prefersReducedMotion } from '../../lib/device';

export function createMagneticButton(element: HTMLElement | null, strength = 0.3): (() => void) | null {
  if (!element || isTouchDevice() || prefersReducedMotion()) return null;

  const content = element.querySelector<HTMLElement>('.magnetic-content') || element;

  const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' });

  const xToContent = content !== element ? gsap.quickTo(content, 'x', { duration: 0.7, ease: 'power3.out' }) : null;
  const yToContent = content !== element ? gsap.quickTo(content, 'y', { duration: 0.7, ease: 'power3.out' }) : null;

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xTo(deltaX);
    yTo(deltaY);

    xToContent?.(deltaX * 0.4);
    yToContent?.(deltaY * 0.4);
  };

  const onMouseLeave = () => {
    xTo(0);
    yTo(0);
    xToContent?.(0);
    yToContent?.(0);
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
}
