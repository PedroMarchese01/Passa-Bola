import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import HomePassaBola from "@/pages/HomePassaBola";
import Campeonatos from "@/pages/Campeonatos"; 
import Analytics from "@/pages/childrens-pages/Analytics";
import Events from "@/pages/childrens-pages/Events"
import Admin from "@/pages/childrens-pages/Admin";
import Users from "@/pages/childrens-pages/Users"
import Sobre from "../pages/sobre";
import Contato from "../pages/Contato";
import Jogos from "../pages/Jogos";
import Perfil from "../pages/Perfil";




import Clima from "@/pages/childrens-pages/Clima";
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
    path: "/campeonatos",      
    element: <Campeonatos />,
  },
  {
    path:"/adminControlPainel",
    element: <HomePassaBola/>,
    children:[
      {
        index: true,
        element: <Analytics/>
      },
      {
        path:"eventos",
        element:<Events/>
      },
      {
        path: "admin",
        element: <Admin/>
      },
      {
        path: "usuarios",
        element: <Users/>,
      },
      {
        path: "clima",
        element: <Clima/>
      }
    ]
  },
  { 
    path: "/sobre",
    element: <Sobre/>
  },
  {
    path: "/contato",
    element: <Contato/>
  },
  {
    path: "/jogos-mensais",
    element: <Jogos/>
  },
  {
    path: "/perfil",
    element: <Perfil/>
  }

  

]);

export default Router;