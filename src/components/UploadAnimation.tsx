import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const UploadAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <Player
        autoplay
        loop={false}
        src="/lottie/upload.json"
        style={{ height: '100px', width: '100px' }}
      />
    </div>
  );
};

export default UploadAnimation;