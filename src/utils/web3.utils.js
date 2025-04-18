import { ethers, formatEther, isAddress, Mnemonic, parseEther, Wallet } from "ethers"
import Web3 from "web3"
import { saveTransaction } from "./common"

const web3Instance = (rpc) => {
    return new Web3(rpc)
}

export const getBalance = async (rpc, address) => {
    try {
        const web3 = web3Instance(rpc)
        const balance = await web3.eth.getBalance(address);
        console.log("balance", balance);
        return parseFloat(ethers.formatEther(balance)).toFixed(8)
    } catch (e) {
        console.log("errorn on getBalance", e, rpc);
        return 0
    }
}

export const createEvmWallet = async (seed) => {
    try {
        const mnemonicWallet = ethers.Wallet.fromPhrase(seed);

        return { address: mnemonicWallet.address, privateKey: mnemonicWallet.privateKey }
    } catch (e) {
        console.log("createEvmWallet_err", e);
    }
}

export const checkAddress = (address) => {
    try {
        return isAddress(address);
    } catch (e) {
        console.log("error checkAddress", e);
        return false;
    }
}

export const checkMnemonic = (mn) => Mnemonic.isValidMnemonic(mn);

export const createWalletPrivKey = (key) => {
    try {
      const wallet = new Wallet(key);
      return wallet.address; 
    } catch (err) {
      return false;
    }
};

export const sendEthWithPrivateKey = async (recipientAddress, amount, privKey, rpc, coin) => {
    const provider = new ethers.JsonRpcProvider(rpc)

    const wallet = new ethers.Wallet(privKey, provider);

    const amountInWei = parseEther(String(amount), privKey);

    const tx = {
        to: recipientAddress,
        value: amountInWei,
    };

    try {
        const sentTx = await wallet.sendTransaction(tx);
        console.log("Transaction sent:", sentTx.hash);
        await sentTx.wait();
        saveTransaction(wallet.address, recipientAddress, amount, sentTx.hash, "Confirmed", coin)
        return true;
    } catch (error) {
        console.error("Transaction failed:", error);
        saveTransaction(wallet.address, recipientAddress, amount, "", "Failed", coin)
        return false;
    }
};
