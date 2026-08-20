import React, { useEffect, useRef } from 'react';
import { initCustomCursor, CursorController } from '../../animations/interaction/cursor';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const controllerRef = useRef<CursorController | null>(null);

  useEffect(() => {
    controllerRef.current = initCustomCursor(cursorRef.current, dotRef.current, labelRef.current);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-label], a, button, .interactive-hover');
      if (!target) {
        controllerRef.current?.reset();
        return;
      }

      const explicitLabel = target.getAttribute('data-cursor-label');
      if (explicitLabel) {
        controllerRef.current?.setLabel(explicitLabel, true);
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        controllerRef.current?.setLabel('EXPLORE', true);
      } else {
        controllerRef.current?.setLabel('VIEW', true);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      controllerRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor cursor--hidden" aria-hidden="true">
      <div className="cursor-ring relative">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};
