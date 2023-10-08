import { createContext, useState } from "react";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  //Detalles De la Estacion De Radio Visitada
  const [stationDetails, setStationDetails] = useState({});

  //Historial de Estaciones Reproducidas y visitadas
  const [historyStations, setHistoryStations] = useState([]);

  //Actualizar el Historial de Estaciones
  const addHistoryStatios = (newStation) => {
    /**
     * Verifica si el Estado con el historial de estacion ya Tiene
     * la nueva Estacion que queremos agregar
     */
    const isExistInHistory = historyStations.some(
      (station) => station.stationuuid == newStation.stationuuid
    );

    //Solo si no la tiene actualizamos el estado
    if (!isExistInHistory) {
      setHistoryStations([...historyStations, newStation]);
    }
  };

  //estado para almacenar las estaciones favoritas
  const [favorites, setFavorites] = useState([]);

  // Función para verificar si una estación con el ID dado ya está en favoritos
  const isExistInfavorite = (idStation) => {
    return favorites.some((station) => station.stationuuid == idStation);
  };

  // Función para agregar una estación a favoritos si aún no existe
  const addFavorite = (station) => {
    // Verificar si la estación aún no está en favoritos
    if (!isExistInfavorite(station.stationuuid)) {
      // Actualizar el estado de favoritos agregando el nuevo ID de estación
      setFavorites([...favorites, station]);
    }
  };

  // Función para eliminar una estación de favoritos
  const removeFavorite = (station) => {
    // Verificar si hay elementos en favoritos
    if (favorites.length > 0) {
      // Crear un nuevo array excluyendo la estación con el ID que se va a eliminar
      const newDataExcludingIdStation = favorites.filter(
        (item) => item.stationuuid !== station.stationuuid
      );

      // Actualizar el estado de favoritos con el nuevo array
      setFavorites(newDataExcludingIdStation);
    }
  };

  console.log("favorites", favorites);

  return (
    <StationContext.Provider
      value={{
        stationDetails,
        setStationDetails,
        historyStations,
        addHistoryStatios,
        addFavorite,
        removeFavorite,
        isExistInfavorite,
        favorites,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
