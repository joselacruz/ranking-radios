import { useContext, useState } from "react";
import { StationContext } from "../../context/StationContext";
import { PlayPauseIcon } from "../PlayPauseIcon";
import { useNavigate } from "react-router-dom";
import { StarInCircleIcon } from "../StarInCircleIcon";
import { calcScore } from "../../utils/scoreStation";
import { useMediaQuery } from "@mui/material";
import { sliceTitle } from "../../utils/sliceTitle";
import { useStationNavigation } from "../../utils/stationNav";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Box,
} from "@mui/material";

const CardStation = ({ station }) => {
  const stationNav = useStationNavigation();

  const contextStation = useContext(StationContext);
  const isMobile = useMediaQuery("(max-width:800px)");

  const location = useNavigate();

  //Estado que activa el Boton de play inicialmente en falso
  const [isHovered, setIsHovered] = useState(false);

  //Al pasar el cursor sobre sobre el elemento  hacemos visible el boton de play
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  //Al salir el cursor del elemento ocultamos el boton de play
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  /**
   * Maneja el evento de clic en la tarjeta y navega a la ruta de detalles de la estación.
   * @param {*} event - El objeto de evento del clic.
   */
  const handleStationDetails = (event) => {
    // Verifica que el clic no se haya realizado en el elemento 'svg'
    // El cual es el boton de play

    if (event.target.nodeName !== "svg") {
      // Verifica si la estación tiene un ícono Imagen (favicon) antes de proceder.
      if (station.favicon) {
        // cambia la ruta y me muestra los detalles de la estacion
        stationNav({ station: station });
      }
    }
  };
  return (
    <Card
      elevation={16}
      sx={{
        width: isMobile ? "130px" : "150px",
        position: "relative",
        height: "210px",

        transition: "opacity 0.3s ease-in-out", // Animación de opacidad
        "&:hover": {
          opacity: "0.9", // Opacidad cuando se realiza un hover en la Card
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleStationDetails}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {station.favicon ? (
          <CardMedia
            sx={{
              height: 115,
              width: "100%",
              borderRadius: "4px",
              backgroundColor: "rgb(87 80 80 / 3%)",
            }}
            image={station.favicon}
            title={station.name}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={115}
            animation="wave"
          ></Skeleton>
        )}

        <CardContent sx={{ p: 1, marginTop: 1 }}>
          <Typography
            textTransform="uppercase"
            component="h5"
            variant="p"
            marginBottom="10px"
            translate="no"
            sx={{ height: "24px" }}
          >
            {sliceTitle(station.name)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "20px" }}
            gutterBottom
            translate="no"
          >
            {station.countrycode}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "3px",
              alignItems: "end",
            }}
          >
            <StarInCircleIcon size="24px" />
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              translate="no"
            >
              {calcScore({ stationVotes: station.votes })}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      {isHovered &&
        station.favicon && ( // Mostrar el icono de reproducción en hover
          <Box
            color="primary"
            className={`hover-button ${isHovered ? "hovered" : ""}`}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0%",
              transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`, // Escala inicial y al hacer hover
              opacity: isHovered ? 1 : 0.9, // Opacidad controlada por el hover
              transition:
                "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Animación suave
            }}
          >
            <PlayPauseIcon station={station} />
          </Box>
        )}
    </Card>
  );
};

export { CardStation };
