import { z } from "zod";
import { CreateUserDTO } from "./create-user.dto";

export const createUserValidator = (body: any): CreateUserDTO => {
  const schema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4),
  });
  return schema.parse(body);
};
