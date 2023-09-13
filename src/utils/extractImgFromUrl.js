export async function extractImgFromUrl({homepageUrl,stationName,setState}) {
    try {
      const response = await fetch(
        `https://jsonlink.io/api/extract?url=${homepageUrl}`
      );

      if (response.status === 200) {
        const data = await response.json();

        // Actualiza el estado solo si se obtiene un icono válido
        if (data?.images && data.images.length > 0) {
          setState((prevStations) =>
            prevStations.map((station) =>
              station.name === stationName
                ? { ...station, favicon: data.images[0] }
                : station
            )
          );
        }
      } else {
        
        // Imagen no encrotrada se muestra una por defecto.

        setState((prevStations) =>
          prevStations.map((station) =>
            station.name === stationName
              ? { ...station, favicon: "../../public/notfound.jpg" }
              : station
          )
        );
      
      }
    } catch (error) {
      console.log(`Error al obtener icono para ${homepageUrl}:`, error);
    }
  }