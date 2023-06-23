import BottomLinks from "../components/bottom-links";
import { Card } from "../components/card";
import { DescriptionProject } from "../components/description-project";
import { SignIn } from "../components/auth/sign-in";
import { SignUp } from "../components/auth/sign-up";

export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="container mx-auto flex flex-row gap-4 xl:w-2/3 justify-center items-start">
        <div className="flex flex-col w-1/2">
          <Card
            header={<h1 className="font-bold uppercase text-center">Ghost</h1>}
            main={
              <div>
                <DescriptionProject />
              </div>
            }
            footer={
              <div className="flex flex-row gap-2">
                <span className="text-sm">Autor</span>
                <span className="text-sm font-bold">Gabriel Barbosa</span>
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <SignUp />
          <SignIn />
        </div>
      </div>
      <BottomLinks />
    </div>
  );
};
