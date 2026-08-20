import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Configure defaults
  gsap.config({
    autoSleep: 60,
    force3D: true,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
export default gsap;
