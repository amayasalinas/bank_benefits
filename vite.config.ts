import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions sets GITHUB_ACTIONS=true — use sub-path for GitHub Pages.
// Vercel and local dev use root path '/'.
const base = process.env.GITHUB_ACTIONS ? '/bank_benefits/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
