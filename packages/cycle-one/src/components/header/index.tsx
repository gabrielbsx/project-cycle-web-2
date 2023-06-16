import CatLogo from "../../assets/images/cat-logo.png";
import { mainNavigationRoutes, authRoutes } from "../../routes";

export const Header = () => {
  return (
    <header className="border-b">
      <nav className="flex flex-row justify-start items-center gap-6">
        <img src={CatLogo} alt="Cat Logo" width={100} className="" />
        <div className="flex flex-row justify-between w-full">
          <ul className="flex flex-row gap-2">
            {mainNavigationRoutes.map((route, index) => (
              <li key={index}>
                <a
                  href={route.path}
                  className="border rounded px-2 py-1 hover:bg-neutral-100 font-light"
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mx-10">
            {authRoutes.map((route, index) => (
              <li key={index}>
                <a
                  href={route.path}
                  className="border rounded px-2 py-1 hover:bg-neutral-100 font-light"
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
