import { useEffect, useState } from "react";
import { makeServerRequest } from "../utils/serverRequestUtil";
import { updateFavicons } from "../utils/updateFavicoins";

const useSearchData = () => {
    // Estado para almacenar los resultados de la búsqueda
  const [data, setData] = useState([]);

   // Estado para rastrear el estado de carga
  const [loading, setLoading] = useState(false);

  // Estado para rastrear si hay más resultados disponibles
  const [hasMoreResults, setHasMoreResults] = useState(true);

 // Estado para rastrear el desplazamiento de datos
  const [dataOffset, setDataOffset] = useState(10);

  // Función para cargar datos desde el servidor
  const loadData = async ({ queryParam, value, offset = 0, preserveData = false }) => {

    // Inicia el estado de carga
    setLoading(true);

    // Si no hay más resultados, detiene la carga
    if (!hasMoreResults) {
      setLoading(false);
      return;
    }

    // Parámetros de la consulta
    const queryParams = {
      [queryParam]: value.toLowerCase(),
    };

    try {
      // Realiza la solicitud al servidor
      const response = await makeServerRequest({
        endpoint: "json/stations/search",
        offset: offset,
        limit: "10",
        otherQuery: queryParams,
      });

      // Si la respuesta es menor que 10 y estamos en la primera iteración, permitimos más resultados
      if (response.length < 10 && dataOffset === 0) {
        setHasMoreResults(true);
      } else if (response.length < 10) {
        // Si la respuesta es menor que 10 y no estamos en la primera iteración, marcamos hasMoreResults como falso
        setHasMoreResults(false);
      }
      // Actualiza el estado de los datos
      setData((prevData) => (preserveData ? [...prevData, ...response] : response));
    } catch (error) {
      throw error;
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };
  // FIN de loadData


   // Efecto actualizar las imagenes de las estaciones sin un favicons
  useEffect(() => {
    if (data.length > 0) {
      updateFavicons({ dataToUpdate: data, setdataToUpdate: setData });
    }
  }, [data]);

   // Función para cargar más resultados
  const moreResults = ({queryParam,value}) => {
    // Carga más resultados con la configuración actual
    loadData({
      queryParam: queryParam,
      value: value,
      offset: dataOffset,
      preserveData: true,
    });
    // Incrementa el desplazamiento de datos
    setDataOffset(dataOffset + 10);
  };


   // Función para restablecer la paginación a la configuración inicial
  const resetPagination = () => {
    setDataOffset(10);
    setHasMoreResults(true);
  }

 // Devuelve los elementos necesarios para su uso en el componente
  return {
    data,
    dataOffset,
    loadData,
    moreResults,
    setData,
    loading,
    hasMoreResults,
    resetPagination
  
  };
};

export  {useSearchData};
