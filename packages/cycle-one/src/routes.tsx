import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { SignIn } from "./pages/sign-in";

export const mainNavigationRoutes = [
  {
    name: "Início",
    path: "/",
    element: <Home />,
  },
  {
    name: "Sobre o Projeto",
    path: "/about",
    element: <About />,
  },
];

export const authRoutes = [
  {
    name: "Assinar",
    path: "/sign-in",
    element: <SignIn />,
  },
];

const routes = [...mainNavigationRoutes, ...authRoutes];

const router = createBrowserRouter(routes);

export const RoutersProvider = () => <RouterProvider router={router} />;
