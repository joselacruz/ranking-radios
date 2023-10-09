import { Layout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { CardStation } from "../../components/CardStation";
import { Container, Button, Typography } from "@mui/material";
import { SearchBar } from "../../components/SearchBar";
import { useSearchData } from "../../hooks/useSearchData";
import { BackdropLoading } from "../../components/BackdropLoading";
import { CardContainer } from "../../container/CardContainer";

const Search = () => {
  const {
    data,
    loadData,
    moreResults,
    hasMoreResults,
    setData,
    loading,
    resetPagination,
  } = useSearchData();
  const [query, setQuery] = useState("");

  /**
   * Trae mas resultado para la palabra actual en el buscador
   */
  function loadMoreResults() {
    moreResults({ queryParam: "name", value: query });
  }

  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  // ... (resto del código)

  useEffect(() => {
    // Se establece un temporizador de 500 ms antes de mostrar el mensaje de no resultados
    const timer = setTimeout(() => {
      setShowNoResultsMessage(
        !loading && data.length === 0 && query.length > 0
      );
    }, 500);

    // Limpiar el temporizador en cada cambio en el estado de búsqueda o consulta
    return () => clearTimeout(timer);
  }, [query, loading, data]);

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gap: 3 }}
      >
        {/* Buscador */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          loadData={loadData}
          setData={setData}
          resetPagination={resetPagination}
        />

        {/*  mostrar los resultados de búsqueda */}
        {showNoResultsMessage && (
          <Typography variant="body1">
            No se encontraron resultados para "{query}".
          </Typography>
        )}
        <CardContainer
          children={data.map((station, index) => {
            const key = station.name + index;
            return (
              <CardStation
                key={key}
                station={station}
              />
            );
          })}
        />

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

export { Search };
