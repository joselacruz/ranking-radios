import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Header } from "../components/Header";
import { RadioPlayer } from "../components/RadioPlayer";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/search", element: <Search /> },
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
