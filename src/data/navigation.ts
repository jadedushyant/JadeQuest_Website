export interface NavLink {
  id: string;
  label: string;
  href: string;
  number: string;
}

export const navLinks: NavLink[] = [
  { id: 'work', label: 'WORK', href: '#work', number: '01' },
  { id: 'services', label: 'CAPABILITIES', href: '#services', number: '02' },
  { id: 'about', label: 'ABOUT', href: '#about', number: '03' },
  { id: 'contact', label: 'CONTACT', href: '#contact', number: '04' },
];

export const socialLinks = [
  { label: 'LINKEDIN', href: 'https://linkedin.com/company/jadequest', icon: 'Linkedin' },
  { label: 'GITHUB', href: 'https://github.com/jadequest', icon: 'Github' },
];
