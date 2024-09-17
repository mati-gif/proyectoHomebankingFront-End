import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
/* import './index.css' */
import { Provider } from 'react-redux';

// main.jsx
import store from './redux/store.js';


createRoot(document.getElementById('root')).render(

    <Provider store={store}> {/* Este provedor se va a encargar de darle el contexto necesario al resto de compoonentes hijos para poder acceder al resto del store de redux */}
        <App />
    </Provider>,

)
