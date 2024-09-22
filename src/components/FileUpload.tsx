import React, { useState } from 'react';
import Papa from 'papaparse';
import ColumnMapping from './ColumnMapping';

interface FileUploadProps {
  onFileUpload: (file: File, mapping: { companyName: string; website: string }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [showMapping, setShowMapping] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      Papa.parse(selectedFile, {
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setColumns(Object.keys(results.data[0] as object));
            setShowMapping(true);
          }
        },
        header: true,
      });
    }
  };

  const handleMappingComplete = (mapping: { companyName: string; website: string }) => {
    if (file) {
      onFileUpload(file, mapping);
      setShowMapping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">CSV file (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
        </label>
      </div>
      {file && <p className="text-sm text-gray-600">Selected file: {file.name}</p>}
      {showMapping && <ColumnMapping columns={columns} onMappingComplete={handleMappingComplete} />}
    </div>
  );
};

export default FileUpload;