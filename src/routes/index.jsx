import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";

const AppRoutes = () => {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  return routes;
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
export { Navigation };
