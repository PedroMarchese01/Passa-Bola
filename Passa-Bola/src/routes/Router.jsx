import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import HomePassaBola from "@/pages/HomePassaBola";
import Analytics from "@/pages/childrens pages/Analytics";
import Events from "@/pages/childrens pages/Events"
import Admin from "@/pages/childrens pages/Admin";
import Users from "@/pages/childrens pages/Users"
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
      }
    ]
  }
]);

export default Router;