import { useState, useEffect } from "react";
import { DashboardBase } from "../components/dashboard";
import {
  OperatorEnum,
  OrderByEnum,
  OrderTypeEnum,
  Pagination,
} from "../schema/abstract-crud";
import { Modal } from "../components/modal";
import { useForm } from "react-hook-form";
import { apiService } from "../services/api.service";
import { Server } from "../schema/server";
import { toast } from "react-toastify";
import useSWR from "swr";

interface AddServerFormValues {
  name: string;
}

export const Dashboard = () => {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.CreatedAt);
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Desc);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [total, setTotal] = useState(0);
  const [servers, setServers] = useState<Server[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useSWR(`server`, (url: string) =>
    apiService.handleAbstractCRUD({
      entity: url,
      operator: OperatorEnum.ReadAll,
      pagination: {
        take,
        skip,
        orderBy,
        orderType,
        search,
        searchBy,
      },
    })
  );
  const {
    register: addServerRegister,
    handleSubmit: addServerHandleSubmit,
    formState: addServerFormState,
  } = useForm<AddServerFormValues>();
  const onHandleAddServer = async (data: AddServerFormValues) => {
    const response = await apiService.handleAbstractCRUD({
      entity: "server",
      operator: OperatorEnum.Create,
      data,
    });
    console.log(response);
    if (response.status === 201) {
      setIsModalOpen(false);
      toast.success("Servidor adicionado com sucesso!");
    }
  };
  return (
    <DashboardBase>
      <div className="flex flex-col gap-4 w-full">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 m-4 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 pb-1.5"
          >
            &times;
          </button>
          <div className="mb-4">
            <h1 className="font-bold uppercase text-center">
              Adicionar servidor
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={addServerHandleSubmit(onHandleAddServer)}
              method="POST"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o nome do servidor"
                  {...addServerRegister("name")}
                />
                {addServerFormState.errors.name ? (
                  <span className="text-red-500">
                    {addServerFormState.errors.name.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-row justify-center mt-4 gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <div className="flex flex-row items-center justify-around gap-4">
          <h1 className="font-bold uppercase text-center">Servidores</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase"
          >
            Adicionar
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border rounded-xl">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800">
                      <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Nome</th>
                        <th className="px-6 py-4">Autor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.map((server: Server, index: number) => (
                        <tr
                          className="whitespace-nowrap px-6 py-4 "
                          key={server.id}
                        >
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {server.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {server.user.name ?? server.user.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardBase>
  );
};
