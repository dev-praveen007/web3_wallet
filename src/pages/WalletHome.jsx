import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addressshowing, copyData, getLocal, getTransactionsByAddress, isEmpty, setLocal, stopFunction } from '../utils/common';
import { networks } from '../utils/networks';
import { getBalance } from '../utils/web3.utils';
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { setAllwallets, setcurrentWallet, setCurrentWalletIndex } from '../redux/slice';
import { useDispatch } from 'react-redux';
import { Copy } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

const WalletHome = () => {

    const [cryptoData, setCryptoData] = useState([]);
    const [walletData, setWalletData] = useState([]);
    const [currentWallet, setCurrentWallet] = useState([]);
    const [setTotalAmt, setTotalAmount] = useState(0);
    const [transaction, setTransaction] = useState([]);

    const getWalletData = getLocal("wallets");
    const getcurrentWalletIndex = getLocal("currentWallet");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("walletData", walletData, getWalletData, currentWallet, getcurrentWalletIndex, transaction);

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
                        ids: "ethereum,binancecoin,matic-network",
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

    const getWallets = async (cryptoDatas, index) => {
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
        setTransaction(getTransactionsByAddress(currentWallet?.address) || [])
        dispatch(setcurrentWallet(currentWallet))
    }

    const onWalletChange = async (val, index) => {
        setLocal("currentWallet", index);
        await stopFunction(1000)
        getWallets(cryptoData, index)
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* <h1 className="text-2xl font-bold mb-4">Crypto Wallet</h1> */}


            <div className="bg-gray-900 text-white min-h-screen p-6">
                {/* Header */}
                <header className="flex justify-center items-center mb-8 gap-2">
                    {/* <div className="text-xl font-bold">CryptoWallet</div> */}
                    <Dropdown data={walletData} selectedData={addressshowing(getWalletData[getcurrentWalletIndex]?.address)} onSelect={onWalletChange} /> <CirclePlus className='cursor-pointer' onClick={()=>navigate("/add-wallet")} />
                    {/* <div className="text-sm">{getWalletData?.[getcurrentWalletIndex]?.address}</div> */}
                </header>

                {/* Balance */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">${setTotalAmt}</h1>
                    <p className="text-gray-400">Total Balance</p>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-4 mb-8">
                    <button className="bg-blue-500 px-6 py-2 rounded-lg" onClick={() => navigate("/send-crypto")} >Send</button>
                    <button className="bg-green-500 px-6 py-2 rounded-lg" onClick={() => navigate("/receive-crypto")}>Receive</button>
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
                {transaction && transaction?.length != 0 ?
                    <div className="mt-8 w-full px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
                        <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-md">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-900 text-gray-300 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Type</th>
                                        <th className="px-6 py-3 text-left">Amount</th>
                                        <th className="px-6 py-3 text-left">To address</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Transaction Hash</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700 text-white text-sm">
                                    {transaction && transaction?.length != 0 &&
                                        transaction?.map((item) => (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item?.date).toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.amount} {item?.coin || "ETH"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-blue-400 flex-row flex gap-2"  >{addressshowing(item?.toAddress)} <Copy size={18} onClick={() => copyData(item?.toAddress)} /></p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-block px-2 py-1 text-${item?.status === "Confirmed" ? "green" : "red"}-400 bg-${item?.status === "Confirmed" ? "green" : "red"}-900 rounded-full text-xs font-semibold`}>
                                                        {item?.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {!isEmpty(item?.hash) && <p className="text-blue-400  flex-row flex gap-2" >{addressshowing(item?.hash)} <Copy size={18} onClick={() => copyData(item?.hash)} /></p>}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {/* Add more rows here as needed */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <p>No data found</p>
                }


                {/* Footer */}
                {/* <footer className="mt-8 text-center text-gray-400">
                    <p>Support | Settings | About</p>
                </footer> */}
            </div>
        </div>
    );

};

export default WalletHome;