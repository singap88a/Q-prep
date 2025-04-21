import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Approuting from './Router/Approuting';
import AuthProvider from './components/Auth/AuthContext.jsx'







createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <Approuting />
  </AuthProvider>
  // </StrictMode>,
)
