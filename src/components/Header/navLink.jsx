import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const navLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Favorite", path: "/favorite", icon: <FavoriteIcon /> },
  { title: "Recent", path: "/recent", icon: <ScheduleIcon /> },
  { title: "Search", path: "/search", icon: <SearchIcon /> },
  {
    title: "By gender",
    path: "/gender",
    icon: <AudiotrackIcon />,
  },
  { title: "By location", path: "/location", icon: <LocationOnIcon /> },
];

export { navLinks };
