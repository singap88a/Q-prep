import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Approuting from './Router/Approuting';
import AuthProvider from './components/Auth/AuthContext.jsx'
import MainTrackProvider from './Context/MainTrackProvider.jsx';







createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <MainTrackProvider>
      <Approuting />
    </MainTrackProvider>
  </AuthProvider>
)
