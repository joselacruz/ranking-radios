import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Header } from "../components/Header";
import { RadioPlayer } from "../components/RadioPlayer";
import { SearchByGender } from "../pages/SearchByGender";
import { SearchByLocation } from "../pages/SearchByLocation";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/search", element: <Search /> },
    { path: "/gender", element: <SearchByGender /> },
    { path: "/location", element: <SearchByLocation /> },
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
