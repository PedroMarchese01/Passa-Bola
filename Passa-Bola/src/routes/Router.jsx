import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // aqui você pode adicionar rotas filhas se precisar
      // { path: "perfil", element: <Perfil /> }
    ],
  },
]);

export default Router;