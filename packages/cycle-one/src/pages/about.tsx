import { Header } from "../components/header";

export const About = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col mt-5 border rounded gap-4">
          <header className="flex justify-center border-b p-5">
            <h1 className="font-bold uppercase text-center">Sobre o Projeto</h1>
          </header>
          <main className="flex flex-col gap-2 px-5">
            <p>
              A aplicação a ser desenvolvida é um sistema de gerenciamento de
              contas de servidores que permitirá aos usuários controlar e
              monitorar várias contas em diferentes servidores.
            </p>
            <p>
              A aplicação fornecerá um ambiente centralizado para acessar e
              gerenciar informações gerais das contas.
            </p>
            <p>Principais recursos e funcionalidades da aplicação:</p>
            <ul>
              <li>Os usuários poderão adicionar várias contas de servidores</li>
              <li>
                A aplicação terá um painel de controle intuitivo onde os
                usuários poderão visualizar todas as contas de servidor
                registradas. O painel de controle fornecerá uma visão geral das
                contas, incluindo informações gerais como inventário e
                equipamentos
              </li>
              <li>
                A aplicação exigirá autenticação dos usuários para acessar as
                contas e garantir que apenas pessoas autorizadas possam
                gerenciá-las.
              </li>
              <li>
                A aplicação deve poder importar uma base de dados binárias para
                que o usuário possa administrar os dados dessa conta no servidor
              </li>
              <li>O usuário poderá adicionar, remover e alterar servidores</li>
              <li>
                A aplicação permitirá a criação, alteração e exclusão de contas
                de gerenciamento
              </li>
            </ul>
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
