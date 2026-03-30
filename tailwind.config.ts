import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:      '#0A1628',
        teal:      '#0E7490',
        green:     '#059669',
        gold:      '#F59E0B',
        sky:       '#A1CFFB',
        'off-white': '#F8FAFC',
        'teal-wash': '#F0FDFA',
        'near-black': '#030912',
      },
      fontFamily: {
        heading: ['var(--font-lora)', 'Georgia', 'serif'],
        body:    ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config