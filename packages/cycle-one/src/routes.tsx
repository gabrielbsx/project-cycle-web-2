import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Technologies } from "./pages/technologies";
import { Contact } from "./pages/contact";
import { isGuestUser } from "./utils/validate-guest-user";
import { Dashboard } from "./pages/dashboard";
import { Items } from "./pages/items";

interface Router {
  name: string;
  path: string;
  element: JSX.Element;
}

export const mainNavigationRoutes: Router[] = [
  {
    name: "Início",
    path: "/",
    element: isGuestUser() ? <Home /> : <Dashboard />,
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

export const authRoutes: Router[] = [];

export const subMenuRoutes: Router[] = [
  {
    name: "Servidores",
    path: "/",
    element: <Dashboard />,
  },
  {
    name: "Itens",
    path: "/items",
    element: <Items />,
  },
];

const routes = [...mainNavigationRoutes, ...authRoutes, ...subMenuRoutes];

export const RoutersProvider = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
