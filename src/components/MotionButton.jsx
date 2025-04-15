import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';

const MotionButton = ({ text, onClick }) => {

    return (

        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        className=" w-40 p-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 "
      >
        {text}
      </motion.button>

        // <motion.button
        //     className={`flex items-center w-40 justify-center space-x-2 p-3 rounded-full text-white transition-all duration-300 bg-green-500 hover:bg-green-600 `}
        //     onClick={onClick}
        //     whileHover={{ scale: 1.05 }}
        //     whileTap={{ scale: 0.95 }}
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ duration: 0.3 }}
        // >
        //     <span>{text}</span>
        // </motion.button>
    );
};

export default MotionButton;
