import React, { useEffect, useRef, useState } from 'react';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';
let currentlyPlaying: HTMLAudioElement | null = null;

type DesignedAudioPlayerProps = {
  src: string;
};

const DesignedAudioPlayer: React.FC<DesignedAudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Initialize volume to maximum (1)

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
      }
      currentlyPlaying = audio;
      setIsPlaying(true);
    };

    const handlePause = () => {
      // Ensure the latest src is used when pausing
      if (audio.src) {
        audio.src = src;
      }
      audio.pause();
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [src]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.src = src;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="text-white feature flex items-center justify-center flex-col relative text-center mx-12">
      <button
        onClick={togglePlayPause}
        className={` text-3xl p-4 rounded-full ${
          isPlaying ? 'animate-pulse ease-in-out duration-500 bg-red-600 hover:bg-red-700' : ''
        } focus:outline-none focus:ring-2 ${
          isPlaying ? ' ease-in-out duration-500 focus:ring-red-700' : ''
        } focus:ring-opacity-50`}
      >
        {isPlaying ? <BsStopFill /> : <BsPlayFill />}
      </button>

      <div className="mt-2 rounded-full">
        <label className=" text-sm ease-in-out duration-300">
        <input
        
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        /></label>
      </div>


      <audio ref={audioRef} src={src} preload="none" />
    </div>
  );
};

export default DesignedAudioPlayer;
