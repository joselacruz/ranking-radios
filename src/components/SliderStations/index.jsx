import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

const photos = [
  "https://images.pexels.com/photos/18306635/pexels-photo-18306635/free-photo-of-contraste.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/18306635/pexels-photo-18306635/free-photo-of-contraste.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/18306635/pexels-photo-18306635/free-photo-of-contraste.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/18293981/pexels-photo-18293981/free-photo-of-ligero-ciudad-gente-edificio.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/18306635/pexels-photo-18306635/free-photo-of-contraste.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/18306635/pexels-photo-18306635/free-photo-of-contraste.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

const SliderStations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 3; // Cambia esto para controlar cuántas fotos se muestran a la vez

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide - slidesPerPage < 0 ? 0 : prevSlide - slidesPerPage
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + slidesPerPage >= photos.length
        ? photos.length - 1
        : prevSlide + slidesPerPage
    );
  };

  return (
    <Box
      maxWidth="800px"
      mx="auto"
    >
      <Typography
        variant="h6"
        align="center"
      >
        {`Mostrando fotos ${currentSlide + 1} - ${
          currentSlide + slidesPerPage > photos.length
            ? photos.length
            : currentSlide + slidesPerPage
        } de ${photos.length}`}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Button onClick={handlePrevSlide}>Anterior</Button>
        <Button onClick={handleNextSlide}>Siguiente</Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {photos
          .slice(currentSlide, currentSlide + slidesPerPage)
          .map((photo, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 300 }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo}
                  alt={`Slide ${currentSlide + index + 1}`}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export { SliderStations };
