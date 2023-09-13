import { useEffect } from 'react';
import { extractImgFromUrl } from "../utils/extractImgFromUrl";

const useFetchFavicon = (stations, setStations) => {
  useEffect(() => {
    stations.forEach((station) => {
      if (!station.favicon) {
        console.log("No hay favicon, obteniendo icono...");

        
        extractImgFromUrl({
          homepageUrl: station.homepage,
          stationName: station.name,
          setState: setStations,
        });
      }
    });
  }, [stations.length]);
};

export {useFetchFavicon};
