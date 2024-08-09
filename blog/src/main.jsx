import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store.js';

const root=ReactDOM.createRoot(document.getElementById('root'));
const clientId="961098686120-p4pulrerjjelk6bhsbegd84m4r4mbdk7.apps.googleusercontent.com"
root.render(
   <React.StrictMode>
    <BrowserRouter>
     <Provider store={store}>
        <App />
     </Provider>
    </BrowserRouter>
 
</React.StrictMode>
)
