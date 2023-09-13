import { useEffect } from 'react';
import { extractImgFromUrl } from "../utils/extractImgFromUrl";

const useFetchFavicon = (stations, setStations) => {
  useEffect(() => {
    stations.forEach((station) => {
      if (!station.favicon) {
        
        // No  existe favicon Intentamos  obtener desde el Sitio web de la estacion
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
