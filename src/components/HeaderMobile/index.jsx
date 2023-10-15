import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../Logo";
import { AppBar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const HeaderMobile = ({ children, toogle }) => {
  const location = useNavigate();

  return (
    <AppBar sx={{ flexDirection: "row", padding: "20px 20px" }}>
      <MenuIcon onClick={toogle} />
      <Logo />
      {children}
      <SearchIcon
        onClick={() => {
          location("/search");
        }}
      />
    </AppBar>
  );
};

export { HeaderMobile };
