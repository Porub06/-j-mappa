import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
