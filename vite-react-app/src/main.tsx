import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Temporarily disabling StrictMode to avoid duplicate api calls.
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
