import React from 'react';
import ReactMarkdown from 'react-markdown';
import { EnrichedCompanyData } from '../types';

interface ICPDisplayProps {
  data: EnrichedCompanyData;
}

const ICPDisplay: React.FC<ICPDisplayProps> = ({ data }) => {
  const sections = data.split('\n\n');

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n');
        return (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              <ReactMarkdown>{title}</ReactMarkdown>
            </h3>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{content.join('\n')}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ICPDisplay;