import { Box, Skeleton } from "@mui/material";
import { CardStationSkeleton } from "../CardStationSkeleton";

/**
 * Componente funcional que representa un esqueleto de estaciones contenidas.
 *
 * @param {Object} param0 - Propiedades del componente.
 * @param {boolean} param0.ShowTitle - Indica si se debe mostrar el título. Por defecto, es true.
 * @param {number} param0.numberCard - Define la cantidad de tarjetas esqueléticas a mostrar. Por defecto, es 5.
 * @returns {JSX.Element} - Elemento JSX que representa el esqueleto de estaciones contenidas.
 */
const ContainedStationsSkeleton = ({ ShowTitle = true, numberCard = 5 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {ShowTitle && (
        <Skeleton
          variant="text"
          width={250}
          sx={{
            fontSize: "2.125rem",
            textAlign: "center",
            justifyContent: "center",
          }}
        />
      )}

      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {Array.from(new Array(numberCard)).map((item, index) => (
          <CardStationSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
};
export { ContainedStationsSkeleton };
