import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { navLinks } from "./navLink";
import { NavLink } from "react-router-dom";
import "./style.css";
const Header = () => {
  return (
    <>
      <Drawer
        anchor="left"
        open={false}
        hideBackdrop={true}
        variant="permanent"
      >
        <Box sx={{ width: 250, flexShrink: 0 }}>
          <nav>
            <List>
              <ListItem sx={{ textAlign: "center" }}>
                <ListItemText>Rank Stations</ListItemText>
              </ListItem>
              {navLinks.map((item) => (
                <ListItem
                  disablePadding
                  key={item.title}
                >
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
};

export { Header };
