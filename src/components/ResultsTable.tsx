import React, { useState } from 'react';
import { EnrichedCompany } from '../types';

interface ResultsTableProps {
  results: EnrichedCompany[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const itemsPerPage = 10;
  const filteredResults = results.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th className="px-6 py-3">Company Name</th>
              <th className="px-6 py-3">Website</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResults.map((row, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-indigo-50 transition-colors duration-200'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4">
                    <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      {row.website}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {expandedRow === index ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 bg-indigo-50">
                      <pre className="whitespace-pre-wrap">{row.Enriched_Data}</pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredResults.length)} of {filteredResults.length} results
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;