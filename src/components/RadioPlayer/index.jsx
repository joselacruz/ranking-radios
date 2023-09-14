import { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  LinearProgress,
  Paper,
  Popover,
  Slider,
  Typography,
} from "@mui/material";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RadioPlayer = () => {
  const [play, setPlay] = useState(true);
  const [showsliderSound, setShowsliderSound] = useState(false);

  const theme = useTheme();

  function renderIcon() {
    if (!play) {
      return (
        <PlayCircleIcon
          color="primary"
          sx={{ fontSize: "48px" }}
        />
      );
    } else {
      return (
        <StopCircleIcon
          color="primary"
          sx={{ fontSize: "48px" }}
        />
      );
    }
  }
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }
  function handleSound() {
    setShowsliderSound(!showsliderSound);
  }

  return (
    <>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinearProgress
              valueBuffer={1}
              color="secondary"
              sx={{ width: "70px" }}
            />
            <IconButton>{renderIcon()}</IconButton>
            <LinearProgress
              color="secondary"
              valueBuffer={50}
              sx={{ width: "70px" }}
            />
          </Box>
          {/* contenedor botones volumen */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{ position: "relative" }}
              onClick={handleSound}
            >
              <VolumeUpIcon sx={{ fontSize: "28px" }} />

              {showsliderSound && (
                <Slider
                  sx={{
                    position: "absolute",
                    top: "-140px",
                    '& input[type="range"]': {
                      WebkitAppearance: "slider-vertical",
                    },
                    height: "100px",
                  }}
                  orientation="vertical"
                  defaultValue={100}
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  onKeyDown={preventHorizontalKeyboardNavigation}
                />
              )}
            </IconButton>
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
