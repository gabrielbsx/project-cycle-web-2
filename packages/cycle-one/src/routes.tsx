import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Technologies } from "./pages/technologies";
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
    name: "Contato",
    path: "/contact",
    element: <Contact />,
  },
];

export const authRoutes = [];

const routes = [...mainNavigationRoutes, ...authRoutes];

export const RoutersProvider = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
