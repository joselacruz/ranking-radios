import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [streamInfo, setStreamInfo] = useState(null);
  const [play, setPlay] = useState(false);
  const [inReproduction, setInReproduction] = useState(false);
  return (
    <PlayerContext.Provider
      value={{
        streamInfo,
        setStreamInfo,
        play,
        setPlay,
        inReproduction,
        setInReproduction,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
