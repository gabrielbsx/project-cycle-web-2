import { useContext } from "react";
import CatLogo from "../../assets/images/cat-logo.png";
import { mainNavigationRoutes, authRoutes } from "../../routes";
import { DarkModeContext } from "../../context/dark-mode";

export const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <header className="border-b dark:border-b-neutral-800">
      <nav className="flex flex-row justify-start items-center gap-6">
        <img src={CatLogo} alt="Cat Logo" width={100} className="dark:invert" />
        <div className="flex flex-row justify-between w-full">
          <ul className="flex flex-row gap-2">
            {mainNavigationRoutes.map((route, index) => (
              <li key={index}>
                <a
                  href={route.path}
                  className="border dark:border-neutral-700 rounded px-2 py-1 hover:bg-neutral-100 font-light dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
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
                  className="border dark:border-neutral-700 rounded px-2 py-1 hover:bg-neutral-100 font-light dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex mr-5">
          <button
            className="border dark:border-neutral-700 rounded px-2 py-1 hover:bg-neutral-100 font-light dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 110-4 2 2 0 000 4zM3.05 9.05a7 7 0 1113.9 0 9 9 0 10-13.9 0z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
