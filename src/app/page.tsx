'use client'

import React, { useState, useEffect } from 'react';
import { enrichData, enrichCompany } from '../utils/api';
import { EnrichedCompany, CompanyInputData, EnrichmentResponse } from '../types';
import CompanyInputForm from '../components/CompanyInputForm';
import UploadAnimation from '../components/UploadAnimation';
import EnrichmentProgress from '../components/EnrichmentProgress';
import DataDisplay from '../components/DataDisplay';
import FileUpload from '../components/FileUpload';
import ColumnMappingModal from '../components/ColumnMappingModal';
import ICPDisplay from '../components/ICPDisplay';
import WelcomeModal from '../components/WelcomeModal';
import ResultsTable from '../components/ResultsTable';

export default function Home() {
  const [uploadedCompanies, setUploadedCompanies] = useState<EnrichedCompany[]>([]);
  const [enrichedCompanies, setEnrichedCompanies] = useState<EnrichedCompany[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentProgress, setEnrichmentProgress] = useState(0);
  const [icpEnrichedData, setIcpEnrichedData] = useState<EnrichmentResponse | null>(null);
  const [showColumnMappingModal, setShowColumnMappingModal] = useState(false);
  const [fileHeaders, setFileHeaders] = useState<string[]>([]);
  const [fileData, setFileData] = useState<Record<string, string>[]>([]);
  const [initialMapping, setInitialMapping] = useState<{ companyName: string; website: string }>({ companyName: '', website: '' });
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  useEffect(() => {
    if (!isUploading && uploadedCompanies.length > 0) {
      setIsUploadComplete(true);
    }
  }, [isUploading, uploadedCompanies]);

  const handleFileUpload = (file: File, data: Record<string, string>[]) => {
    setFileData(data);
  };

  const autoMapColumns = (headers: string[]) => {
    const companyNameGuess = headers.find(h => 
      h.toLowerCase().includes('company') || h.toLowerCase().includes('name')
    ) || '';
    const websiteGuess = headers.find(h => 
      h.toLowerCase().includes('website') || h.toLowerCase().includes('url')
    ) || '';
    return { companyName: companyNameGuess, website: websiteGuess };
  };

  const handleShowColumnMapping = (headers: string[], data: Record<string, string>[]) => {
    setFileHeaders(headers);
    setFileData(data);
    const guessedMapping = autoMapColumns(headers);
    setInitialMapping(guessedMapping);
    setShowColumnMappingModal(true);
  };

  const handleColumnMappingComplete = (mapping: { companyName: string; website: string }) => {
    setShowColumnMappingModal(false);  // Close the modal
    setIsUploading(true);  // This triggers the UploadAnimation
    const processedData = fileData.map(row => ({
      name: row[mapping.companyName],
      website: row[mapping.website]
    }));
    // Simulate file upload process
    setTimeout(() => {
      setUploadedCompanies(processedData);
      setIsUploading(false);
    }, 2000); // Adjust this time as needed to match your actual upload process
  };

  const handleEnrichment = async () => {
    setIsEnriching(true);
    setEnrichmentProgress(0);
    try {
      const enriched = await enrichData(uploadedCompanies);
      setEnrichedCompanies(enriched);
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setEnrichmentProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error('Error enriching data:', error);
    } finally {
      setIsEnriching(false);
      setEnrichmentProgress(100);
    }
  };

  const handleIcpSubmit = async (data: CompanyInputData) => {
    try {
      const response = await enrichCompany(data);
      setIcpEnrichedData(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <svg className="h-10 w-10 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h1 className="ml-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">ITSTHELIST</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-base font-medium text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-indigo-600">Home</a>
              <a href="#" className="text-base font-medium text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-indigo-600">About</a>
              <a href="#" className="text-base font-medium text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-indigo-600">Contact</a>
              <button
                onClick={() => setIsWelcomeModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bulk Enrichment Tool */}
            <div className="bg-white rounded-xl shadow-2xl p-8 transition duration-300 ease-in-out hover:shadow-3xl transform hover:-translate-y-1 h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Bulk Enrichment</h2>
              <p className="text-gray-600 mb-4">Upload a CSV file to enrich multiple companies at once.</p>
              <div className="flex-grow">
                {isUploading ? (
                  <UploadAnimation />
                ) : !isUploadComplete ? (
                  <FileUpload 
                    onFileUpload={handleFileUpload} 
                    onShowColumnMapping={handleShowColumnMapping}
                    isUploading={isUploading}
                  />
                ) : (
                  <>
                    <p className="mb-4 text-gray-600">
                      {uploadedCompanies.length} companies uploaded. Click to start enrichment.
                    </p>
                    <button 
                      onClick={handleEnrichment} 
                      disabled={isEnriching} 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      {isEnriching ? 'Enriching...' : 'Start Enrichment'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Real-Time Market Insights Tool */}
            <div className="bg-white rounded-xl shadow-2xl p-8 transition duration-300 ease-in-out hover:shadow-3xl transform hover:-translate-y-1 h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Real-Time Market Insights</h2>
              <p className="text-gray-600 mb-4">
                Enter your company and product details to get instant market insights and potential customer needs.
              </p>
              <div className="flex-grow">
                <CompanyInputForm 
                  onSubmit={handleIcpSubmit}
                />
              </div>
            </div>
          </div>

          {/* Enrichment Results */}
          <div className="bg-white rounded-xl shadow-2xl p-8 transition duration-300 ease-in-out hover:shadow-3xl transform hover:-translate-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Enrichment Results</h2>
            {isEnriching && <EnrichmentProgress progress={enrichmentProgress} />}
            {enrichedCompanies.length > 0 && (
              <ResultsTable results={enrichedCompanies} />
            )}
            {icpEnrichedData && icpEnrichedData.enriched_data && (
              <ICPDisplay data={icpEnrichedData.enriched_data} />
            )}
          </div>
        </div>
      </main>

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {showColumnMappingModal && (
        <ColumnMappingModal
          headers={fileHeaders}
          initialMapping={initialMapping}
          onComplete={handleColumnMappingComplete}
          onClose={() => setShowColumnMappingModal(false)}
        />
      )}
    </div>
  );
}