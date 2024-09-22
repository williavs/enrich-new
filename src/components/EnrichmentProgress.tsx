import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface EnrichmentProgressProps {
  progress: number;
}

const EnrichmentProgress: React.FC<EnrichmentProgressProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Player
        autoplay
        loop
        src="/lottie/processing.json"
        style={{ height: '120px', width: '120px' }}
      />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Enriching data... {progress}%
      </p>
    </div>
  );
};

export default EnrichmentProgress;