import { createContext, useState } from "react";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stationDetails, setStationDetails] = useState({});

  return (
    <StationContext.Provider
      value={{
        stationDetails,
        setStationDetails,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
