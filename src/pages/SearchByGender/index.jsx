import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Layout } from "../../components/Layout";
import { GenderSelector } from "../../components/GenderSelector";
import { CardStation } from "../../components/CardStation";
import { useSearchData } from "../../hooks/useSearchData";
import { BackdropLoading } from "../../components/BackdropLoading";
import { CardContainer } from "../../container/CardContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SearchByGender = () => {
  const { data, loadData, moreResults, loading, resetData, hasMoreResults } =
    useSearchData();

  //Genero Selecionado
  const [selectGender, setSelectGender] = useState(null);

  /**
   * Trae la estacion por el genero seleccionado
   */
  function loadMoreResults() {
    moreResults({ queryParam: "tag", value: selectGender });
  }

  // **FIN de loadMoreResults

  //funcion que reinicia el selector el genero seleccion y la data el cual es los resultado
  // a su estado inicia para nuevamente mostrar el selector de generos
  function resetSelector() {
    setSelectGender(null);
    resetData();
  }
  useEffect(() => {
    if (data.length == 10) {
      window.scrollTo(0, 0);
    }
  }, [data.length]);
  return (
    <Layout>
      {/* contenedor con los resultados al seleccionar un genero */}
      {selectGender && (
        <>
          {/* Estacion de Radio segun el genero seleccionado */}

          <Typography
            variant="h4"
            component="h2"
            marginBottom="15px"
            sx={{ display: loading ? "none" : "block" }}
          >
            <ArrowBackIcon
              fontSize="inherit"
              sx={{ marginInlineEnd: "10px", cursor: "pointer" }}
              onClick={resetSelector}
            />
            Explore {selectGender}
          </Typography>
          <CardContainer
            children={data.map((station) => (
              <CardStation
                key={station.stationuuid}
                station={station}
              />
            ))}
          />
        </>
      )}

      {/* Boton para cargar mas resultados siempre y cuando en la primera solicitud
        data tenga mas de 9 elementos */}
      {data.length > 9 && (
        <Button
          disabled={!hasMoreResults}
          onClick={loadMoreResults}
          variant="contained"
          sx={{
            marginTop: "20px",
            width: "120px",
            justifySelf: {
              xs: "center",
              sm: "start",
            },
          }}
        >
          View more
        </Button>
      )}

      {/* Selector de Generos */}
      <Box
        sx={{
          justifySelf: "center",
          margin: 0,
          padding: 0,
          width: {
            xs: "300px",
            sm: "600px",
          },
        }}
      >
        {/*  Selector de Generos solo visible una vez */}
        {data.length === 0 && (
          <GenderSelector
            loadData={loadData}
            setSelectGender={setSelectGender}
          />
        )}
      </Box>

      {/* renderiza un fondo gris claro con un indicador de carga (loading) */}
      <BackdropLoading open={loading} />
    </Layout>
  );
};

export { SearchByGender };
