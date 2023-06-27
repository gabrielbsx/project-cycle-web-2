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
import { api } from "../services/api.service";
import { Server } from "../schema/server";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Paginate } from "../components/paginate";

interface AddServerFormValues {
  name: string;
}

interface UpdateServerFormValues {
  name: string;
}

export const Dashboard = () => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.CreatedAt);
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Desc);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [total, setTotal] = useState(0);
  const [servers, setServers] = useState<Server[]>([]);
  const [serverId, setServerId] = useState<string>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, error, isLoading } = useSWR<{
    data: { data: Server[]; total: number };
  }>(
    `servers?page=${page}&limit=${limit}&orderBy=${orderBy}&orderType=${orderType}&search=${search}&searchBy=${searchBy}`,
    api,
    {
      refreshInterval: 1,
    }
  );
  useEffect(() => {
    if (data) {
      setServers(data.data.data);
      setTotal(data.data.total);
    }
  }, [isLoading]);
  const {
    register: addServerRegister,
    handleSubmit: addServerHandleSubmit,
    formState: addServerFormState,
  } = useForm<AddServerFormValues>();
  const {
    register: updateServerRegister,
    handleSubmit: updateServerHandleSubmit,
    formState: updateServerFormState,
    setValue: setUpdateServerValue,
  } = useForm<UpdateServerFormValues>();
  const onHandleAddServer = async (addServerValues: AddServerFormValues) => {
    const addResponse = await api.post("/servers", addServerValues);
    if (addResponse.status === 201) {
      toast.success("Servidor adicionado com sucesso!");
      setIsAddModalOpen(false);
      return;
    }
    toast.error("Erro ao adicionar servidor!");
    setIsAddModalOpen(false);
  };
  const onHandleDeleteServer = async (id: string) => {
    const deleteResponse = await api.delete(`/servers/${id}`);
    if (deleteResponse.status === 200) {
      toast.success("Servidor excluído com sucesso!");
      return;
    }
    toast.error("Erro ao excluir servidor!");
    return;
  };
  const onHandleUpdateServer = async (
    updateServerValues: UpdateServerFormValues
  ) => {
    if (!serverId) {
      toast.error("Servidor não encontrado!");
      return;
    }
    const updateResponse = await api.put(
      `/servers/${serverId}`,
      updateServerValues
    );
    if (updateResponse.status === 200) {
      toast.success("Servidor atualizado com sucesso!");
      setIsEditModalOpen(false);
      return;
    }
    toast.error("Erro ao atualizar servidor!");
    setIsEditModalOpen(false);
  };
  return (
    <DashboardBase>
      <div className="flex flex-col gap-4 w-full">
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <button
            onClick={() => setIsAddModalOpen(false)}
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
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="absolute top-0 right-0 m-4 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 pb-1.5"
          >
            &times;
          </button>
          <div className="mb-4">
            <h1 className="font-bold uppercase text-center">Editar servidor</h1>
          </div>
          <div className="flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={updateServerHandleSubmit(onHandleUpdateServer)}
              method="POST"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o nome do servidor"
                  {...updateServerRegister("name")}
                />
                {updateServerFormState.errors.name ? (
                  <span className="text-red-500">
                    {updateServerFormState.errors.name.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-row justify-center mt-4 gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <div className="flex flex-row items-center justify-around gap-4">
          <h1 className="font-bold uppercase text-center">Servidores</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
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
                        <th className="px-6 py-4">Criado em</th>
                        <th className="px-6 py-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.data?.map(
                        (server: Server, index: number) => (
                          <tr
                            className="whitespace-nowrap px-6 py-4 "
                            key={server.id}
                          >
                            <td className="whitespace-nowrap px-6 py-4 ">
                              {index + 1}
                            </td>
                            <td className="w-1/2 px-6 py-4 ">{server.name}</td>
                            <td className="w-1/2 px-6 py-4 ">
                              {server.user.name ?? server.user.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 ">
                              {new Date(server.createdAt).toLocaleString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )}
                            </td>
                            <td className="whitespace- px-6 py-4 gap-4 flex">
                              <button
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase"
                                onClick={() => {
                                  setServerId(server.id);
                                  setIsEditModalOpen(true);
                                  setUpdateServerValue("name", server.name);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold uppercase"
                                onClick={() => onHandleDeleteServer(server.id)}
                              >
                                Excluir
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Paginate
              total={total}
              limit={limit}
              page={page}
              onChangePage={(page: number) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </DashboardBase>
  );
};
