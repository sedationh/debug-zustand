import React from 'react'
// eslint-disable-next-line import/extensions
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
