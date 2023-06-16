import { Card } from "../components/card";

export const SignIn = () => {
  return (
    <Card
      card={{
        className: "w-1/2",
      }}
      header={
        <h1 className="font-bold uppercase text-center">
          Formulário de assinatura
        </h1>
      }
      main={
        <form className="gap-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600">Nome</span>
            </label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600">E-mail</span>
            </label>
            <input
              type="email"
              className="border rounded px-2 py-1"
              placeholder="Digite seu e-mail"
            />
          </div>
        </form>
      }
      footer={
        <button className="border rounded px-2 py-1 hover:bg-neutral-100 font-light">
          Assinar
        </button>
      }
    />
  );
};
