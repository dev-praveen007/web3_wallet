import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addressshowing, getLocal, setLocal, stopFunction } from '../utils/common';
import { networks } from '../utils/networks';
import { getBalance } from '../utils/web3.utils';
import Dropdown from '../components/Dropdown';

const WalletHome = () => {

    const [cryptoData, setCryptoData] = useState([]);
    const [walletData, setWalletData] = useState([]);
    const [currentWallet, setCurrentWallet] = useState([]);
    const [setTotalAmt, setTotalAmount] = useState(0);

    const getWalletData = getLocal("wallets");
    const getcurrentWalletIndex = getLocal("currentWallet");

    console.log("walletData", walletData, currentWallet,getcurrentWalletIndex);

    useEffect(() => {
        fetchMarketPrices();
    }, []);

    const fetchMarketPrices = async () => {
        try {
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets",
                {
                    params: {
                        vs_currency: "usd",
                        ids: "bitcoin,ethereum,binancecoin",
                    },
                }
            );
            setCryptoData(response.data);
            console.log("response.data", response.data);

            getWallets(response.data)
        } catch (error) {
            console.error("Error fetching market prices", error);
            getWallets()
        }
    };

    const getWallets = async (cryptoDatas,index) => {
        let currentWallet = getWalletData[index || getcurrentWalletIndex]
        console.log("cryptoDatas", cryptoDatas, currentWallet);
        let totalUsdAmt = 0;
        if (cryptoDatas?.length != 0) {
            var newWalletData = await Promise.all(cryptoDatas?.map(async (val) => {

                const walletObj = {
                    current_price: val?.current_price,
                    image: val?.image,
                    name: val?.name,
                    symbol: val?.symbol?.toUpperCase()
                }

                const getChain = networks[val?.symbol?.toUpperCase()];
                console.log("getCHain", getChain);
                if (getChain) {
                    const balance = await getBalance(getChain.rpc, currentWallet?.address)
                    walletObj.balance = balance
                    totalUsdAmt += Number(Number(balance) * val?.current_price)
                } else {
                    walletObj.balance = "0"
                }

                return walletObj
            }))
        }
        setWalletData(getWalletData?.map((val) => ({ ...val, label: addressshowing(val?.address) })));
        setCurrentWallet(newWalletData || cryptoData)
        setTotalAmount(totalUsdAmt?.toFixed(8) || 0)
    }

    const onWalletChange = async (val, index) => {
        setLocal("currentWallet", index);
        await stopFunction(1000)
        getWallets(cryptoData,index)
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* <h1 className="text-2xl font-bold mb-4">Crypto Wallet</h1> */}


            <div className="bg-gray-900 text-white min-h-screen p-6">
                {/* Header */}
                <header className="flex justify-center items-center mb-8">
                    {/* <div className="text-xl font-bold">CryptoWallet</div> */}
                    <Dropdown data={walletData} selectedData={addressshowing(getWalletData[getcurrentWalletIndex]?.address)} onSelect={onWalletChange} />
                    {/* <div className="text-sm">{getWalletData?.[getcurrentWalletIndex]?.address}</div> */}
                </header>

                {/* Balance */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">${setTotalAmt}</h1>
                    <p className="text-gray-400">Total Balance</p>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-4 mb-8">
                    <button className="bg-blue-500 px-6 py-2 rounded-lg">Send</button>
                    <button className="bg-green-500 px-6 py-2 rounded-lg">Receive</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentWallet.map((crypto) => (
                        <div
                            key={crypto.name}
                            className="bg-gray-800 p-4 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-semibold">{crypto?.name}</h2>
                                <img src={crypto?.image} alt={crypto?.name} className="w-8 h-8" />
                            </div>
                            <p className="text-gray-400">Price: ${crypto?.current_price}</p>
                            <p className="text-gray-400">Balance: {crypto?.balance} {crypto?.symbol?.toUpperCase()}</p>
                        </div>
                    ))}
                </div>

                {/* Network Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-lg font-bold">Ethereum</h2>
                        <p className="text-gray-400">ETH: $1,800</p>
                        <p className="text-green-500">+2.5%</p>
                        <p className="text-gray-400">Balance: 0.5 ETH</p>
                    </div>
                </div> */}



                {/* Transaction History */}
                <div className="bg-gray-800 p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Transaction Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-10-01</td>
                                <td>Send</td>
                                <td>0.1 ETH</td>
                                <td className="text-green-500">Confirmed</td>
                                <td className="text-blue-500">0x123...456</td>
                            </tr>
                            {/* Add more rows here */}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <footer className="mt-8 text-center text-gray-400">
                    <p>Support | Settings | About</p>
                </footer>
            </div>
        </div>
    );

};

export default WalletHome;