import { UserContext } from "../../context/user-context";
import { api } from "../../services/api.service";
import { Card } from "../card";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { User } from "../../schema/user";

interface SignInData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();
  const { setUser } = useContext(UserContext);
  const onSubmit = async (signInData: SignInData) => {
    const response = await api.post("/auth", signInData);
    if (response.status === 200) {
      toast.success("Login efetuado com sucesso!");
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user as User);
      window.location.href = "/";
    }
  };
  return (
    <Card
      card={{
        className: "w-full",
      }}
      header={<h1 className="font-bold uppercase text-center">Login</h1>}
      main={
        <div>
          <form className="gap-4 flex flex-col">
            <div className="flex flex-col gap-1">
              <label>
                <span className="text-sm text-neutral-600 dark:text-neutral-100">
                  E-mail
                </span>
              </label>
              <input
                type="email"
                className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800 active:border-none"
                placeholder="Digite seu e-mail"
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  O e-mail deve ser válido
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>
                <span className="text-sm text-neutral-600 dark:text-neutral-100">
                  Senha
                </span>
              </label>
              <input
                type="password"
                className="border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white dark:border-neutral-800"
                placeholder="Digite sua senha"
                {...register("password", {
                  required: true,
                  minLength: 4,
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  A senha deve ter no mínimo 4 caracteres
                </span>
              )}
            </div>
          </form>
        </div>
      }
      footer={
        <button
          type="submit"
          className="rounded px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Entrar
        </button>
      }
    />
  );
};
