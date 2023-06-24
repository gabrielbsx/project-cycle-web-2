import { useEffect, useState } from "react";
import { DashboardBase } from "../components/dashboard";
import { apiService } from "../services/api.service";
import {
  OperatorEnum,
  OrderByEnum,
  OrderTypeEnum,
  Pagination,
} from "../schema/abstract-crud";

export const Items = () => {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.CreatedAt);
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.Desc);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const handlePaginationItems = async () => {
      const pagination: Pagination = {
        take,
        skip,
        orderBy,
        orderType,
        search,
        searchBy,
      };
      const response = await apiService.handleAbstractCRUD({
        entity: "item",
        operator: OperatorEnum.ReadAll,
        pagination,
      });
      console.log(response);
    };
    handlePaginationItems();
  }, []);
  return (
    <DashboardBase>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold uppercase text-center">Itens</h1>
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
