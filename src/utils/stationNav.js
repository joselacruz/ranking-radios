// stationUtils.js

import { useNavigate } from "react-router-dom";
import { StationContext } from "../context/StationContext";
import { useContext } from "react";

const useStationNavigation = () => {
  const location = useNavigate();
  const context = useContext(StationContext)

  const navigateWithStationDetails = ( {station}) => {

    // Establece los detalles de la estación en el contexto.
    context.setStationDetails(station);

    // Envia La Estacion al Historial de Estaciones del Contexto
    context.addHistoryStatios(station);

    // Crea una ruta amigable para la estación eliminando espacios y usando guiones
    const createRoute = station.name.split(" ").join("-");

    // Navega a la ruta de detalles de la estación.
    location(`/view/${createRoute}`);
  };

  return navigateWithStationDetails;
};

export  {useStationNavigation};
