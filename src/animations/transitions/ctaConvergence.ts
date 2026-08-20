import { prefersReducedMotion } from '../../lib/device';

export interface ConvergenceParticle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  alpha: number;
  progress: number;
  speed: number;
}

export class CTAConvergenceSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: ConvergenceParticle[] = [];
  private animationFrameId: number | null = null;
  private width = 0;
  private height = 0;
  private convergenceProgress = 0; // 0 (spread) to 1 (converged in logo)
  private isDestroyed = false;
  private time = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) throw new Error('Cannot get 2D context');
    this.ctx = context;

    this.resize();
    this.initParticles();
    window.addEventListener('resize', this.resize);
    this.start();
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.parentElement?.getBoundingClientRect() || this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.recalcLogoTargets();
  };

  private initParticles() {
    const count = window.innerWidth < 768 ? 180 : 380;
    this.particles = [];

    const colors = ['#78E08F', '#91DEA0', '#1F8A4C', '#F3F1EA', '#8C918B'];

    for (let i = 0; i < count; i++) {
      // Spawn around screen perimeters
      const edge = Math.floor(Math.random() * 4);
      let sx = 0;
      let sy = 0;

      if (edge === 0) {
        sx = Math.random() * this.width;
        sy = -20;
      } else if (edge === 1) {
        sx = this.width + 20;
        sy = Math.random() * this.height;
      } else if (edge === 2) {
        sx = Math.random() * this.width;
        sy = this.height + 20;
      } else {
        sx = -20;
        sy = Math.random() * this.height;
      }

      this.particles.push({
        x: sx,
        y: sy,
        startX: sx,
        startY: sy,
        targetX: this.width / 2,
        targetY: this.height / 2,
        size: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        progress: 0,
        speed: Math.random() * 0.015 + 0.008,
      });
    }

    this.recalcLogoTargets();
  }

  private recalcLogoTargets() {
    const centerX = this.width / 2;
    const centerY = this.height * 0.42;
    const isMobile = this.width < 768;
    const scale = Math.min(this.width, this.height) * (isMobile ? 0.4 : 0.48);

    const total = this.particles.length;

    // Sculpt particles into geometric JADEQUEST emblem / J monogram
    this.particles.forEach((p, index) => {
      const t = index / total;

      if (t < 0.25) {
        // Top crown bar of J
        const subT = t / 0.25;
        p.targetX = centerX + (subT * 0.6 - 0.3) * scale + (Math.random() - 0.5) * 8;
        p.targetY = centerY - 0.38 * scale + (Math.random() - 0.5) * 8;
      } else if (t < 0.6) {
        // Vertical stem of J
        const subT = (t - 0.25) / 0.35;
        p.targetX = centerX + 0.2 * scale + (Math.random() - 0.5) * 10;
        p.targetY = centerY + (subT * 0.5 - 0.38) * scale + (Math.random() - 0.5) * 8;
      } else if (t < 0.85) {
        // Bottom loop of J
        const subT = (t - 0.6) / 0.25;
        const angle = subT * Math.PI * 0.95;
        const radius = 0.22 * scale;
        p.targetX = centerX + 0.2 * scale - radius * (1 - Math.cos(angle)) + (Math.random() - 0.5) * 8;
        p.targetY = centerY + 0.12 * scale + radius * Math.sin(angle) + (Math.random() - 0.5) * 8;
      } else {
        // Surrounding constellation particle halo
        const angle = Math.random() * Math.PI * 2;
        const dist = (0.2 + Math.random() * 0.3) * scale;
        p.targetX = centerX + Math.cos(angle) * dist;
        p.targetY = centerY + Math.sin(angle) * dist;
      }
    });
  }

  public setConvergence(progress: number) {
    this.convergenceProgress = Math.max(0, Math.min(progress, 1));
  }

  private update() {
    this.time += 0.02;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const targetP = this.convergenceProgress;

      // When convergenceProgress > 0.85, gently disperse
      let disperseX = 0;
      let disperseY = 0;
      if (targetP > 0.88) {
        const dFactor = (targetP - 0.88) / 0.12;
        disperseX = Math.cos(i) * dFactor * 120;
        disperseY = Math.sin(i) * dFactor * 120;
      }

      const floatX = Math.cos(this.time + i) * 4 * targetP;
      const floatY = Math.sin(this.time + i) * 4 * targetP;

      p.x = p.startX + (p.targetX - p.startX) * Math.min(1, targetP * 1.2) + floatX + disperseX;
      p.y = p.startY + (p.targetY - p.startY) * Math.min(1, targetP * 1.2) + floatY + disperseY;
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.convergenceProgress <= 0.02) return;

    const alphaMultiplier = Math.min(1, this.convergenceProgress * 1.5);

    // Connect nearby particles
    if (this.convergenceProgress > 0.5) {
      this.ctx.lineWidth = 0.6;
      for (let i = 0; i < this.particles.length; i += 3) {
        const p1 = this.particles[i];
        for (let j = i + 1; j < this.particles.length; j += 4) {
          const p2 = this.particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32 * 32) {
            this.ctx.strokeStyle = `rgba(120, 224, 143, ${(1 - Math.sqrt(distSq) / 32) * 0.22 * this.convergenceProgress})`;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha * alphaMultiplier;
      this.ctx.fillStyle = p.color;

      if (p.color === '#78E08F') {
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#78E08F';
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  private start() {
    const loop = () => {
      if (this.isDestroyed) return;
      this.update();
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resize);
  }
}
