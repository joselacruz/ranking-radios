import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeLight, themeDark } from "../utils/themeOptions";

export const MyThemeContext = createContext();

export const MyThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState(themeLight);

  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      setTheme(themeLight);
    } else {
      setTheme(themeDark);
    }
  }, [darkMode]);
  return (
    <MyThemeContext.Provider value={{ darkMode, changeDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MyThemeContext.Provider>
  );
};
