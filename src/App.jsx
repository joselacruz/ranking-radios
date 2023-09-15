import React from "react";
import ReactDOM from "react-dom/client";
import { Navigation } from "./routes/index.jsx";
import { Header } from "./components/Header";
import { themeOptions } from "./utils/themeOptions.js";
import { PlayerProvider } from "./context/PlayerContext.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <PlayerProvider>
        <CssBaseline />
        <Header />
        <Navigation />
      </PlayerProvider>
    </ThemeProvider>
  </React.StrictMode>
);
