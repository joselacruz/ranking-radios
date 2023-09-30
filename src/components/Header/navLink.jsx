import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ScheduleIcon from "@mui/icons-material/Schedule";

const navLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Search", path: "/search", icon: <SearchIcon /> },
  { title: "Recent", path: "/recents", icon: <ScheduleIcon /> },
];

export { navLinks };
