import { Card } from "../components/card";

export const SignIn = () => {
  return (
    <Card
      card={{
        className: "w-1/2",
      }}
      header={<h1 className="font-bold uppercase text-center">Assinante</h1>}
      main={
        <form className="gap-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600 dark:text-neutral-100">E-mail</span>
            </label>
            <input
              type="email"
              className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800 active:border-none"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600 dark:text-neutral-100">Senha</span>
            </label>
            <input
              type="password"
              className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800"
              placeholder="Digite sua senha"
            />
          </div>
        </form>
      }
      footer={
        <button
          type="submit"
          className="rounded px-2 py-1 hover:bg-neutral-100 border dark:border-neutral-700 dark:hover:bg-neutral-700 dark:bg-neutral-900 dark:text-white"
        >
          Entrar
        </button>
      }
    />
  );
};
