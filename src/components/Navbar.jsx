import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, setAllwallets, setcurrentWallet, setCurrentWalletIndex } from '../redux/slice';
import { getLocal, isEmpty } from '../utils/common';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { currentWallet } = useSelector(state => state.wallet)
  console.log("currentWallet",currentWallet);
  
  const dispatch = useDispatch();

  useEffect(() => {
    initialRender()
  }, [])

  const initialRender = () => {
    const getWalletData = getLocal("wallets");
    const getcurrentWalletIndex = getLocal("currentWallet");
    console.log("getWalletData", getWalletData);

    if (getWalletData && getWalletData?.length != 0) {
      dispatch(setAllwallets(getWalletData))
      dispatch(setCurrentWalletIndex(getcurrentWalletIndex))
      dispatch(setcurrentWallet(getWalletData[getcurrentWalletIndex]));
    }
  }

  const onLogOut = () => {

    const check = confirm("Are you sure, You want to logout. By doing this acion you'll lose your assets.")
    if (!check) return;

    window.location.href = "/";
    dispatch(clearData());
    localStorage.clear();
  }

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section with Home Link */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Web3-Wallet</h1>
          </Link>
        </div>

        {/* Home and DAppBrowser Buttons */}
        <div className="flex space-x-2">
          {/* <Link
            to="/"
            className="bg-indigo-500 hover:bg-gray-600 text-white py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out text-xs sm:text-sm md:text-base"
          >
            Home
          </Link> */}
          {!isEmpty(currentWallet) && <div
            onClick={() => onLogOut()}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 flex gap-2 flex-row text-white py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out text-xs sm:text-sm md:text-base"
          >
            Logout  <LogOut className='mt-1' strokeWidth={2} size={18} />
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
