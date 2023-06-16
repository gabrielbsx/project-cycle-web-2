import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { SignIn } from "./pages/sign-in";
import { Technologies } from "./pages/technologies";
import { Team } from "./pages/team";
import { Contact } from "./pages/contact";

export const mainNavigationRoutes = [
  {
    name: "Início",
    path: "/",
    element: <Home />,
  },
  {
    name: "Sobre o projeto",
    path: "/about",
    element: <About />,
  },
  {
    name: "Tecnologias",
    path: "/technologies",
    element: <Technologies />,
  },
  {
    name: "Desenvolvedores",
    path: "/team",
    element: <Team />,
  },
  {
    name: "Contato",
    path: "/contact",
    element: <Contact />,
  },
];

export const authRoutes = [
  {
    name: "Assinantes",
    path: "/sign-in",
    element: <SignIn />,
  },
];

const routes = [...mainNavigationRoutes, ...authRoutes];

const router = createBrowserRouter(routes);

export const RoutersProvider = () => <RouterProvider router={router} />;
