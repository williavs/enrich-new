'use client'

import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import EnrichmentProgress from '../components/EnrichmentProgress';
import ResultsTable from '../components/ResultsTable';
import { uploadFile, enrichData } from '../utils/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCompanies, setProcessedCompanies] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<{ companyName: string; website: string } | null>(null);

  const handleFileUpload = (uploadedFile: File, mapping: { companyName: string; website: string }) => {
    setFile(uploadedFile);
    setColumnMapping(mapping);
  };

  const handleEnrich = async () => {
    if (!file || !columnMapping) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessedCompanies(0);
    setTotalCompanies(0);
    setResults([]);

    try {
      const companies = await uploadFile(file, columnMapping);
      setTotalCompanies(companies.length);

      const enrichedData = await enrichData(companies, (progress, processed, total) => {
        setProgress(progress);
        setProcessedCompanies(processed);
        setTotalCompanies(total);
      });

      setResults(enrichedData);
    } catch (error) {
      console.error('Error enriching data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Data Enrichment Tool</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        <button
          onClick={handleEnrich}
          disabled={!file || !columnMapping || isProcessing}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Enriching...' : 'Enrich Data'}
        </button>
        {isProcessing && (
          <EnrichmentProgress
            progress={progress}
            processedCompanies={processedCompanies}
            totalCompanies={totalCompanies}
          />
        )}
        {results.length > 0 && <ResultsTable results={results} />}
      </div>
    </main>
  );
}