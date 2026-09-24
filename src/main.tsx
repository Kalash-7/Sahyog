import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SahyogProvider } from './context/SahyogContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SahyogProvider>
      <App />
    </SahyogProvider>
  </StrictMode>,
)
