import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ICPInsightsModalProps {
  data: string;
  onClose: () => void;
}

const ICPInsightsModal: React.FC<ICPInsightsModalProps> = ({ data, onClose }) => {
  const sections = data.split('\n\n').filter(section => section.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl max-w-6xl w-full shadow-2xl overflow-hidden"
      >
        <div className="p-8 w-full h-full max-h-[90vh] overflow-y-auto">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-8 text-indigo-800 text-center"
          >
            Ideal Customer Profile Insights
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => {
              const [title, ...content] = section.split('\n');
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-4">
                    <ReactMarkdown
                      components={{
                        p: ({ ...props }) => <h3 className="text-xl font-semibold text-indigo-800" {...props} />,
                        strong: ({ ...props }) => <strong className="font-bold text-indigo-900" {...props} />,
                        em: ({ ...props }) => <em className="italic text-indigo-800" {...props} />,
                        a: ({ ...props }) => <a className="text-indigo-700 underline" {...props} />,
                        code: ({ ...props }) => <code className="text-indigo-800 bg-indigo-100 rounded px-1" {...props} />,
                      }}
                    >
                      {title}
                    </ReactMarkdown>
                  </div>
                  <div className="p-6">
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ ...props }) => <h3 className="text-xl font-semibold mb-3 text-indigo-700" {...props} />,
                          h2: ({ ...props }) => <h4 className="text-lg font-medium mb-2 text-indigo-600" {...props} />,
                          p: ({ ...props }) => <p className="mb-2 text-gray-700" {...props} />,
                          ul: ({ ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
                          li: ({ ...props }) => <li className="mb-1 text-gray-600" {...props} />,
                        }}
                      >
                        {content.join('\n')}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div 
            className="mt-10 flex justify-end"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 font-semibold"
            >
              Close
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ICPInsightsModal;