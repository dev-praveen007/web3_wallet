import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Dropdown from '../components/Dropdown';
import { addressshowing, getLocal, isEmpty, showToast } from '../utils/common';

const ReceiveCrypto = () => {

    const [walletData, setWalletData] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState({})
    console.log("walletAddress", selectedWallet);

    const getWalletData = getLocal("wallets");
    const getcurrentWalletIndex = getLocal("currentWallet");


    useEffect(() => {
        setWalletData(getWalletData?.map((val) => ({ ...val, label: addressshowing(val?.address) })));
        setSelectedWallet(getWalletData[getcurrentWalletIndex])
    }, [])

    const onWalletChange = (val,index) => {
        setSelectedWallet(val)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white px-4">
            <div className="bg-[#1C2233] p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Receive Crypto</h2>

                <div className="bg-[#fff] rounded-xl p-4 flex flex-col items-center space-y-4">
                    {!isEmpty(selectedWallet) && <QRCodeSVG
                        value={selectedWallet?.address}
                        // size={160}
                        // bgColor="#000"
                        // fgColor="#ffffff"
                        // level="H"
                        // includeMargin={true}
                    />}

                    <Dropdown data={walletData} selectedData={addressshowing(selectedWallet?.address)} onSelect={onWalletChange} />

                    {/* <p className="text-sm break-all">{selectedWallet?.address}</p> */}

                    <button
                        className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                        onClick={() => {
                            navigator.clipboard.writeText(selectedWallet?.address);
                            showToast("success","Wallet address copied!");
                        }}
                    >
                        Copy Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiveCrypto;
