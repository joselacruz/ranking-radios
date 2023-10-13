import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardStation } from "../../components/CardStation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useMediaQuery } from "@mui/material";

const CardContainerWithSlider = ({ stations, titulo, onLastSlideReached }) => {
  const [load, setLoad] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(5); // Cambia esto para controlar cuántas fotos se muestran a la vez
  const isMobile = useMediaQuery("(max-width:768px)");

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide - slidesPerPage < 0 ? 0 : prevSlide - slidesPerPage
    );
  };

  const handleNextSlide = () => {
    //Para traer mas contenido al slider
    // setCurrentSlide((prevSlide) =>
    //   prevSlide + slidesPerPage >= stations.length
    //     ? (onLastSlideReached(), stations.length - 1) // Llama a la función de devolución de llamada
    //     : prevSlide + slidesPerPage
    // );

    setCurrentSlide((prevSlide) => {
      const nextSlide = prevSlide + slidesPerPage;

      if (nextSlide >= stations.length) {
        // Evita que el slider muestre el elemento número 10
        return prevSlide;
      }

      return nextSlide;
    });
  };

  //Actualiza la cantidad del elementos a mostrar si estamos en mobile
  //Mostrams todos los elementos
  useEffect(() => {
    if (isMobile) {
      setSlidesPerPage(10);
    } else {
      setSlidesPerPage(5);
    }
  }, [isMobile]);
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

        <>
          {isMobile ? null : (
            <>
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
            </>
          )}
        </>
      </Box>
    </>
  );
};

export { CardContainerWithSlider };
