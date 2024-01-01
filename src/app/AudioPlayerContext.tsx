import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IAudioPlayerContext {
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}

const defaultContext: IAudioPlayerContext = {
  playingId: null,
  setPlayingId: () => {},
};

const AudioPlayerContext = createContext<IAudioPlayerContext>(defaultContext);

export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <AudioPlayerContext.Provider value={{ playingId, setPlayingId }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
