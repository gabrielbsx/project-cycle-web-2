import { Header } from "../components/header";

export const Technologies = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex flex-col mt-5 border rounded gap-4 w-1/2">
          <header className="flex justify-center border-b p-5">
            <h1 className="font-bold uppercase text-center">Tecnologias</h1>
          </header>
          <main className="flex flex-col gap-2 px-5">
            <p>
              Será utilizada as seguintes tecnologias para o desenvolvimento do
              software:
            </p>
            <p>
              <ul>
                <li>React</li>
                <li>Vite</li>
                <li>Typescript</li>
                <li>TailwindCSS</li>
                <li>NodeJS</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Zod</li>
              </ul>
            </p>
          </main>
          <footer className="border-t flex p-3 justify-end items-center">
            <div className="flex flex-row gap-2">
              <span className="text-sm">Autor</span>
              <span className="text-sm font-bold">Gabriel Barbosa</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
