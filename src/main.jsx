import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/web3_wallet">
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
