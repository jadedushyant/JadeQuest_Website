export type TechCategory = 'frontend' | 'backend' | 'cloud' | 'ai' | 'database';

export interface TechNode {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  proficiency: number; // 0 to 100
  x: number; // percentage in SVG coordinate space (0 - 100)
  y: number; // percentage in SVG coordinate space (0 - 100)
  connections: string[]; // IDs of connected nodes
  iconName: string;
  features: string[];
}

export interface TechConnection {
  from: string;
  to: string;
  label?: string;
  strength?: number;
}
