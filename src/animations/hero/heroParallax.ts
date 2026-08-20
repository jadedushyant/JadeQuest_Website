import gsap from 'gsap';
import { isTouchDevice, prefersReducedMotion } from '../../lib/device';

export function createHeroParallax(container: HTMLElement | null): (() => void) | null {
  if (!container || isTouchDevice() || prefersReducedMotion()) return null;

  const bg = container.querySelector<HTMLElement>('.hero__bg');
  const grid = container.querySelector<HTMLElement>('.hero__grid');
  const typography = container.querySelector<HTMLElement>('.hero__content');
  const visual = container.querySelector<HTMLElement>('.hero__visual');
  const actions = container.querySelector<HTMLElement>('.hero__actions');

  const xToBg = bg ? gsap.quickTo(bg, 'x', { duration: 0.8, ease: 'power2.out' }) : null;
  const yToBg = bg ? gsap.quickTo(bg, 'y', { duration: 0.8, ease: 'power2.out' }) : null;

  const xToGrid = grid ? gsap.quickTo(grid, 'x', { duration: 0.9, ease: 'power2.out' }) : null;
  const yToGrid = grid ? gsap.quickTo(grid, 'y', { duration: 0.9, ease: 'power2.out' }) : null;

  const xToTypo = typography ? gsap.quickTo(typography, 'x', { duration: 0.7, ease: 'power2.out' }) : null;
  const yToTypo = typography ? gsap.quickTo(typography, 'y', { duration: 0.7, ease: 'power2.out' }) : null;
  const rotXTypo = typography ? gsap.quickTo(typography, 'rotationX', { duration: 0.7, ease: 'power2.out' }) : null;
  const rotYTypo = typography ? gsap.quickTo(typography, 'rotationY', { duration: 0.7, ease: 'power2.out' }) : null;

  const xToVisual = visual ? gsap.quickTo(visual, 'x', { duration: 0.6, ease: 'power2.out' }) : null;
  const yToVisual = visual ? gsap.quickTo(visual, 'y', { duration: 0.6, ease: 'power2.out' }) : null;

  const xToActions = actions ? gsap.quickTo(actions, 'x', { duration: 0.65, ease: 'power2.out' }) : null;
  const yToActions = actions ? gsap.quickTo(actions, 'y', { duration: 0.65, ease: 'power2.out' }) : null;

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalized coordinates (-1 to 1)
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;

    // Apply layered movements
    xToBg?.(normX * 12);
    yToBg?.(normY * 12);

    xToGrid?.(normX * 18);
    yToGrid?.(normY * 18);

    xToTypo?.(normX * 24);
    yToTypo?.(normY * 24);
    rotXTypo?.(-normY * 4);
    rotYTypo?.(normX * 4);

    xToVisual?.(normX * 50);
    yToVisual?.(normY * 50);

    xToActions?.(normX * 15);
    yToActions?.(normY * 15);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}
