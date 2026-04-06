/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '400px', 'sm': '640px', 'md': '768px',
      'lg': '1024px', 'xl': '1280px', '2xl': '1536px',
    },
    extend: {
      colors: {
        primary:         '#1230C4',
        'primary-light': '#1E40D8',
        'primary-dark':  '#0C1F96',
        brand: {
          bg:         '#E8EDF9',
          card:       '#FFFFFF',
          text:       '#07102A',
          muted:      '#56637E',
          border:     '#CBD3E8',
          green:      '#15803D',
          'green-bg': '#DCFCE7',
          red:        '#DC2626',
          'red-bg':   '#FEE2E2',
          amber:      '#B45309',
          'amber-bg': '#FEF3C7',
        },
        dark: {
          bg:     '#010714',
          card:   '#050E24',
          alt:    '#091530',
          text:   '#DDE5FF',
          muted:  '#617099',
          border: '#0F1E3C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card:        '0 1px 3px rgba(7,16,42,0.05), 0 4px 18px rgba(7,16,42,0.07)',
        'card-hover':'0 8px 32px rgba(7,16,42,0.14), 0 2px 6px rgba(7,16,42,0.06)',
        modal:       '0 24px 80px rgba(7,16,42,0.30)',
        glow:        '0 0 0 3px rgba(18,48,196,0.20)',
        topbar:      '0 1px 0 rgba(7,16,42,0.06)',
      },
      animation: { 'fade-in': 'fadeIn 0.3s ease both' },
      keyframes: { fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } } },
    },
  },
  plugins: [],
}