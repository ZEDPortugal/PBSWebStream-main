'use client';
import React, { useState, useRef } from 'react';
import DesignedAudioPlayer from './DesignedAudioPlayer';

const sources = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Fm1ph-logo.png",
    src: "https://stream.zeno.fm/qnt98p5m108uv"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Fm2ph-logo.png/220px-Fm2ph-logo.png",
    src: "https://stream.zeno.fm/205fny7m108uv"
  },
  {
    logo: "https://zedportugal.github.io/PBS-FM/Radyo_Pilipinas_Streaming_Online-removebg.png",
    src: "https://stream.zeno.fm/aq6rqr5m108uv"
  }
];

const backgroundImages = [
  "https://pbs.gov.ph/wp-content/uploads/2018/02/FM1_Booth1.jpg",
  "https://pbs.gov.ph/wp-content/uploads/2018/02/FM2-Booth1.jpg",
  "https://pbs.gov.ph/wp-content/uploads/2018/02/RP1-Booth2.jpg"
];

export default function Home() {
  const [selectedSource, setSelectedSource] = useState(0);
  const audioRef = useRef(null);

  const handleSourceChange = (index: React.SetStateAction<number>) => {
    // Pause the audio player when source changes
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedSource(index);
  };

  return (
    <div
      className="relative bg-gray-500 flex min-h-screen flex-col items-center justify-between"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.10)), url(${backgroundImages[selectedSource]})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        transition: 'background-image 0.5s ease-in-out' // Add transition
      }}
    >
      <img className="absolute w-64 top-3 hover:w-72 ease-in-out duration-300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Philippine_Broadcasting_Service_%28PBS%29.svg/270px-Philippine_Broadcasting_Service_%28PBS%29.svg.png" alt="" />

      <div className='box fixed top-32 glass rounded-full shadow-lg h-96 w-96 hover:w-1/2 hover:drop-shadow-2xl hover:bg-gray-800 hover:bottom-36 ease-in-out duration-500 flex flex-col items-center'>
        <img className="absolute top-10 object-scale-down w-48 drop-shadow-2xl" src={sources[selectedSource].logo} alt="LOGO" />
        <div className="absolute bottom-10">
          <div>
            <DesignedAudioPlayer src={sources[selectedSource].src} ref={audioRef} />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        {sources.map((source, index) => (
          <div
            key={index}
            className={` ${selectedSource === index ? '' : ''}`}
            onClick={() => handleSourceChange(index)}
          >
            <button
              className="relative top-96 mt-36 glass hover:text-white focus:outline-none ease-in-out duration-300  text-gray-300 box mx-2 py-2 px-7 rounded-2xl hover:bg-gray-800 hover:text-xl ease-in-out duration-500 "
            >
              {index === 0 ? 'REPUBLIKA FM1' : index === 1 ? 'CAPITAL FM2' : 'RADYO PILIPINAS 1'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
