// stationUtils.js

import { useNavigate } from "react-router-dom";
import { StationContext } from "../context/StationContext";
import { useContext } from "react";

const useStationNavigation = () => {
  const location = useNavigate();
  const context = useContext(StationContext)

  const navigateWithStationDetails = ( {station}) => {
      // Crea una ruta amigable para la estación eliminando espacios y usando guiones
      const createUrl = station.name.split(" ").join("-");
      const routePathname = `/view/${createUrl}`;

/**
 * Evita actualizaciones innecesarias si ya estamos en la vista de detalles de la estación actual.
 * Comprueba si la ubicación actual de la ventana no coincide con la ruta de detalles de la estación.
 * Esto previene la actualización del estado del contexto destinado a la vista de detalles de la estación.
 * En resumen, si window.location.pathname es igual a routePathname,
 * significa que ya estamos viendo los detalles de esa estación y no es necesario actualizar el estado.
 */
    if(window.location.pathname !== routePathname ){
  
          // Establece los detalles de la estación en el contexto.
      context.setStationDetails(station);
  
      // Envia La Estacion al Historial de Estaciones del Contexto
      context.addHistoryStatios(station);
  
      // Navega a la ruta de detalles de la estación.
      location(routePathname);
      
    }
  
  };

  return navigateWithStationDetails;
};

export  {useStationNavigation};
