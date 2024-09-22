import React from 'react';

interface DataPreviewProps {
  data: any[];
  mapping: { companyName: string; website: string };
}

const DataPreview: React.FC<DataPreviewProps> = ({ data, mapping }) => {
  if (!data.length) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {mapping.companyName}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {mapping.website}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(0, 10).map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row[mapping.companyName]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row[mapping.website]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 10 && (
        <p className="mt-2 text-sm text-gray-500">Showing first 10 rows of {data.length} total rows.</p>
      )}
    </div>
  );
};

export default DataPreview;