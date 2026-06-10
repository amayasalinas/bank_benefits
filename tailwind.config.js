/** @type {import('tailwindcss').Config} */
// Tema v2: los tokens viven como variables CSS en src/index.css (design system
// verde bosque). Tailwind queda como utilitario de layout; los colores se
// exponen mapeados a las variables para poder usarlos en clases utilitarias.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-faint': 'var(--ink-faint)',
        line: 'var(--line)',
        brand: 'var(--brand)',
        'brand-deep': 'var(--brand-deep)',
        'brand-tint': 'var(--brand-tint)',
        gold: 'var(--gold)',
      },
      fontFamily: {
        sans: ['Schibsted Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
