import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Theme } from "@radix-ui/themes";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme accentColor="lime" panelBackground="solid" appearance="dark">
      <App />
    </Theme>
  </StrictMode>,
)
