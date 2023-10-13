import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Logo } from "../Logo";
import { navLinks } from "./navLink";
import { NavLink } from "react-router-dom";
import { DayNight } from "../DayNight";
import { HeaderMobile } from "../HeaderMobile";

import { useMediaQuery } from "@mui/material";

import "./style.css";
import { useState } from "react";

const renderDrawer = ({ variant, open, hideBackdrop, onClose = null }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      hideBackdrop={hideBackdrop}
      variant={variant}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          border: "none",
        },
      }}
    >
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <nav>
          <List>
            <ListItem sx={{ textAlign: "center" }}>
              <Logo />
              {/* <ListItemText>
            <Logo />
          </ListItemText> */}
            </ListItem>
            {navLinks.map((item) => (
              <ListItem
                disablePadding
                key={item.title}
                onClick={onClose}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    "&.active": {
                      backgroundColor: "#b5bac95d",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.title}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <DayNight />
      </Box>
    </Drawer>
  );
};

const Header = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [openDrawer, setOpeDrawer] = useState(false);

  function toogleDrawer() {
    setOpeDrawer(!openDrawer);
  }
  function onCloseDrawer() {
    setOpeDrawer(false);
  }
  return (
    <>
      {isMobile && (
        <HeaderMobile
          toogle={toogleDrawer}
          children={renderDrawer({
            variant: "temporary",
            open: openDrawer,
            hideBackdrop: !openDrawer,
            onClose: onCloseDrawer,
          })}
        />
      )}

      {!isMobile &&
        renderDrawer({ variant: "permanent", open: true, hideBackdrop: true })}
    </>
  );
};

export { Header };
