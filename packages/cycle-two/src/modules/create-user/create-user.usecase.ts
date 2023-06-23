import { db } from "../../data/prisma.repository";
import { CreateUserDTO } from "./create-user.dto";
import bcrypt from "bcrypt";

export const createUserUseCase = async (createUserDTO: CreateUserDTO) => {
  const { email, password } = createUserDTO;
  const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());
  const isUserCreated = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (isUserCreated) {
    return [new Error("User already exists"), null];
  }
  await db.user.create({
    data: {
      email,
      password: passwordHashed,
    },
  });
  return [null, true];
};
