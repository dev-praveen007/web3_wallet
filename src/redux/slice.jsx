import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allWallets: [],
    currentWalletIndex: null,
    currentWallet: [],
    selectedData: {}
}

const walletSlice = createSlice({
    name: "web3-wallet",
    initialState,
    reducers: {
        setAllwallets: (state, action) => {
            const payload = action.payload;
            state.allWallets = payload
        },
        setCurrentWalletIndex: (state, action) => {
            const payload = action.payload;
            state.currentWalletIndex = payload
        },
        setcurrentWallet: (state, action) => {
            const payload = action.payload;
            state.currentWallet = payload
        },
        setSelectedData: (state, action) => {
            const payload = action.payload;
            state.selectedData = payload
        },
        clearData: (state, action) => {
            return initialState
        },
    }
})

export const { setAllwallets, setCurrentWalletIndex, setcurrentWallet, setSelectedData, clearData } = walletSlice.actions;

export default walletSlice.reducer;