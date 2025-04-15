import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MnemonicCard from '../components/MnemonicCard';
import CopyButton from '../components/CopyButton';
import MotionButton from '../components/MotionButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocal, getUniqueRandomNumbers, setLocal, showToast } from '../utils/common';
import { createEvmWallet } from '../utils/web3.utils';

const CreateWallet = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const mnemonic = location.state?.mnemonic;

    const [words, setWords] = useState([]);
    const [curInd, setCurInd] = useState([])

    console.log("mamamam", words, words.join(" "), mnemonic)
    useEffect(() => {
        const markedIndex = getUniqueRandomNumbers(0, 11, 3);
        if (mnemonic) {
            setCurInd(markedIndex)
            setWords(mnemonic.split(' ')?.map((v, i) => markedIndex.includes(i) ? "" : v))
        }
    }, [mnemonic])

    const handleClick = async () => {
        if (words.includes("")) return showToast("error", "Please fill the missing words.");
        if (words.join(" ") !== mnemonic) return showToast("error", "Not a valid seed.");

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
        showToast("success", "Wallet created successfully")
        navigate("/walletHome")
    }

    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative h-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                            Your Seed Phrase
                        </h2>
                        <p className="text-gray-300">
                            Copy it, Keep it safe and{' '}
                            <span className="text-red-500 font-semibold">
                                away from scammers
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {words.map((word, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                className="relative"
                            >
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                                    {index + 1}
                                </div>
                                {curInd.includes(index) ?
                                    <motion.div
                                        className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl shadow-lg border border-gray-600 backdrop-blur-lg flex items-center justify-center"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <input
                                            type="text"
                                            className="w-full text-center bg-transparent text-white outline-none placeholder-gray-400"
                                            placeholder="Enter word"
                                            onChange={(e) => {
                                                words[index] = e.target.value
                                                setWords([...words])
                                            }}
                                            value={words[index]}
                                        />
                                    </motion.div>

                                    : <MnemonicCard word={word} />}

                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex justify-around mt-6">
                        {/* <CopyButton text={mnemonic} /> */}
                        <MotionButton text={"Back"} onClick={() => navigate(-1)} />
                        <MotionButton text={"Next"} onClick={() => handleClick()} />
                    </div>

                </motion.div>
            </section>
        </div>
    );

}

export default CreateWallet;