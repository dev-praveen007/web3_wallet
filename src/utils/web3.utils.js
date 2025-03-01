import { ethers } from "ethers"
import Web3 from "web3"

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
        console.log("errorn on getBalance",e,rpc);
        return 0
    }
}