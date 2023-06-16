import { Card } from "../components/card";

export const Contact = () => {
  return (
    <Card
      card={{
        className: "w-1/2",
      }}
      header={<h1 className="font-bold uppercase text-center">Contato</h1>}
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
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600">Assunto</span>
            </label>
            <select className="border rounded px-2 py-1">
              <option disabled>Selecione um assunto</option>
              <option>Sugestão</option>
              <option>Reclamação</option>
              <option>Outros</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>
              <span className="text-sm text-neutral-600">Mensagem</span>
            </label>
            <textarea
              className="border rounded px-2 py-1 min-h-[200px]"
              placeholder="Digite sua mensagem"
            />
          </div>
        </form>
      }
      footer={
        <button
          type="submit"
          className="border rounded px-2 py-1 hover:bg-neutral-100 font-light"
        >
          Enviar
        </button>
      }
    />
  );
};
