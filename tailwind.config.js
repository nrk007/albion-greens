/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1E4D35',
        'forest-dark': '#122F22',
        'forest-light': '#2A6347',
        gold: '#C9A84C',
        'gold-light': '#E2C988',
        parchment: '#F5F2EA',
        'mint-pale': '#EAF2EC',
        ink: '#1A1A1A',
        'ink-light': '#5A5A5A',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['Montserrat', 'sans-serif'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.19, 1, 0.22, 1)',
        soft: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        snap: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
