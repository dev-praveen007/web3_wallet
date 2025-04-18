import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <motion.button
      className={`flex items-center w-40 justify-center space-x-2 p-3 rounded-full text-white transition-all duration-300
        font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600
      `}
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isCopied ? <CheckCircle size={24} /> : <Copy size={24} />}
      <span>{isCopied ? 'Copied' : 'Copy'}</span>
    </motion.button>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyButton;
