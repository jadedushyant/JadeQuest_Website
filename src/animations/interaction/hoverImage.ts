import gsap from 'gsap';
import { isTouchDevice, prefersReducedMotion } from '../../lib/device';

export interface FloatingImageController {
  show: (imageSrc: string, title: string, category: string) => void;
  hide: () => void;
  destroy: () => void;
}

export function initFloatingImage(container: HTMLElement | null): FloatingImageController | null {
  if (!container || isTouchDevice() || prefersReducedMotion()) return null;

  const floatingEl = container.querySelector<HTMLElement>('.floating-preview');
  const imgEl = container.querySelector<HTMLImageElement>('.floating-preview__img');
  const titleEl = container.querySelector<HTMLElement>('.floating-preview__title');
  const tagEl = container.querySelector<HTMLElement>('.floating-preview__tag');

  if (!floatingEl || !imgEl) return null;

  gsap.set(floatingEl, {
    xPercent: -50,
    yPercent: -50,
    scale: 0.7,
    opacity: 0,
    rotate: -4,
    transformOrigin: 'center center',
  });

  const xTo = gsap.quickTo(floatingEl, 'x', { duration: 0.45, ease: 'power3.out' });
  const yTo = gsap.quickTo(floatingEl, 'y', { duration: 0.45, ease: 'power3.out' });
  const rotTo = gsap.quickTo(floatingEl, 'rotation', { duration: 0.5, ease: 'power3.out' });

  let lastX = 0;

  const onMouseMove = (e: MouseEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);

    // Subtle dynamic tilt based on horizontal mouse movement delta
    const deltaX = e.clientX - lastX;
    const targetRot = Math.max(-12, Math.min(12, deltaX * 0.4));
    rotTo(targetRot);
    lastX = e.clientX;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const show = (imageSrc: string, title: string, category: string) => {
    if (imgEl.src !== imageSrc) {
      imgEl.src = imageSrc;
    }
    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = category;

    gsap.killTweensOf(floatingEl);
    gsap.to(floatingEl, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const hide = () => {
    gsap.killTweensOf(floatingEl);
    gsap.to(floatingEl, {
      opacity: 0,
      scale: 0.75,
      duration: 0.3,
      ease: 'power3.in',
    });
  };

  const destroy = () => {
    window.removeEventListener('mousemove', onMouseMove);
  };

  return { show, hide, destroy };
}
