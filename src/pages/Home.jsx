import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { generateMnemonic } from 'bip39';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageLoader } from '../components/PageLoader';
import { isEmpty } from '../utils/common';

const Home = () => {
  const { currentWallet } = useSelector(state => state.wallet)

  const [loader, setLoader] = useState(true);

  const navigate = useNavigate()

  const onCreateWalletClick = async () => {
    const mn = generateMnemonic();
    navigate("/create-or-import", { state: { type: "create", mnemonic: mn } })
  }

  useMemo(() => {
    console.log("currentWallet", currentWallet);

    if (!isEmpty(currentWallet)) setTimeout(() => navigate("/walletHome"), 2000);
  }, [currentWallet])

  useEffect(() => {
    setTimeout(() => setLoader(false), 2000)
  }, [])

  if (loader) return <PageLoader />;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/videos/crypto-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-8 mb-10"
          >
            Unlock the Future of Crypto
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Securely generate your seed phrases and manage your Solana and Ethereum wallets. All in one place.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCreateWalletClick()}
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mb-12"
          >
            Create Seed Phrase
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-or-import", { state: "import" })}
            className="px-8 py-4 ml-2 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mb-12"
          >
            Import wallet
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;
