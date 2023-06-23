import { db } from "../../data/prisma.repository";
import { SignInDTO } from "./signin.dto";
import bcrypt from "bcrypt";

export const signInUseCase = async (signInDTO: SignInDTO) => {
  const { email, password } = signInDTO;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return [new Error("User is not found"), null];
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return [new Error("Password is not match!"), null];
  }
  return [null, Object.assign(user, { password: undefined })];
};
