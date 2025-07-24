import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/Auth.jsx'
import { ItemsContextProvider } from './Components/Context/Item.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store.js'


createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
<ItemsContextProvider>
  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthProvider>
  </ItemsContextProvider>
</Provider>
</BrowserRouter>
)
