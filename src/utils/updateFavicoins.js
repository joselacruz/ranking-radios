import { extractImgFromUrl } from "./extractImgFromUrl";

export async function updateFavicons({dataToUpdate, setdataToUpdate}) {
    for (const item of dataToUpdate) {
      if (!item.favicon) {
        try {
          const newFavicon = await extractImgFromUrl({
            homepageUrl: item.homepage,
            id: item.stationuuid,
            name: item.name,
          });
  
          return setdataToUpdate((prevStations) =>
            prevStations.map((station) =>
              station.stationuuid === item.stationuuid
                ? { ...station, favicon: newFavicon }
                : station
            )
          );
  
          console.log(
            "Nuevo Icono para",
            newFavicon,
            item.name,
            item.homepage
          );
        } catch (error) {
          console.error("Error al extraer el favicon:", error);
        }
      }
    }
  }
  