import uploadAnimationData from '../../public/lottie/upload.json';

export const animations = {
  upload: uploadAnimationData,
  // Add more animations here as needed
};

export type AnimationName = keyof typeof animations;