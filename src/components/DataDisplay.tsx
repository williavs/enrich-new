import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { EnrichedCompany, EnrichedCompanyData } from '../types';

interface DataDisplayProps {
  data: EnrichedCompany[] | EnrichedCompanyData;
  onEnrich: () => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, onEnrich }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data to display</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Uploaded Data</h2>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={`${index}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length > 5 && (
          <p className="mt-2 text-sm text-gray-500">Showing 5 of {data.length} rows</p>
        )}
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <button
          onClick={onEnrich}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Enrich Data
        </button>
      </div>
    </div>
  );
};

export default DataDisplay;