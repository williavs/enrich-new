import axios from 'axios';
import { EnrichedCompany, CompanyInputData, EnrichmentResponse } from '../types';

export const uploadFile = async (
  file: File,
  columnMapping: { companyName: string; website: string }
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('column_mapping', JSON.stringify(columnMapping));

  try {
    const response = await axios.post('http://localhost:8501/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.companies;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const enrichData = async (companies: EnrichedCompany[]): Promise<EnrichedCompany[]> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:8501/ws');

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'start_enrichment', companies }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'enrichment_complete') {
        resolve(data.data);
        socket.close();
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      reject(error);
    };

    // ... error handling
  });
};

export const enrichICP = async (companyData: CompanyInputData): Promise<EnrichedCompany> => {
  const response = await fetch('http://localhost:8502/icp_enrich', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to enrich ICP data');
  }
  
  return response.json();
};

const API_URL = 'http://localhost:8502';  // Make sure this matches your backend URL

export async function enrichCompany(data: CompanyInputData): Promise<EnrichmentResponse> {
  const response = await fetch(`${API_URL}/icp_enrich`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to enrich company data');
  }

  return response.json();
}