/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'mps-navy': '#002B5C',
        'mps-navy-light': '#003d82',
        'mps-navy-dark': '#001a3d',
        'mps-red': '#C8102E',
        'mps-red-light': '#e01e3f',
        'mps-red-dark': '#a00d24',
        'mps-gold': '#D4AF37',
        'mps-gold-light': '#e8c95a',
        'mps-cream': '#F5F5F0',
        'mps-dark': '#0A0E1A',
        'mps-white': '#FFFFFF',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212,175,55,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(212,175,55,0.6)' },
        },
      },
      boxShadow: {
        'mps-glow': '0 0 20px rgba(212,175,55,0.4)',
        'mps-red-glow': '0 0 20px rgba(200,16,46,0.4)',
      },
    },
  },
  plugins: [],
};
