import { prefersReducedMotion } from '../../lib/device';

export interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  isAccent: boolean;
  angle: number;
  speed: number;
  distortAngle: number;
  distortSpeed: number;
}

export class ParticleJSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private width = 0;
  private height = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private mouseRadius = 140;
  private scrollProgress = 0;
  private formProgress = 0; // 0 (scattered) to 1 (formed J)
  private isDestroyed = false;
  private isReducedMotion = false;
  private time = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) throw new Error('Cannot get 2D context');
    this.ctx = context;
    this.isReducedMotion = prefersReducedMotion();

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.start();
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.parentElement?.getBoundingClientRect() || this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.recalculateTargets();
  };

  private initParticles() {
    const count = window.innerWidth < 768 ? 240 : 520;
    this.particles = [];

    const colors = [
      '#78E08F', // signature primary jade
      '#91DEA0', // soft jade highlight
      '#1F8A4C', // deep jade accent
      '#F3F1EA', // warm white accent
      '#8C918B', // muted graphite
    ];

    for (let i = 0; i < count; i++) {
      const isAccent = Math.random() < 0.25;
      const size = isAccent ? Math.random() * 2.2 + 1.8 : Math.random() * 1.5 + 0.8;
      const color = isAccent ? '#78E08F' : colors[Math.floor(Math.random() * colors.length)];

      const initialX = Math.random() * this.width;
      const initialY = Math.random() * this.height;

      this.particles.push({
        x: initialX,
        y: initialY,
        originX: initialX,
        originY: initialY,
        targetX: this.width / 2,
        targetY: this.height / 2,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size,
        baseAlpha: isAccent ? 0.9 : Math.random() * 0.5 + 0.3,
        alpha: 0,
        color,
        isAccent,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        distortAngle: Math.random() * Math.PI * 2,
        distortSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    this.recalculateTargets();
  }

  private recalculateTargets() {
    const isMobile = this.width < 768;
    // Position J in center-right for desktop, center for mobile
    const centerX = isMobile ? this.width * 0.5 : this.width * 0.65;
    const centerY = this.height * 0.5;
    const scale = Math.min(this.width, this.height) * (isMobile ? 0.45 : 0.55);

    const total = this.particles.length;

    // Distribute particles along the geometry of a sculpted modern "J"
    // J consists of:
    // 1. Top horizontal bar: x from -0.3 to 0.35, y = -0.45
    // 2. Vertical right stem: x = 0.2 to 0.35, y from -0.45 to 0.15
    // 3. Bottom left loop curve: center at (0, 0.15), radius 0.25 to 0.35, angle 0 to Math.PI
    // 4. Accent satellite nodes & orbit halo
    this.particles.forEach((p, index) => {
      const t = index / total;

      if (t < 0.2) {
        // Top crossbar
        const subT = t / 0.2;
        p.targetX = centerX + (subT * 0.65 - 0.3) * scale + (Math.random() - 0.5) * 16;
        p.targetY = centerY - 0.42 * scale + (Math.random() - 0.5) * 14;
      } else if (t < 0.55) {
        // Vertical stem
        const subT = (t - 0.2) / 0.35;
        p.targetX = centerX + 0.28 * scale + (Math.random() - 0.5) * 22;
        p.targetY = centerY + (subT * 0.55 - 0.42) * scale + (Math.random() - 0.5) * 16;
      } else if (t < 0.85) {
        // Bottom loop curve
        const subT = (t - 0.55) / 0.3;
        const angle = subT * Math.PI * 0.95; // 0 to ~170 deg
        const radius = (0.28 + (Math.random() - 0.5) * 0.08) * scale;
        p.targetX = centerX + 0.28 * scale - radius * (1 - Math.cos(angle)) * 0.85;
        p.targetY = centerY + 0.13 * scale + radius * Math.sin(angle);
      } else {
        // Geometric satellites / orbit cloud
        const angle = Math.random() * Math.PI * 2;
        const dist = (0.25 + Math.random() * 0.35) * scale;
        p.targetX = centerX + Math.cos(angle) * dist;
        p.targetY = centerY + Math.sin(angle) * dist;
      }
    });
  }

  private bindEvents() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  };

  private handleMouseLeave = () => {
    this.mouseX = -9999;
    this.mouseY = -9999;
  };

  public setScrollProgress(progress: number) {
    this.scrollProgress = Math.max(0, Math.min(progress, 1));
  }

  public setFormProgress(progress: number) {
    this.formProgress = Math.max(0, Math.min(progress, 1));
  }

  private update() {
    this.time += 0.02;

    const isFormed = this.formProgress > 0.05;
    const dispersion = this.scrollProgress * 2.8;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Idle wave float
      p.angle += p.speed;
      p.distortAngle += p.distortSpeed;
      const floatOffsetX = Math.cos(p.angle) * 4;
      const floatOffsetY = Math.sin(p.angle) * 4;

      // Target position interpolation based on form progress
      const currentTargetX = p.originX + (p.targetX - p.originX) * this.formProgress + floatOffsetX;
      const currentTargetY = p.originY + (p.targetY - p.originY) * this.formProgress + floatOffsetY;

      // Scroll breakup dispersion force (particles burst outward and down)
      const dispersionX = (p.targetX - this.width / 2) * dispersion * 1.8 + Math.sin(p.distortAngle) * dispersion * 60;
      const dispersionY = dispersion * 350 + (p.targetY - this.height / 2) * dispersion * 0.8;

      const finalTargetX = currentTargetX + dispersionX;
      const finalTargetY = currentTargetY + dispersionY;

      // Spring physics towards target
      const springStrength = 0.045;
      const friction = 0.88;

      const ax = (finalTargetX - p.x) * springStrength;
      const ay = (finalTargetY - p.y) * springStrength;

      p.vx = (p.vx + ax) * friction;
      p.vy = (p.vy + ay) * friction;

      // Mouse repulsion
      if (this.mouseX > -1000 && !this.isReducedMotion) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouseRadius && dist > 0) {
          const force = (1 - dist / this.mouseRadius) * 14;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Alpha calculation: fade in on load, fade slightly out if dispersed
      const fadeOnScroll = Math.max(0, 1 - this.scrollProgress * 1.2);
      p.alpha = p.baseAlpha * this.formProgress * fadeOnScroll;
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.particles.length === 0 || this.formProgress <= 0.01) return;

    // Draw connecting constellation lines between nearby particles when in J shape
    if (this.formProgress > 0.4 && this.scrollProgress < 0.6) {
      const maxConnectDist = this.width < 768 ? 32 : 46;
      const lineAlphaBase = (this.formProgress - 0.4) * 1.6 * (1 - this.scrollProgress * 1.5);

      this.ctx.lineWidth = 0.75;

      for (let i = 0; i < this.particles.length; i += 2) {
        const p1 = this.particles[i];
        if (p1.alpha < 0.1) continue;

        for (let j = i + 1; j < this.particles.length; j += 3) {
          const p2 = this.particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * lineAlphaBase;
            this.ctx.strokeStyle = `rgba(120, 224, 143, ${lineAlpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }

    // Draw individual particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.alpha <= 0.01) continue;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;

      if (p.isAccent) {
        // Glowing halo for accent particles
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#78E08F';
      }

      this.ctx.fillStyle = p.color;
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
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}
