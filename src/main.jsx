import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/Authcontext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <SearchProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </SearchProvider>
    </AuthProvider>
)
