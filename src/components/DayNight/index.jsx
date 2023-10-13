import { Box, Divider, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { MyThemeContext } from "../../context/MyThemeContext";
import { useContext } from "react";

const DayNight = () => {
  const context = useContext(MyThemeContext);
  const renderIcon = () => {
    const style = {
      border: "2px solid #E0E0E0",
      borderRadius: "2px",
      padding: "4px",
    };
    if (!context.darkMode) {
      return (
        <IconButton
          onClick={context.changeDarkMode}
          sx={style}
        >
          <LightModeIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={context.changeDarkMode}
          sx={style}
        >
          <DarkModeIcon />
        </IconButton>
      );
    }
  };
  return (
    <>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBlockStart: "20px",
        }}
      >
        {renderIcon()}
      </Box>
    </>
  );
};
export { DayNight };
