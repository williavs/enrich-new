import React from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Welcome to ITSTHELIST</h2>
        <p className="text-gray-600 mb-4">
          ITSTHELIST is your go-to platform for enriching company data and generating Ideal Customer Profiles (ICPs). 
          Here&apos;s how to get started:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Use the Bulk Enrichment feature to upload and enrich multiple company records at once.</li>
          <li>Try the ICP Enrichment to generate detailed profiles for your ideal customers.</li>
          <li>View your results in real-time and use the insights to supercharge your sales and marketing efforts!</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;