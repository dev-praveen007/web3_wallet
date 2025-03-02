import { configureStore } from "@reduxjs/toolkit";
import walletReducer from './slice'

const store = configureStore({ reducer: { wallet: walletReducer } });

export default store;
