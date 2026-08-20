import gsap from 'gsap';
import { isTouchDevice, prefersReducedMotion } from '../../lib/device';

export interface CursorController {
  setLabel: (text: string, isActive?: boolean) => void;
  reset: () => void;
  destroy: () => void;
}

export function initCustomCursor(cursorEl: HTMLElement | null, dotEl: HTMLElement | null, labelEl: HTMLElement | null): CursorController | null {
  if (!cursorEl || isTouchDevice() || prefersReducedMotion()) return null;

  // Set initial position off-screen
  gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });
  if (dotEl) gsap.set(dotEl, { xPercent: -50, yPercent: -50 });

  const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.35, ease: 'power3.out' });

  const xToDot = dotEl ? gsap.quickTo(dotEl, 'x', { duration: 0.1, ease: 'power2.out' }) : null;
  const yToDot = dotEl ? gsap.quickTo(dotEl, 'y', { duration: 0.1, ease: 'power2.out' }) : null;

  let isHovering = false;

  const onMouseMove = (e: MouseEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
    xToDot?.(e.clientX);
    yToDot?.(e.clientY);

    cursorEl.classList.remove('cursor--hidden');
  };

  const onMouseLeave = () => {
    cursorEl.classList.add('cursor--hidden');
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  const setLabel = (text: string, active = true) => {
    isHovering = active;
    if (labelEl) labelEl.textContent = text;

    if (active) {
      cursorEl.classList.add('cursor--active');
    } else {
      cursorEl.classList.remove('cursor--active');
    }
  };

  const reset = () => {
    isHovering = false;
    cursorEl.classList.remove('cursor--active');
    if (labelEl) labelEl.textContent = '';
  };

  const destroy = () => {
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
  };

  return { setLabel, reset, destroy };
}
