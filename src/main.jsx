import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </>
);
