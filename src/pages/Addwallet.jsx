import React, { useState } from 'react';
import { getLocal, setLocal, showToast } from '../utils/common';
import { checkMnemonic, createEvmWallet, createWalletPrivKey } from '../utils/web3.utils';
import { useNavigate } from 'react-router-dom';

const AddWallet = () => {
    const [activeTab, setActiveTab] = useState('phrase');
    const [mnemonic, setMnemonic] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    const navigate = useNavigate()

    const handleAddWalletMnemonic = async () => {
        console.log("aiwdh");

        if (!mnemonic) return showToast("error", "Mnemonic not found");
        if (!checkMnemonic(mnemonic)) return showToast("error", "Enter valid mnemonic");
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
        showToast("success", "Wallet imported successfully")
        navigate(-1);
    };

    const handleAddWalletPrivKey = async () => {
        if (!privateKey) return showToast("error", "Privatekey not found");
        const address = createWalletPrivKey(privateKey)
        if (!address) return showToast("error", "Enter valid privateKey");
        const getWallet = await createEvmWallet(privateKey);


        const wallet = {
            address: address,
            privateKey: privateKey,

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
        showToast("success", "Wallet imported successfully")
        navigate(-1);
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Add Wallet</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'phrase'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    onClick={() => setActiveTab('phrase')}
                >
                    Phrase
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'privateKey'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    onClick={() => setActiveTab('privateKey')}
                >
                    Private Key
                </button>
            </div>

            {/* Panels */}
            <div className="w-full max-w-md space-y-6">
                {activeTab === 'phrase' && (
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Import with Mnemonic Phrase</h2>
                        <textarea
                            onChange={(e) => setMnemonic(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            value={mnemonic}
                            placeholder="Enter your 12 or 24 word recovery phrase"
                        ></textarea>
                        <button
                            onClick={() => handleAddWalletMnemonic()}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Import Wallet
                        </button>
                    </div>
                )}

                {activeTab === 'privateKey' && (
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Import with Private Key</h2>
                        <input
                            type="text"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your private key"
                        />
                        <button
                            onClick={() => handleAddWalletPrivKey()}
                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Import Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddWallet;
