import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getData } from "../utils/fireStore";
import { saveFireStore } from "../utils/fireStore";
import { removeItemFireStore } from "../utils/fireStore";
import { updateVotesFireStore } from "../utils/fireStore";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const userContext = useContext(UserContext);

  //Detalles De la Estacion De Radio Visitada
  const [stationDetails, setStationDetails] = useState({});

  //Historial de Estaciones Reproducidas y visitadas
  const [historyStations, setHistoryStations] = useState(null);

  const isExistInHistory = (idStation) => {
    return historyStations.some((station) => station.stationuuid == idStation);
  };

  //Actualizar el Historial de Estaciones
  const addHistoryStatios = (newStation) => {
    /**
     * Verifica si el Estado con el historial de estacion ya Tiene
     * la nueva Estacion que queremos agregar
     */

    //Solo si no la tiene actualizamos el estado
    if (!isExistInHistory(newStation.stationuuid)) {
      setHistoryStations([...historyStations, newStation]);

      // Guarda La Estacion en el Historial de Estaciones en FireStore
      saveFireStore({
        nameObj: "historyStations",
        userId: userContext.user,
        data: newStation,
      });
    }
  };

  //estado para almacenar las estaciones favoritas
  const [favorites, setFavorites] = useState(null);

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

      // Guarda La Estaciones favoritas en FireStore
      saveFireStore({
        nameObj: "favorites",
        userId: userContext.user,
        data: station,
      });
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

      removeItemFireStore({
        nameObj: "favorites",
        userId: userContext.user,
        data: station,
      });
    }
  };

  useEffect(() => {
    // Función asincrónica para obtener datos del historial y estaciones favoritas del usuario
    async function fetchHistoryAndFavorites() {
      // Llamada a la función para obtener datos del usuario
      const data = await getData(userContext.user);

      // Actualiza el estado con las estaciones del historial
      setHistoryStations(data.historyStations || []);
      // Actualiza el estado con las estaciones favoritas

      setFavorites(data.favorites || []);
    }

    fetchHistoryAndFavorites();
  }, []);

  /**
   * Actualiza el número de votos y propaga los cambios a diferentes contextos y Firestore.
   * @param {Object} param0 - Parámetros de la función.
   * @param {number} param0.newVote - Nuevo número de votos.
   * @param {string} param0.stationId - Identificador único de la estación.
   */
  const updateVotes = ({ newVote, stationId }) => {
    // Actualiza el número de votos en la sección de mostrar detalles de la estación
    setStationDetails((prevState) => ({
      ...prevState, // Copia todas las propiedades del estado anterior
      votes: newVote, // Actualiza la propiedad 'votes'
    }));

    // Si la estación existe en el estado de favoritos, actualiza el número de votos
    if (isExistInfavorite(stationId)) {
      updateVoteState({
        set: setFavorites,
        newValue: newVote,
        stationId: stationId,
      });

      // Si la estación existe en favoritos, se supone que ya existe en Firestore,
      // así que actualizamos los votos allí

      updateVotesFireStore({
        idElement: stationId,
        documentId: userContext.user,
        tuArrayFieldName: "favorites",
        nuevoValor: newVote,
      });
    }

    // Si la estación existe en el historial, actualiza el número de votos
    if (isExistInHistory(stationId)) {
      updateVoteState({
        set: setHistoryStations,
        newValue: newVote,
        stationId: stationId,
      });

      // Si la estación existe en el historial de estaciones visitadas, se supone
      // que ya existe en Firestore, así que actualizamos los votos allí

      updateVotesFireStore({
        idElement: stationId,
        documentId: userContext.user,
        tuArrayFieldName: "historyStations",
        nuevoValor: newVote,
      });
    }
  };

  /**
   * Actualiza la propiedad 'votes' en un Estado específico.
   * @param {Object} param0 - Parámetros de la función.
   * @param {function} param0.set - Función para actualizar el estado.
   * @param {number} param0.newValue - Nuevo valor para 'votes'.
   * @param {string} param0.stationId - Identificador único de la estación.
   */
  function updateVoteState({ set, newValue, stationId }) {
    set((prevState) =>
      prevState.map((item) => {
        if (item.stationuuid === stationId) {
          // Devuelve un nuevo objeto con la propiedad 'votes' actualizada
          return { ...item, votes: newValue };
        }
        return item;
      })
    );
  }

  //Fin updateVoteState
  return (
    <StationContext.Provider
      value={{
        stationDetails,
        setStationDetails,
        historyStations,
        addHistoryStatios,
        addFavorite,
        removeFavorite,
        isExistInHistory,
        isExistInfavorite,
        favorites,
        updateVotes,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
