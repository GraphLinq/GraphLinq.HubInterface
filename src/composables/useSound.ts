import { useEffect } from 'react';

type PlaySoundType = (soundName: string) => void;

const useSound = (): { playSound: PlaySoundType } => {
  const playSound: PlaySoundType = (soundName) => {
    const audioElement = new Audio(`/audio/${soundName}.mp3`);
    audioElement.play();
  };

  useEffect(() => {
    // Clean up audio elements on unmount (optional)
    return () => {
      document.querySelectorAll('audio').forEach((element) => {
        const audioElement = element as HTMLAudioElement;
        audioElement.pause();
        audioElement.remove();
      });
    };
  }, []);

  return { playSound };
};

export default useSound;
