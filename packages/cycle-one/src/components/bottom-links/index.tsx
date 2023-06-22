import { mainNavigationRoutes, authRoutes } from "../../routes";
import { Link } from "react-router-dom";

const BottomLinks = () => {
  return (
    <div className="container mx-auto mt-4">
      <ul className="flex flex-row justify-center gap-4">
        {mainNavigationRoutes.map((route, index) => (
          <li key={index}>
            <Link
              to={route.path}
              className="border dark:border-neutral-700 rounded px-2 py-1 hover:bg-neutral-100 font-light dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomLinks;
