import React, { useEffect, useState } from "react";
import { checkAddress, getBalance, sendEthWithPrivateKey } from "../utils/web3.utils";
import { isEmpty, showToast } from "../utils/common";
import { useSelector } from "react-redux";
import { networks } from "../utils/networks";

const SendCrypto = () => {

    const { currentWallet } = useSelector(state => state.wallet)
    console.log("getWalletData", currentWallet);

    const init = {
        recipient: "",
        token: "ETH",
        amount: "",
    }
    const [err, setErr] = useState({})
    const [balance, setBalance] = useState("")
    const [formData, setFormData] = useState(init);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const err = {};

        if (!formData?.amount) err.amount = "Amount is required";
        if (!formData?.recipient) err.recipient = "Recipient address is required";
        if (formData?.recipient && !checkAddress(formData?.recipient)) err.recipient = "Enter valid address";
        if (formData?.amount && (parseFloat(formData?.amount) > parseFloat(balance))) err.amount = "Not enough balance"
        return err;
    }

    const handleSend = async () => {
        console.log("Sending:", formData);
        const valid = validation();

        if (!isEmpty(valid)) return setErr(valid);

        const id = showToast("loading", "Sending transaction.")
        const getPrivKey = currentWallet;
        const getNetWork = networks[formData?.token]
        setLoading(true)
        const send = await sendEthWithPrivateKey(formData?.recipient, formData?.amount, getPrivKey?.privateKey, getNetWork.rpc,formData?.token);
        setLoading(false)
        if (!send) return showToast("error", "Transaction failed", { id });
        showToast("success", "Amount transfered successfully", { id });
        setFormData({ ...formData, recipient: "", amount: "" });
        getBalanceForSend()
    };

    const getBalanceForSend = async () => {
        const wallet = currentWallet;
        const getNetWork = networks[formData?.token]
        const getBal = await getBalance(getNetWork.rpc, wallet?.address)
        setBalance(getBal)
    }

    useEffect(() => {
        getBalanceForSend()
    }, [currentWallet, formData?.token])



    return (
        <div className="min-h-screen bg-[#0e1624] text-white px-6 py-10">
            <div className="max-w-xl mx-auto bg-[#1e2a3a] rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Send Crypto</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Recipient Address</label>
                    <input
                        type="text"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-[#2a3b4d] text-white outline-none"
                        placeholder="0xABC123..."
                    />
                    <p className="text-sm text-red-500" >{err?.recipient}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Select Token</label>
                    <select
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-[#2a3b4d] text-white outline-none"
                    >
                        <option value="ETH">Ethereum (Sepolia)</option>
                        <option value="MATIC">Polygon (Amoy)</option>
                        <option value="BNB">BNB</option>
                    </select>
                    <p className="text-sm" >Balance: {balance}</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-[#2a3b4d] text-white outline-none"
                        placeholder="0.0"
                    />
                    <p className="text-sm text-red-500" >{err?.amount}</p>
                </div>

                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default SendCrypto;
