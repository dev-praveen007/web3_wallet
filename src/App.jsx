// App.jsx
import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import DAppBrowserPage from './pages/DAppBrowserPage';
import Navbar from './components/Navbar';
import CreateorImport from './pages/CreateorImport';

function App() {
  return (
    <>
      <Analytics />
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dapp-browser" element={<DAppBrowserPage />} />
        <Route path="/create-or-import" element={<CreateorImport />} />
      </Routes>
    </>
  );
}

export default App;
