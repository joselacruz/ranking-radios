import { useContext } from "react";
import { Layout } from "../../components/Layout";
import { CardContainer } from "../../container/CardContainer";
import { StationContext } from "../../context/StationContext";
import { CardStation } from "../../components/CardStation";
import { ContainedStationsSkeleton } from "../../components/Skeleton/ContainedStationsSkeleton";
import { Typography } from "@mui/material";

const Favorite = () => {
  const context = useContext(StationContext);

  const showFavoriteResult = () => {
    // Verifica si el estado de estaciones  favoritas está cargando (null).
    if (context.favorites === null) {
      // Muestra un esqueleto de estaciones contenidas mientras se carga.
      return (
        <ContainedStationsSkeleton
          ShowTitle={false}
          numberCard={10}
        />
      );
    } else {
      // Verifica si hay estaciones favoritas.
      if (context.favorites?.length > 0) {
        // Mapea las estaciones en el historial y crea tarjetas para cada una.
        const result = context.favorites.map((item, index) => {
          return (
            <CardStation
              station={item}
              key={item.stationuuid + index}
            />
          );
        });

        // Devuelve el resultado (tarjetas de estación).
        return result;
      } else {
        // Si el estado está vacío, muestra un mensaje informativo.
        const notResult = (
          <Typography
            variant="body1"
            component="p"
          >
            "Time to start your own seasonal journey! Add the first station to
            your favorites and let the adventure begin."
          </Typography>
        );
        return notResult;
      }
    }
  };
  return (
    <Layout>
      <Typography
        variant="h4"
        component="h2"
      >
        My Favorite Stations
      </Typography>
      <CardContainer children={showFavoriteResult()} />
    </Layout>
  );
};
export { Favorite };
