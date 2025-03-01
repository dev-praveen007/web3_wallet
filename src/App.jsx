// App.jsx
import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import DAppBrowserPage from './pages/DAppBrowserPage';
import Navbar from './components/Navbar';
import CreateorImport from './pages/CreateorImport';
import toast, { Toaster } from 'react-hot-toast';
import WalletHome from './pages/WalletHome';


function App() {
  return (
    <>
      <Analytics />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dapp-browser" element={<DAppBrowserPage />} />
        <Route path="/create-or-import" element={<CreateorImport />} />
        <Route path="/walletHome" element={<WalletHome />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
