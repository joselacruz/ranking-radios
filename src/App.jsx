import React from "react";
import ReactDOM from "react-dom/client";
import { Navigation } from "./routes/index.jsx";
import { themeOptions } from "./utils/themeOptions.js";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { SnackbarProvider } from "notistack";
import { StationProvider } from "./context/StationContext.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <PlayerProvider>
        <StationProvider>
          <SnackbarProvider
            maxSnack={1}
            autoHideDuration={3000}
          >
            <CssBaseline />

            <Navigation />
          </SnackbarProvider>
        </StationProvider>
      </PlayerProvider>
    </ThemeProvider>
  </React.StrictMode>
);
