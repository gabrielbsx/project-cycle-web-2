import BottomLinks from "../components/bottom-links";
import { Card } from "../components/card";
import { DescriptionProject } from "../components/description-project";

export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="container mx-auto flex flex-row gap-4 xl:w-2/3 justify-center items-start">
        <Card
          card={{
            className: "xl:w-2/3",
          }}
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
        <Card
          card={{
            className: "xl:w-2/3",
          }}
          header={<h1 className="font-bold uppercase text-center">Login</h1>}
          main={
            <div>
              <form className="gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                  <label>
                    <span className="text-sm text-neutral-600 dark:text-neutral-100">
                      E-mail
                    </span>
                  </label>
                  <input
                    type="email"
                    className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800 active:border-none"
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>
                    <span className="text-sm text-neutral-600 dark:text-neutral-100">
                      Senha
                    </span>
                  </label>
                  <input
                    type="password"
                    className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800"
                    placeholder="Digite sua senha"
                  />
                </div>
              </form>
            </div>
          }
          footer={
            <button
              type="submit"
              className="rounded px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Entrar
            </button>
          }
        />
      </div>
      <BottomLinks />
    </div>
  );
};
