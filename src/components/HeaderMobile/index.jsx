import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../Logo";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

const HeaderMobile = ({ children, toogle }) => {
  return (
    <AppBar sx={{ flexDirection: "row", padding: "20px 20px" }}>
      <MenuIcon onClick={toogle} />
      <Logo />
      {children}
    </AppBar>
  );
};

export { HeaderMobile };
