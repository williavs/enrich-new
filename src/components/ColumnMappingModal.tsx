import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ColumnMappingModalProps {
  headers: string[];
  initialMapping: { companyName: string; website: string };
  onComplete: (mapping: { companyName: string; website: string }) => void;
  onClose: () => void;
}

const ColumnMappingModal: React.FC<ColumnMappingModalProps> = ({ headers, initialMapping, onComplete, onClose }) => {
  const [mapping, setMapping] = useState(initialMapping);

  useEffect(() => {
    setMapping(initialMapping);
  }, [initialMapping]);

  const handleMappingChange = (field: 'companyName' | 'website', value: string) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    onComplete(mapping);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl max-w-md w-full shadow-2xl"
      >
        <div className="p-8 w-full h-full">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-6 text-indigo-700 text-center"
          >
            Match Your Data
          </motion.h2>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 text-center"
          >
            Help us understand your file. Which columns contain the company name and website?
          </motion.p>
          <div className="space-y-6">
            {['companyName', 'website'].map((field, index) => (
              <motion.div 
                key={field}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {field === 'companyName' ? 'Company Name' : 'Website'}
                </label>
                <div className="relative">
                  <select
                    value={mapping[field as keyof typeof mapping]}
                    onChange={(e) => handleMappingChange(field as 'companyName' | 'website', e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none shadow-sm"
                  >
                    <option value="">Choose column</option>
                    {headers.map(header => (
                      <option key={header} value={header}>{header}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-10 flex justify-end space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Confirm
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ColumnMappingModal;