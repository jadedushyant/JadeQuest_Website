export interface CursorState {
  label: string;
  isActive: boolean;
  isHidden: boolean;
  variant: 'default' | 'explore' | 'view' | 'drag' | 'connect';
}

export interface ParticleConfig {
  count: number;
  color: string;
  glowColor: string;
  minSize: number;
  maxSize: number;
  speed: number;
  interactiveRadius: number;
}
