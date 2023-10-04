import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import { Layout } from "../../components/Layout";
import { GenderSelector } from "../../components/GenderSelector";
import { CardStation } from "../../components/CardStation";
import { useSearchData } from "../../hooks/useSearchData";
import { BackdropLoading } from "../../components/BackdropLoading";

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
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gap: 3, justifyContent: "center" }}
      >
        {/*  Selector de Generos solo visible una vez */}
        {data.length === 0 && (
          <GenderSelector
            loadData={loadData}
            setSelectGender={setSelectGender}
          />
        )}

        {/* Estacion de Radio segun el genero seleccionado */}
        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          {data.map((station) => (
            <CardStation
              key={station.stationuuid}
              station={station}
            />
          ))}
        </Box>

        {/* Boton para cargar mas resultados siempre y cuando en la primera solicitud
        data tenga mas de 9 elementos */}

        {data.length > 9 && (
          <Button
            disabled={loading}
            onClick={loadMoreResults}
            variant="contained"
            sx={{ marginTop: "20px", width: "120px" }}
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

export { SearchByGender };
