import React, { useState } from 'react';

interface ColumnMappingProps {
  columns: string[];
  onMappingComplete: (mapping: { companyName: string; website: string }) => void;
}

const ColumnMapping: React.FC<ColumnMappingProps> = ({ columns, onMappingComplete }) => {
  const [companyNameColumn, setCompanyNameColumn] = useState<string>('');
  const [websiteColumn, setWebsiteColumn] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMappingComplete({ companyName: companyNameColumn, website: websiteColumn });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name Column
        </label>
        <select
          id="companyName"
          value={companyNameColumn}
          onChange={(e) => setCompanyNameColumn(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select column</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website Column
        </label>
        <select
          id="website"
          value={websiteColumn}
          onChange={(e) => setWebsiteColumn(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select column</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Mapping
      </button>
    </form>
  );
};

export default ColumnMapping;