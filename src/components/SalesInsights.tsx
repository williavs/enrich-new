import React from 'react';
import { EnrichedCompany } from '../types'; // Create this type file if it doesn't exist

interface SalesInsightsProps {
  data: EnrichedCompany[];
}

const SalesInsights: React.FC<SalesInsightsProps> = ({ data }) => {
  // Use data here if needed
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">AI-Generated Sales Insights</h2>
      <p>AI-generated insights will be displayed here in the future.</p>
    </div>
  );
};

export default SalesInsights;