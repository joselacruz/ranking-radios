import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useTheme } from "@emotion/react";
import { StreamLine } from "../StreamLine";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Paper,
  Slider,
  Typography,
  CircularProgress,
} from "@mui/material";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RadioPlayer = () => {
  const context = useContext(PlayerContext);
  const audioElementRef = useRef(null);
  const [showsliderSound, setShowsliderSound] = useState(false);
  const [volumen, setVolumen] = useState(100);
  const theme = useTheme();

  function renderIcon() {
    const iconProps = {
      color: "primary",
      sx: { fontSize: "48px" },
    };

    if (context.play) {
      if (context.inReproduction) {
        return <StopCircleIcon {...iconProps} />;
      } else {
        return <CircularProgress />;
      }
    } else {
      return <PlayCircleIcon {...iconProps} />;
    }
  }

  function showSound() {
    setShowsliderSound(!showsliderSound);
  }

  const togglePlay = () => {
    if (context.streamInfo) {
      context.setPlay(!context.play);
    }
  };

  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (!audioElement) return;
    if (context.streamInfo?.url) {
      if (context.play) {
        audioElement.src = context.streamInfo.url; // Cambia la fuente de audio para reiniciar completamente
        audioElement.load(); // Carga la nueva fuente de audio
        audioElement.play();
        context.setInReproduction(false);
      } else {
        audioElement.pause();
        context.setInReproduction(false);
      }
    }
  }, [context.play, context.streamInfo]);

  const stylesContained = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (!audioElement) return;

    const handleLoadReproduction = () => {
      context.setInReproduction(true);

      // Realiza acciones adicionales cuando el audio ha terminado de cargar.
    };

    audioElement.addEventListener("loadeddata", handleLoadReproduction);

    // Importante: asegúrate de quitar el oyente de eventos cuando el componente se desmonte.
    return () => {
      audioElement.removeEventListener("loadeddata", handleLoadReproduction);
    };
  }, [context.play, context.streamInfo]);

  useEffect(() => {
    // Cuando el componente se monta, ajusta el volumen inicial del audio
    const audioElement = audioElementRef.current;
    if (audioElement) {
      audioElement.volume = volumen / 100; // El volumen debe estar entre 0 y 1
    }
  }, [volumen]);

  return (
    <>
      <audio ref={audioElementRef} />
      <Drawer
        anchor="bottom"
        open={false}
        hideBackdrop={false}
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.secondary.main,
            overflow: "visible",
          },
        }}
      >
        {/* contenedor General */}
        <Container
          sx={{
            height: 88,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            paddingInlineStart: "16px",
            paddingInlineEnd: "16px",
          }}
        >
          {/* Contenedor info Station */}
          <Box sx={stylesContained}>
            <Paper
              elevation={6}
              sx={{
                width: "64px",
                height: "64px",
              }}
            >
              <img
                src="https://www.0nradio.com/logos/0n-smooth-jazz_600x600.jpg"
                alt=""
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </Paper>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Rádio Buteco Sertanejo
              </Typography>
              <Typography variant="body2">Peru</Typography>
            </Box>
          </Box>

          {/* contenedor Live */}
          <Box sx={stylesContained}>
            <StreamLine isActive={context.inReproduction} />
            <IconButton
              onClick={togglePlay}
              disabled={!context.inReproduction && context.play}
            >
              {renderIcon()}
            </IconButton>

            <StreamLine isActive={context.inReproduction} />
          </Box>

          {/* contenedor botones volumen */}

          <Box sx={stylesContained}>
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={showSound}>
                <VolumeUpIcon sx={{ fontSize: "28px" }} />
              </IconButton>
              {showsliderSound && (
                <Slider
                  sx={{
                    position: "absolute",
                    top: "-140px",
                    left: "4px",
                    height: "100px",
                  }}
                  orientation="vertical"
                  aria-label="Volume"
                  onChange={(event, newValue) => {
                    setVolumen(newValue);
                  }}
                  value={volumen}
                />
              )}
            </Box>

            <IconButton>
              <FavoriteIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export { RadioPlayer };