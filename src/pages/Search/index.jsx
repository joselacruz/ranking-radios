import { Layout } from "../../components/Layout";
import { Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { makeServerRequest } from "../../utils/serverRequestUtil";
import { CardStation } from "../../components/CardStation";
import { updateFavicons } from "../../utils/updateFavicoins";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { SearchBar } from "../../components/SearchBar";
import { GenderSelector } from "../../components/GenderSelector";
const Search = () => {
  const [data, setData] = useState([]);

  //Realizar Busqueda
  const loadData = async ({
    queryParam,
    value,
    offset = 0,
    preserveData = false,
  }) => {
    const queryParams = {
      [queryParam]: value.toLowerCase(),
    };

    try {
      const response = await makeServerRequest({
        endpoint: "json/stations/search",
        offset: offset,
        limit: "10",
        otherQuery: queryParams,
      });

      setData((prevData) =>
        preserveData ? [...prevData, ...response] : response
      ); // Actualiza los resultados de búsqueda
    } catch (error) {
      console.error("Ocurrió un error durante la búsqueda:", error);
    }
  };

  // Actualiza la propiedad favicon para los elementos que la necesitan
  useEffect(() => {
    updateFavicons({ dataToUpdate: data, setdataToUpdate: setData });
  }, [data, data.length > 0]);

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gap: 3 }}
      >
        {/* Buscador */}

        <SearchBar
          loadData={loadData}
          setData={setData}
        />

        {/*  mostrar los resultados de búsqueda */}
        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          {data.map((station, index) => {
            const key = station.name + index;
            return (
              <CardStation
                key={key}
                station={station}
              />
            );
          })}
        </Box>
        {/* Busqueda por Genero*/}
        <GenderSelector loadData={loadData} />
      </Container>
    </Layout>
  );
};

export { Search };
