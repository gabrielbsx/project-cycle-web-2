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
import { Item } from "../schema/item";

interface AddItemFormValues {
  name: string;
  identifier: number;
  serverId: string;
  effects: string[];
}

interface UpdateItemFormValues {
  name: string;
  identifier: number;
  serverId: string;
  effects: string[];
}

export const Items = () => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.CreatedAt);
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Desc);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [itemId, setItemId] = useState<string>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [servers, setServers] = useState<Server[]>([]);
  const { data, error, isLoading } = useSWR<{
    data: { data: Item[]; total: number };
  }>(
    `items?page=${page}&limit=${limit}&orderBy=${orderBy}&orderType=${orderType}&search=${search}&searchBy=${searchBy}`,
    api,
    {
      refreshInterval: 1,
    }
  );
  useEffect(() => {
    if (data) {
      setItems(data.data.data);
      setTotal(data.data.total);
    }
  }, [isLoading]);
  useEffect(() => {
    const getServer = async () => {
      const response = await api.get<{ data: Server[] }>("/findAll/items");
      if (response.data.data) {
        setServers(response.data.data);
      }
    };
    getServer();
  }, []);
  const {
    register: addItemRegister,
    handleSubmit: addItemHandleSubmit,
    formState: addItemFormState,
  } = useForm<AddItemFormValues>();
  const {
    register: updateItemRegister,
    handleSubmit: updateItemHandleSubmit,
    formState: updateItemFormState,
    setValue: setUpdateItemValue,
  } = useForm<UpdateItemFormValues>();
  const onHandleAddItem = async (addItemsValues: AddItemFormValues) => {
    const addResponse = await api.post("/items", addItemsValues);
    if (addResponse.status === 201) {
      toast.success("Item adicionado com sucesso!");
      setIsAddModalOpen(false);
      return;
    }
    toast.error("Erro ao adicionar item!");
    setIsAddModalOpen(false);
  };
  const onHandleDeleteItem = async (id: string) => {
    const deleteResponse = await api.delete(`/items/${id}`);
    if (deleteResponse.status === 200) {
      toast.success("Item excluído com sucesso!");
      return;
    }
    toast.error("Erro ao excluir item!");
    return;
  };
  const onHandleUpdateItem = async (updateItemValues: UpdateItemFormValues) => {
    if (!itemId) {
      toast.error("Item não encontrado!");
      return;
    }
    const updateResponse = await api.put(`/items/${itemId}`, updateItemValues);
    if (updateResponse.status === 200) {
      toast.success("Item atualizado com sucesso!");
      setIsEditModalOpen(false);
      return;
    }
    toast.error("Erro ao atualizar item!");
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
            <h1 className="font-bold uppercase text-center">Adicionar item</h1>
          </div>
          <div className="flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={addItemHandleSubmit(onHandleAddItem)}
              method="POST"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o nome do servidor"
                  {...addItemRegister("name")}
                />
                {addItemFormState.errors.name ? (
                  <span className="text-red-500">
                    {addItemFormState.errors.name.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier">Identificador</label>
                <input
                  type="number"
                  id="identifier"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o identificador do item"
                  {...addItemRegister("identifier")}
                />
                {addItemFormState.errors.identifier ? (
                  <span className="text-red-500">
                    {addItemFormState.errors.identifier.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="serverId">Servidor</label>
                <select
                  id="serverId"
                  className="border rounded-lg px-4 py-2"
                  {...addItemRegister("serverId")}
                >
                  <option value="">Selecione um servidor</option>
                  {servers.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.name}
                    </option>
                  ))}
                </select>
                {addItemFormState.errors.serverId ? (
                  <span className="text-red-500">
                    {addItemFormState.errors.serverId.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="effects">Efeitos</label>
                <input
                  type="text"
                  id="effects"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite os efeitos do item"
                  {...addItemRegister("effects")}
                />
                {addItemFormState.errors.effects ? (
                  <span className="text-red-500">
                    {addItemFormState.errors.effects.message}
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
              onSubmit={updateItemHandleSubmit(onHandleUpdateItem)}
              method="POST"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o nome do servidor"
                  {...updateItemRegister("name")}
                />
                {updateItemFormState.errors.name ? (
                  <span className="text-red-500">
                    {updateItemFormState.errors.name.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier">Identificador</label>
                <input
                  type="number"
                  id="identifier"
                  className="border rounded-lg px-4 py-2"
                  placeholder="Digite o identificador do item"
                  {...updateItemRegister("identifier")}
                />
                {updateItemFormState.errors.identifier ? (
                  <span className="text-red-500">
                    {updateItemFormState.errors.identifier.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="serverId">Servidor</label>
                <select
                  id="serverId"
                  className="border rounded-lg px-4 py-2"
                  {...updateItemRegister("serverId")}
                >
                  <option value="">Selecione um servidor</option>
                  {servers.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.name}
                    </option>
                  ))}
                </select>
                {updateItemFormState.errors.serverId ? (
                  <span className="text-red-500">
                    {updateItemFormState.errors.serverId.message}
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
          <h1 className="font-bold uppercase text-center">Itens</h1>
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
                        <th className="px-6 py-4">Identificador</th>
                        <th className="px-6 py-4">Efeitos</th>
                        <th className="px-6 py-4">Servidor</th>
                        <th className="px-6 py-4">Criado em</th>
                        <th className="px-6 py-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.data?.map((item: Item, index: number) => (
                        <tr
                          className="whitespace-nowrap px-6 py-4 "
                          key={item.id}
                        >
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {index + 1}
                          </td>
                          <td className="w-1/2 px-6 py-4 ">{item.name}</td>
                          <td className="w-1/2 px-6 py-4 ">
                            {item.identifier}
                          </td>
                          <td className="w-1/2 px-6 py-4 ">{item.effects}</td>
                          <td className="w-1/2 px-6 py-4 ">
                            {item.server.name}
                          </td>
                          <td className="w-1/2 px-6 py-4 ">
                            {new Date(item.createdAt).toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                          <td className="whitespace- px-6 py-4 gap-4 flex">
                            <button
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase"
                              onClick={() => {
                                setItemId(item.id);
                                setIsEditModalOpen(true);
                                setUpdateItemValue("name", item.name);
                                setUpdateItemValue(
                                  "identifier",
                                  item.identifier.toString()
                                );
                                setUpdateItemValue("serverId", item.serverId);
                                setUpdateItemValue("effects", item.effects);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold uppercase"
                              onClick={() => onHandleDeleteItem(item.id)}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
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
