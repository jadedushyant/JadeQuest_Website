export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  tagline: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  metrics: ProjectMetric[];
  heroImage: string;
  accentColor: string;
  featured: boolean;
  architectureHighlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}
