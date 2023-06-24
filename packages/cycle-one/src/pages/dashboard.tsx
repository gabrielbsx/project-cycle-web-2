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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  };
  useEffect(() => {
    const handlePaginationDashboard = async () => {
      const pagination: Pagination = {
        take,
        skip,
        orderBy,
        orderType,
        search,
        searchBy,
      };
      const response = await apiService.handleAbstractCRUD({
        entity: "server",
        operator: OperatorEnum.ReadAll,
        pagination,
      });
      console.log(response);
    };
    handlePaginationDashboard();
  }, []);
  return (
    <DashboardBase>
      <div className="flex flex-col gap-4 w-full">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          <table className="table-auto w-full bg-white dark:bg-neutral-800 border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{""}</td>
                <td className="border px-4 py-2">{""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardBase>
  );
};
