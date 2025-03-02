import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MnemonicContainer from '../components/MnemonicContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocal, setLocal, showToast } from '../utils/common';
import { createEvmWallet } from '../utils/web3.utils';

const CreateorImport = () => {
    const [mnemonic, setMnemonic] = useState('');
console.log("mnemonic",mnemonic);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("location?.state",location?.state);
        
        if (location?.state?.type === "create") setMnemonic(location?.state?.mnemonic);
    }, [location?.state])


    const handleAddWallet = async () => {
        if (!mnemonic) return showToast("error", "Mnemonic not found")
        const getWallet = await createEvmWallet(mnemonic);


        const wallet = {
            address: getWallet.address,
            privateKey: getWallet.privateKey,
            mnemonic
        }

        const getExistArr = getLocal("wallets")

        if (!getExistArr) {
            setLocal("wallets", [wallet]);
            setLocal("currentWallet", 0)
        }
        else {
            setLocal("wallets", [...getExistArr, wallet]);
            setLocal("currentWallet", getExistArr?.length)
        }
        showToast("success", location.state == "create" ? "Wallet created successfully" : "Wallet imported successfully")
        navigate("/walletHome")
    };


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

                {/* Mnemonic and Wallets Section */}
                {location.state?.type == "create" ?
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto"
                    >
                        {mnemonic && (
                            <>
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-700 mb-12 w-full">
                                    <MnemonicContainer mnemonic={mnemonic} />
                                </div>

                                {/* <div className="flex flex-col lg:flex-row lg:justify-center items-stretch space-y-8 lg:space-y-0 lg:space-x-10 w-full">
                                <SolanaWallet mnemonic={mnemonic} />
                                <EthWallet mnemonic={mnemonic} />
                            </div> */}
                            </>
                        )}
                    </motion.div> :
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto"
                    >
                        <div className='w-full' >
                            <label for="first_name" class="text-xl lg:text-1xl text-gray-300 max-w-2xl mx-auto mb-10">Enter your mnemonic</label>
                            <input
                                type="text"
                                id="first_name"
                                onChange={(e) => setMnemonic(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seed phrase" />
                        </div>


                        <button
                            className={`p-2 rounded-3xl m-8 transition-all duration-300 ease-in-out bg-rose-500 hover:bg-green-600 hover:scale-105`}
                            onClick={handleAddWallet}
                        >
                            Import wallet
                        </button>
                    </motion.div>
                }
            </section>
        </div>
    );
};

export default CreateorImport;
