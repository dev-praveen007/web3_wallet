// utils/cryptoUtils.js
import CryptoJS from "crypto-js";
import toast, { Toaster } from 'react-hot-toast';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Encrypt function
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
export const decryptData = (ciphertext) => {
    if (!ciphertext) return
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

//Toast function
export const showToast = (type, msg, others) => {
    return toast[type](msg, others)
}

// set values to the local storage in encrption.
export const setLocal = (key, value) => localStorage.setItem(key, encryptData(JSON.stringify({ data: value })))

// get values from the local storage with decryption.
export const getLocal = (key) => JSON.parse(decryptData(localStorage.getItem(key)) || "{}")?.data

export const addressshowing = (data) => {
    if (data?.length > 10) {
        var address = data?.substring(0, 10) + '...' + data?.substring(data.length - 11, data.length - 1)
    } else {
        var address = data
    }
    return address
}

export const stopFunction = async (ms) => await new Promise(res => setTimeout(() => res(), ms));

export const getUniqueRandomNumbers = (min, max, count) => {
    let numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return [...numbers];
}

export const isEmpty = (value) =>
    value === undefined ||
    value == "undefined" ||
    value === null ||
    value == false ||
    value == "false" ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" && Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "string" && value === "0") ||
    (typeof value === "number" && value === 0);


export const saveTransaction = async (fromAddress, toAddress, amount, hash, status, coin) => {
    try {
        const getWalletHistory = getLocal(`${fromAddress}-transaction`);
        const saveObj = { fromAddress, toAddress, amount, hash, type: "Send", date: Date.now(), status, coin }
        if (getWalletHistory && getWalletHistory?.length != 0) {
            setLocal(`${fromAddress}-transaction`, [...getWalletHistory, saveObj])
        } else {
            setLocal(`${fromAddress}-transaction`, [saveObj])
        }
    } catch (e) {
        console.error("saveee", e);
    }
}

export const getTransactionsByAddress = (address) => {
    try {
        return getLocal(`${address}-transaction`)
    } catch (e) {
        console.log("error on getTransactionsByAddress", e);
        return []
    }
}

export const copyData = (text) => {
    try {
        navigator.clipboard.writeText(text)
            .then(() => {
                showToast("success", "Copied successfully")
            })
            .catch(err => {
                showToast("error", "Failed to copy");
                console.error('Failed to copy text: ', err)
            });

    } catch (e) {
        console.log("erro ", e);
    }
}