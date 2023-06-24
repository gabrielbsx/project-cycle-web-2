import { db } from "../../data/prisma.repository";
import { tokenizer } from "../../services/tokenizer/jwt";
import { left, right } from "../../utils/either";
import { badRequest } from "../../utils/http";
import { not } from "../../utils/operators";
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
    return left(badRequest("User is not found"));
  }
  const isPasswordHashedEqualPasswordDTO = await bcrypt.compare(
    password,
    user.password
  );
  if (not(isPasswordHashedEqualPasswordDTO)) {
    return left(badRequest("Password is not match!"));
  }
  const userWithoutPassword = Object.assign(user, { password: undefined });
  const token = await tokenizer.sign(
    userWithoutPassword,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const data = {
    user: userWithoutPassword,
    token,
  };
  return right(data);
};
