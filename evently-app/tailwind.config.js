/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#0B0F19',
        surface1: '#111827',
        surface2: '#1F2937',
        surface3: '#374151',
        primary: '#8B5CF6',
        'primary-hover': '#7C3AED',
        secondary: '#EC4899',
        'secondary-bright': '#D946EF',
        tertiary: '#06B6D4',
        'tertiary-bright': '#22D3EE',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'text-tertiary': '#6B7280',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        control: '12px',
        card: '18px',
      },
      boxShadow: {
        l1: '0 10px 25px -5px rgba(0,0,0,0.5)',
        l2: '0 20px 35px -10px rgba(0,0,0,0.65), 0 0 20px 0 rgba(139,92,246,0.15)',
        l3: '0 25px 50px -12px rgba(0,0,0,0.85), 0 0 40px -5px rgba(139,92,246,0.25)',
        cta: '0 4px 18px rgba(139,92,246,0.35)',
        'cta-hover': '0 6px 24px rgba(236,72,153,0.45)',
      },
      maxWidth: {
        content: '1360px',
      },
    },
  },
  plugins: [],
}
