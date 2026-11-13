import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/fraunces/opsz.css'
import './style.css'
import colors from './data/colors.json'
import App from './App.jsx'

const root = document.documentElement.style
root.setProperty('--text', colors.text)
for (const [name, hex] of Object.entries({ ...colors.primary, ...colors.supplementary, ...colors.shades })) {
  root.setProperty(`--${name}`, hex)
}
document.querySelector("meta[name='theme-color']").content = colors.text

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)