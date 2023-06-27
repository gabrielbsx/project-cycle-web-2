import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { subMenuRoutes } from "../../routes";

export const SubMenu = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="border-b flex flex-row justify-around">
      <ul className="flex flex-row justify-start items-center p-2 gap-4">
        {subMenuRoutes.map((route, index) => (
          <li key={index}>
            <a
              href={route.path}
              className="flex border rounded-md dark:border-neutral-700 px-4 py-1 hover:bg-neutral-100 font-light dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              {route.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-end items-center border-b p-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-100 font-light italic">
          Você está logado como:
          {user?.name ?? user?.email}
        </span>
      </div>
    </nav>
  );
};
