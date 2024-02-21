import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@assets/css/app.scss"
import { Web3ContextProvider } from "@components/Web3ContextProvider.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>,
)
