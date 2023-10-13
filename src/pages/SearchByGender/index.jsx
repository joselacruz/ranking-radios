import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Layout } from "../../components/Layout";
import { GenderSelector } from "../../components/GenderSelector";
import { CardStation } from "../../components/CardStation";
import { useSearchData } from "../../hooks/useSearchData";
import { BackdropLoading } from "../../components/BackdropLoading";
import { CardContainer } from "../../container/CardContainer";

const SearchByGender = () => {
  const { data, loadData, moreResults, loading } = useSearchData();

  //Genero Selecionado
  const [selectGender, setSelectGender] = useState(null);

  /**
   * Trae la estacion por el genero seleccionado
   */
  function loadMoreResults() {
    moreResults({ queryParam: "tag", value: selectGender });
  }

  // **FIN de loadMoreResults

  return (
    <Layout>
      {selectGender && !loading && (
        <>
          {/* Estacion de Radio segun el genero seleccionado */}
          <Typography
            variant="h4"
            component="h2"
            marginBottom="15px"
          >
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
          disabled={loading}
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
