import { useForm } from "react-hook-form";
import { DashboardBase } from "../components/dashboard";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { api } from "../services/api.service";
import { toast } from "react-toastify";

interface UpdateProfile {
  name: string;
  password: string;
}

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfile>({
    defaultValues: {
      name: user?.name ?? "",
    },
  });
  const onHandleUpdateProfile = async (data: UpdateProfile) => {
    const response = await api.put("/users", data);
    if (response.status === 200) {
      setUser(response.data);
      toast.success("Perfil atualizado com sucesso!");
      return;
    }
    toast.error("Erro ao atualizar perfil!");
  };
  return (
    <DashboardBase>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col justify-center items-center gap-4 border border-neutral-300 rounded-lg p-5"
            onSubmit={handleSubmit(onHandleUpdateProfile)}
          >
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                className="border rounded-md px-4 py-2"
                {...register("name", {
                  minLength: 4,
                })}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="password">Nova Senha</label>
              <input
                type="password"
                id="password"
                className="border rounded-md px-4 py-2"
                {...register("password", {
                  minLength: 4,
                })}
              />
              {errors.password && (
                <span className="text-red-500">Campo obrigatório</span>
              )}
            </div>
            <button
              type="submit"
              className="border rounded-md px-4 py-2 bg-neutral-100 hover:bg-neutral-200"
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </DashboardBase>
  );
};
