import gsap from 'gsap';
import { ScrollTrigger } from '../core/gsap';
import { EASING } from '../core/constants';
import { prefersReducedMotion } from '../../lib/device';

export function createNetworkEntrance(container: HTMLElement | null): gsap.core.Timeline | null {
  if (!container) return null;

  const nodes = container.querySelectorAll('.tech-node');
  const lines = container.querySelectorAll('.tech-line');
  const coreNode = container.querySelector('.tech-core-node');

  if (prefersReducedMotion()) {
    gsap.set([nodes, lines, coreNode], { opacity: 1 });
    return null;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  // Core node pop in
  if (coreNode) {
    tl.fromTo(
      coreNode,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );
  }

  // Draw connection lines
  if (lines.length > 0) {
    tl.fromTo(
      lines,
      { strokeDashoffset: 400, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 0.35,
        duration: 1.2,
        stagger: 0.04,
        ease: EASING.power2Out,
      },
      '-=0.4'
    );
  }

  // Nodes reveal
  if (nodes.length > 0) {
    tl.fromTo(
      nodes,
      { scale: 0.4, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: EASING.power3Out,
      },
      '-=0.8'
    );
  }

  return tl;
}

export function highlightNetworkBranch(
  container: HTMLElement | null,
  activeNodeId: string | null,
  connectedNodeIds: string[]
): void {
  if (!container) return;

  const allNodes = container.querySelectorAll<HTMLElement>('.tech-node');
  const allLines = container.querySelectorAll<SVGLineElement | SVGPathElement>('.tech-line');

  if (!activeNodeId) {
    // Reset all
    gsap.to(allNodes, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    gsap.to(allLines, { stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1, opacity: 0.35, duration: 0.35 });
    return;
  }

  // Dim non-connected nodes
  allNodes.forEach((node) => {
    const id = node.dataset.nodeId;
    const isTarget = id === activeNodeId;
    const isConnected = id && connectedNodeIds.includes(id);

    if (isTarget) {
      gsap.to(node, { opacity: 1, scale: 1.18, duration: 0.35, ease: 'back.out(1.5)' });
    } else if (isConnected) {
      gsap.to(node, { opacity: 1, scale: 1.06, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(node, { opacity: 0.25, scale: 0.92, duration: 0.35, ease: 'power2.out' });
    }
  });

  // Highlight connected lines
  allLines.forEach((line) => {
    const from = line.dataset.from;
    const to = line.dataset.to;
    const isConnectedLine =
      (from === activeNodeId && connectedNodeIds.includes(to || '')) ||
      (to === activeNodeId && connectedNodeIds.includes(from || ''));

    if (isConnectedLine) {
      gsap.to(line, {
        stroke: '#00F08B',
        strokeWidth: 2.2,
        opacity: 0.95,
        duration: 0.35,
      });
    } else {
      gsap.to(line, {
        stroke: 'rgba(255, 255, 255, 0.05)',
        strokeWidth: 0.8,
        opacity: 0.1,
        duration: 0.35,
      });
    }
  });
}
