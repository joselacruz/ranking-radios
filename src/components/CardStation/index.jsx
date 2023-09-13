import { useState } from "react";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const CardStation = ({ station }) => {
  const renderTags = () => {
    if (station.tags && station.tags.length > 0) {
      const rt = station.tags.map((tag) => {
        return <span key={tag}> {tag}</span>;
      });
      return rt;
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        width: "150px",
        position: "relative",
        height: "250px",

        transition: "opacity 0.3s ease-in-out", // Animación de opacidad
        "&:hover": {
          opacity: "0.9", // Opacidad cuando se realiza un hover en la Card
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <CardMedia
          sx={{
            height: 115,
            width: "100%",
            borderRadius: "4px",
            objectFit: "cover",
          }}
          image={station.favicon}
          title={station.name}
        ></CardMedia>
        <CardContent sx={{ p: 1, marginTop: 1 }}>
          <Typography
            textTransform="uppercase"
            component="h5"
            variant="p"
            marginBottom="10px"
          >
            {station.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {station.country}
          </Typography>
          <Typography
            variant="body2"
            color="text.disabled"
          >
            {station.tags.length > 1 && <>Tags: {renderTags()}</>}
          </Typography>
        </CardContent>
      </CardActionArea>

      {isHovered && ( // Mostrar el icono de reproducción en hover
        <IconButton
          color="primary"
          className={`hover-button ${isHovered ? "hovered" : ""}`}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0%",
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`, // Escala inicial y al hacer hover
            opacity: isHovered ? 1 : 0.9, // Opacidad controlada por el hover
            transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Animación suave
          }}
        >
          <PlayCircleOutlineIcon
            sx={{
              fontSize: "58px",
            }}
          />
        </IconButton>
      )}
    </Card>
  );
};

export { CardStation };
