/* @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';  // Use FaPlay and FaStop from 'react-icons/fa' instead
// You can use any other suitable icons from 'react-icons' as needed

let currentlyPlaying: HTMLAudioElement | null = null;

type DesignedAudioPlayerProps = {
  src: string;
};

const DesignedAudioPlayer: React.FC<DesignedAudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="text-white feature flex items-center justify-center flex-col relative text-center mx-12">
      <button
        onClick={togglePlayPause}
        className={` ease-in-out duration-500 text-3xl p-4 rounded-full ${
          isPlaying ? 'animate-pulse ease-in-out duration-500 bg-red-600 hover:bg-red-700' : ''
        } focus:outline-none focus:ring-2 ${
          isPlaying ? ' ease-in-out duration-500 focus:ring-red-700' : ''
        } focus:ring-opacity-50`}
      >
        {isPlaying ? <FaStop /> : <FaPlay />}
      </button>

      <audio ref={audioRef} src={src} preload="none" />
    </div>
  );
};

export default DesignedAudioPlayer;
