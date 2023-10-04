import { Layout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import { CardStation } from "../../components/CardStation";
import { useSearchData } from "../../hooks/useSearchData";
import { CountrySelect } from "../../components/CountrySelect";
import { makeServerRequest } from "../../utils/serverRequestUtil";
import { BackdropLoading } from "../../components/BackdropLoading";
import { getObjCountry } from "../../utils/currentCountry";

const SearchByLocation = () => {
  const {
    data,
    loadData,
    moreResults,
    setData,
    hasMoreResults,
    resetPagination,
    loading,
  } = useSearchData();

  //estado para almacenar el pais selecionado de la lista
  const [selectedCountry, setSelectedCountry] = useState(null);

  //estado para la cantidad de radio disponibles dependiendo del pais elegido
  const [stationCount, setStationCount] = useState(null);

  /**
   * funcion para obtener la cantidad de estaciones disponibles para el pais
   */
  async function loadStationCount() {
    const response = await makeServerRequest({
      endpoint: `json/countries/${selectedCountry.iso_3166_1}`,
      limit: 1,
    });

    setStationCount(response[0].stationcount);
  }
  // FIN de loadStationCount

  /**
   * funcion para cargar mas resultados  la cual ejecuta moreResults definida en useSearchData
   */
  function loadMoreResults() {
    moreResults({
      queryParam: "countrycode",
      value: selectedCountry.iso_3166_1,
    });
  }
  // FIN de loadMoreResults

  /**
   * Efecto de React que se ejecuta cada vez que un pais el seleccionado de la lista
   * para pintar  las estaciones de dicho pais
   */
  useEffect(() => {
    if (selectedCountry) {
      resetPagination();
      loadStationCount();
      loadData({
        queryParam: "countrycode",
        value: selectedCountry.iso_3166_1,
      });
    } else {
      setData([]);
      resetPagination();
    }
  }, [selectedCountry]);

  /**
   * Efecto de React el cual se ejecuta solo una vez
   * leemos la ip del usuario para determinar su ubicacion y asi cambiar selectedCountry
   * que sera el pais actual seleccionado de la lista
   */
  useEffect(() => {
    async function getDefaultfCountry() {
      try {
        const response = await getObjCountry();

        setSelectedCountry(response);
      } catch {
        setSelectedCountry(null);
      }
    }
    getDefaultfCountry();
  }, []);

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gap: 3, justifyContent: "center" }}
      >
        {/* Selector de paises */}
        <CountrySelect
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        {/* muestra el titulo y la cantidad de estaciones que hay para dicho pais */}
        {selectedCountry && stationCount && (
          <>
            <Typography variant="h6">
              Resultados para {selectedCountry.name}
            </Typography>
            <Typography variant="body1">{stationCount} stations</Typography>
          </>
        )}

        {/* Muestra  las Estaciones segun  el pais seleccionado */}
        {data.length > 0 && (
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            {data.map((station, index) => (
              <CardStation
                key={station.stationuuid}
                station={station}
              />
            ))}
          </Box>
        )}

        {/* Boton para cargar mas resultados siempre y cuando en la primera solicitud
        data tenga mas de 9 elementos */}
        {data.length > 9 && (
          <Button
            variant="contained"
            sx={{ width: "120px" }}
            onClick={loadMoreResults}
            disabled={!hasMoreResults}
          >
            View more
          </Button>
        )}
      </Container>

      {/* renderiza un fondo gris claro con un indicador de carga (loading) */}
      <BackdropLoading open={loading} />
    </Layout>
  );
};
export { SearchByLocation };
