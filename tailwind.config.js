/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jade: {
          50: '#F0FAF2',
          100: '#D9F3DF',
          200: '#B8EAC3',
          300: '#91DEA0',
          400: '#78E08F', // signature primary jade accent
          500: '#78E08F',
          600: '#38A85E',
          700: '#1F8A4C', // deep jade secondary accent
          800: '#156336',
          900: '#0E4224',
          950: '#072413',
          glow: 'rgba(120, 224, 143, 0.15)',
        },
        obsidian: {
          950: '#070807', // primary dark warm black
          900: '#101310', // secondary dark graphite/jade-black
          850: '#141814',
          800: '#1A201A',
          750: '#222A22',
          700: '#2C352C',
          600: '#414D41',
          500: '#5F6E5F',
        },
        warm: {
          white: '#F3F1EA',
          muted: '#8C918B',
          border: 'rgba(243, 241, 234, 0.12)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'jade-radial': 'radial-gradient(circle at center, rgba(120, 224, 143, 0.08) 0%, rgba(7, 8, 7, 0) 70%)',
      },
    },
  },
  plugins: [],
}
