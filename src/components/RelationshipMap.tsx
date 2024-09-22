import React from 'react';
import { EnrichedCompany } from '../types'; // Create this type file if it doesn't exist

interface RelationshipMapProps {
  data: EnrichedCompany[];
}

const RelationshipMap: React.FC<RelationshipMapProps> = ({ data }) => {
  // Use data here if needed
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Company Relationship Map</h2>
      <p>An interactive relationship map will be displayed here in the future.</p>
    </div>
  );
};

export default RelationshipMap;