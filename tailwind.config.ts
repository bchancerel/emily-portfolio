import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          500: '#6366f1',
          700: '#4338ca'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    tailwindTypography,
  ]
} satisfies Config
