import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
  CircularProgress,
} from "@mui/material";

const CardStation = ({ station }) => {
  const context = useContext(PlayerContext);

  const [isHovered, setIsHovered] = useState(false);
  const renderTags = () => {
    if (station.tags && station.tags.length > 0) {
      const rt = station.tags.map((tag) => {
        return <span key={tag}> {tag}</span>;
      });
      return rt;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const sendToStream = () => {
    if (stationExistInContext()) {
      context.setPlay(!context.play);
    }
    //si ya esta repoduciendo una estaccion actualizamos la url
    else {
      context.setStreamInfo(station);
      context.setPlay(true);
    }
  };

  function stationExistInContext() {
    if (context.streamInfo == station) {
      return true;
    } else {
      return false;
    }
  }

  const renderIcon = () => {
    const styles = {
      fontSize: "58px",
    };

    if (stationExistInContext()) {
      if (context.play) {
        if (context.inReproduction) {
          return <StopCircleIcon sx={styles} />;
        } else {
          return <CircularProgress sx={styles} />;
        } // Mueve esta llave al mismo nivel que el return de CircularProgress
      } else {
        return <PlayCircleOutlineIcon sx={styles} />;
      }
    } else {
      return <PlayCircleOutlineIcon sx={styles} />;
    }
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
        {station.favicon ? (
          <CardMedia
            sx={{
              height: 115,
              width: "100%",
              borderRadius: "4px",
              objectFit: "cover",
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
          onClick={sendToStream}
          disabled={!context.inReproduction && context.play}
        >
          {renderIcon()}
        </IconButton>
      )}
    </Card>
  );
};

export { CardStation };
