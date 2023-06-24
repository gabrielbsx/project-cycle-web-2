import { db } from "../../data/prisma.repository";
import { cryptography } from "../../services/cryptography/bcrypt";
import { left, right } from "../../utils/either";
import { badRequest } from "../../utils/http";
import { CreateUserDTO } from "./create-user.dto";

export const createUserUseCase = async (createUserDTO: CreateUserDTO) => {
  const { name, email, password } = createUserDTO;
  const passwordHashed = await cryptography.hash(password);
  const isUserCreated = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (isUserCreated) {
    return left(badRequest("User already exists"));
  }
  await db.user.create({
    data: {
      name,
      email,
      password: passwordHashed,
    },
  });
  return right(true);
};
