import axios from 'axios';

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

export const enrichData = async (
  companies: any[],
  progressCallback: (progress: number, processed: number, total: number) => void
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:8501/ws');

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'start_enrichment', companies }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.progress !== undefined) {
        progressCallback(data.progress, data.processed, data.total);
      } else if (data.type === 'enrichment_complete') {
        resolve(data.data);
        socket.close();
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      reject(error);
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        console.error('WebSocket closed unexpectedly:', event);
        reject(new Error('WebSocket closed unexpectedly'));
      }
    };
  });
};