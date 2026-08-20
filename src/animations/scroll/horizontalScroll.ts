import gsap from 'gsap';
import { ScrollTrigger } from '../core/gsap';

export interface HorizontalScrollResult {
  timeline: gsap.core.Timeline | null;
  destroy: () => void;
}

export function createHorizontalScroll(
  section: HTMLElement | null,
  track: HTMLElement | null
): HorizontalScrollResult {
  if (!section || !track) {
    return { timeline: null, destroy: () => {} };
  }

  // Check if screen is desktop/tablet width where horizontal pin makes sense
  const isDesktop = window.innerWidth >= 1024;

  if (!isDesktop) {
    return { timeline: null, destroy: () => {} };
  }

  // Calculate the total scroll distance based on track width minus viewport width
  const totalWidth = track.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = totalWidth - viewportWidth;

  if (scrollDistance <= 0) {
    return { timeline: null, destroy: () => {} };
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // Main horizontal translation
  timeline.to(track, {
    x: -scrollDistance,
    ease: 'none',
  });

  // Parallax zoom and shift on cards within the track
  const cards = track.querySelectorAll<HTMLElement>('.work-card');
  cards.forEach((card) => {
    const img = card.querySelector<HTMLElement>('.work-card__image');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.15, x: 20 },
        {
          scale: 1,
          x: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: timeline,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        }
      );
    }
  });

  const destroy = () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };

  return { timeline, destroy };
}
