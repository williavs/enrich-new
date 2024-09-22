import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

interface FileUploadProps {
  onFileUpload: (file: File, data: any[]) => void;
  onShowColumnMapping: (headers: string[], data: any[]) => void;
  isUploading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onShowColumnMapping, isUploading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    Papa.parse(file, {
      complete: (results) => {
        const headers = results.meta.fields || [];
        onShowColumnMapping(headers, results.data);
        onFileUpload(file, results.data);
      },
      header: true,
    });
  }, [onShowColumnMapping, onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="relative">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors duration-200">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-gray-600">Drop the file here ...</p>
        ) : (
          <p className="text-lg text-gray-600">Drag &apos;n&apos; drop a CSV file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;