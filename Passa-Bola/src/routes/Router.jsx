import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sobre from "../pages/sobre";
import Contato from "../pages/Contato";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  { 
    path: "/sobre",
    element: <Sobre/>
  },
  {
    path: "/contato",
    element: <Contato/>
  }
]);

export default Router;