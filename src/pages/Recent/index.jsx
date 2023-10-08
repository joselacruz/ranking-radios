import { Layout } from "../../components/Layout";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { StationContext } from "../../context/StationContext";
import { CardStation } from "../../components/CardStation";
import { useContext } from "react";
const Recent = () => {
  const context = useContext(StationContext);

  /**
   * Muestra los resultados del historial.
   * @returns {JSX.Element} - Elemento JSX que contiene las estaciones del historial o un mensaje si está vacío.
   */
  const showHistoryResult = () => {
    // Verifica si hay estaciones en el historial.
    if (context.historyStations.length > 0) {
      // Mapea las estaciones en el historial y crea tarjetas para cada una.
      const result = context.historyStations.map((item) => {
        return (
          <CardStation
            station={item}
            key={item.stationuuid}
          />
        );
      });

      // Devuelve el resultado (tarjetas de estación).
      return result;
    } else {
      // Si el historial está vacío, muestra un mensaje informativo.
      const notResult = (
        <Typography
          variant="body1"
          component="p"
        >
          Your recent history is empty
        </Typography>
      );
      return notResult;
    }
  };

  return (
    <Layout>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          marginBottom="15px"
        >
          Recent
        </Typography>
        <Box
          display="flex"
          flexDirection="row-reverse"
          justifyContent="start"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          {showHistoryResult()}
        </Box>
      </Container>
    </Layout>
  );
};

export { Recent };
