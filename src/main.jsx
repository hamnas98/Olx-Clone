import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/Auth.jsx'
import { ItemsContextProvider } from './Components/Context/Item.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store, persistor} from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'




createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
<PersistGate loading = {null} persistor={persistor}>
<ItemsContextProvider>
  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthProvider>
  </ItemsContextProvider>
</PersistGate>
</Provider>
</BrowserRouter>
)
