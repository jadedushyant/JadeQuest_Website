export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  isInfinity?: boolean;
}

export const statsData: StatItem[] = [
  {
    id: 'projects',
    value: 50,
    suffix: '+',
    label: 'PROJECTS DELIVERED',
    sublabel: 'Mission-critical enterprise software, WebGL apps & scalable platforms',
  },
  {
    id: 'experts',
    value: 20,
    suffix: '+',
    label: 'CORE SPECIALISTS',
    sublabel: 'Elite software engineers, AI researchers & interaction designers',
  },
  {
    id: 'industries',
    value: 10,
    suffix: '+',
    label: 'INDUSTRIES TRANSFORMED',
    sublabel: 'Fintech, HealthTech, Spatial XR, Cloud Infrastructure & Cybersecurity',
  },
  {
    id: 'possibilities',
    value: 0,
    suffix: '∞',
    label: 'POSSIBILITIES UNLOCKED',
    sublabel: 'Engineering the impossible with relentless curiosity and craft',
    isInfinity: true,
  },
];
