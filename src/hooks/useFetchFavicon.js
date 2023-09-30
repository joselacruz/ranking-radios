import { useEffect } from 'react';
import { extractImgFromUrl } from "../utils/extractImgFromUrl";

const useFetchFavicon = (stations, setStations) => {


  useEffect(() => {
    stations.forEach((station) => {
      //Si no hay imagenes para Mostrar 

      if (!station.favicon) {
        
        extractImgFromUrl({
          homepageUrl: station.homepage,
          stationName: station.name,
          setState: setStations,
          state: stations
        });
   
      }
    });
  }, [stations,stations.length]);
};

export {useFetchFavicon};
