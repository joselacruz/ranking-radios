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
import { FavoriteButton } from "../FavoriteButton";
import { useSnackbar } from "notistack";
import { useMediaQuery } from "@mui/material";
import { sliceTitle } from "../../utils/sliceTitle";

const RadioPlayer = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const context = useContext(PlayerContext);
  // Desestructuración de propiedades de context
  const { play, inReproduction, streamInfo, setPlay, setInReproduction } =
    context;
  const audioElementRef = useRef(null);
  const [showsliderSound, setShowsliderSound] = useState(false);
  const [volumen, setVolumen] = useState(100);
  const [variant, setVariant] = useState("temporary");

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const renderIcon = () => {
    const iconProps = {
      color: "primary",
      sx: { fontSize: "48px" },
    };

    if (play) {
      return inReproduction ? (
        <StopCircleIcon {...iconProps} />
      ) : (
        <CircularProgress />
      );
    } else {
      return <PlayCircleIcon {...iconProps} />;
    }
  };

  function toogleSound() {
    setShowsliderSound(!showsliderSound);
  }

  const togglePlay = () => {
    if (streamInfo) {
      setPlay(!play);
    }
  };

  // Reproducir
  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (!audioElement) return;
    if (streamInfo?.url) {
      if (play) {
        audioElement.src = streamInfo.url_resolved; // Cambia la fuente de audio para reiniciar completamente
        audioElement.load(); // Carga la nueva fuente de audio
        audioElement.play();
        setInReproduction(false);
        setVariant("permanent");
      } else {
        audioElement.pause();
        setInReproduction(false);
      }
    }
  }, [play, streamInfo]);

  //Saber si el audio Cargo o Fallo la reproduccion
  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (!audioElement) return;

    const handleLoadReproduction = (event) => {
      setInReproduction(true);
    };
    const handleLoadError = () => {
      setInReproduction(false);
      setPlay(false);
      enqueueSnackbar(
        "Sorry, we are unable to play the radio station at this time.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    };
    audioElement.addEventListener("loadeddata", handleLoadReproduction);
    audioElement.addEventListener("error", handleLoadError);

    // Importante: asegúrate de quitar el oyente de eventos cuando el componente se desmonte.
    return () => {
      audioElement.removeEventListener("loadeddata", handleLoadReproduction);
      audioElement.removeEventListener("error", handleLoadError);
    };
  }, [play, streamInfo]);

  //  subir o bajar Volumen
  useEffect(() => {
    // Cuando el componente se monta, ajusta el volumen inicial del audio
    const audioElement = audioElementRef.current;
    if (audioElement) {
      audioElement.volume = volumen / 100; // El volumen debe estar entre 0 y 1
    }
  }, [volumen]);

  //Efecto para manejar la reproducción y pausa del audio en respuesta a los controles nativos.
  useEffect(() => {
    const audioElement = audioElementRef.current;

    // Manejar la reproducción cuando se utiliza el control nativo de "play"
    const handlePlay = () => {
      setPlay(true);
    };

    // Manejar la pausa cuando se utiliza el control nativo de "pause"
    const handlePause = () => {
      setPlay(false);
      setInReproduction(false);
    };

    // Agregar oyentes de eventos al elemento de audio
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);

    // Retirar los oyentes de eventos cuando el componente se desmonta
    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
    };
  }, [context]);

  const stylesContained = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  return (
    <>
      <audio ref={audioElementRef} />

      <Drawer
        anchor="bottom"
        variant={variant}
        open={play}
        hideBackdrop={false}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.secondary.main,
            overflow: "visible",
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            border: "none",
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
                src={streamInfo?.favicon}
                alt=""
                style={{
                  width: "100%",
                  objectFit: "contain",
                  height: "100%",
                  borderRadius: "4px",
                }}
              />
            </Paper>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                {sliceTitle(streamInfo?.name)}
              </Typography>
              <Typography variant="body2">
                {sliceTitle(streamInfo?.country)}
              </Typography>
            </Box>
          </Box>

          {/* contenedor Live */}
          <Box sx={stylesContained}>
            {isMobile ? null : <StreamLine isActive={inReproduction} />}
            <IconButton
              onClick={togglePlay}
              disabled={!inReproduction && play}
            >
              {renderIcon()}
            </IconButton>
            {isMobile ? null : <StreamLine isActive={inReproduction} />}
          </Box>

          {/* contenedor botones volumen */}

          {isMobile ? null : (
            <Box sx={stylesContained}>
              <Box sx={{ position: "relative" }}>
                <IconButton onClick={toogleSound}>
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

              <FavoriteButton
                size="28px"
                station={streamInfo}
              />
            </Box>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export { RadioPlayer };
