/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import 'regenerator-runtime/runtime'
import AudioProvider from './context/AudioContext.jsx'


let persistor = persistStore(store)
// https://gist.githubusercontent.com/kartikraiyani03/a7207dc5bbf9b206692681c6e8a51ceb/raw/d7d4b6770a6064f70235f9cc797464e1e4ddac63/artistObject.json

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AudioProvider>
            <App />
          </AudioProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  </BrowserRouter>
)
