import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { Header } from "../header";
import { SubMenu } from "../submenu";

export const DashboardBase = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Header />
      <SubMenu />
      <div className="container mx-auto flex py-5">
        {children}
      </div>
    </div>
  );
};
