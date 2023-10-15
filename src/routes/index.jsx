import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Header } from "../components/Header";
import { RadioPlayer } from "../components/RadioPlayer";
import { SearchByGender } from "../pages/SearchByGender";
import { SearchByLocation } from "../pages/SearchByLocation";
import { ViewStation } from "../pages/ViewStation";
import { Recent } from "../pages/Recent";
import { Favorite } from "../pages/Favorite";

const AppRoutes = () => {
  //cada vez que una ruta este activa el scroll de la pagina siempre en la parte superior
  window.scrollTo(0, 0);
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/search", element: <Search /> },
    { path: "/gender", element: <SearchByGender /> },
    { path: "/location", element: <SearchByLocation /> },
    { path: "/view/:id", element: <ViewStation /> },
    { path: "/recent", element: <Recent /> },
    { path: "/favorite", element: <Favorite /> },
  ]);
  return routes;
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <RadioPlayer />
      <AppRoutes />
    </BrowserRouter>
  );
};
export { Navigation };
