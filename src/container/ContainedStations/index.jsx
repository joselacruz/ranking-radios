import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { CardStation } from "../../components/CardStation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const ContainedStations = ({ stations, titulo, onLastSlideReached }) => {
  const [load, setLoad] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 5; // Cambia esto para controlar cuántas fotos se muestran a la vez

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide - slidesPerPage < 0 ? 0 : prevSlide - slidesPerPage
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + slidesPerPage >= stations.length
        ? (onLastSlideReached(), stations.length - 1) // Llama a la función de devolución de llamada
        : prevSlide + slidesPerPage
    );
  };

  return (
    <>
      <Typography
        variant="h4"
        textAlign="center"
        margin="8px"
      >
        {titulo}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        position="relative"
        paddingBottom="48px"
      >
        {stations
          .slice(currentSlide, currentSlide + slidesPerPage)
          .map((station) => {
            return (
              <CardStation
                key={station.stationuuid}
                station={station}
              />
            );
          })}

        <IconButton
          color="secondary"
          sx={{ position: "absolute", left: 0, top: "50px" }}
          onClick={handlePrevSlide}
        >
          <NavigateBeforeIcon sx={{ fontSize: "48px" }} />
        </IconButton>
        <IconButton
          color="secondary"
          sx={{ position: "absolute", right: 0, top: "50px" }}
          onClick={handleNextSlide}
        >
          <NavigateNextIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </Box>
    </>
  );
};

export { ContainedStations };
