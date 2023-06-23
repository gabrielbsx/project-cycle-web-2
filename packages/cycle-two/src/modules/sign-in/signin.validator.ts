import { z } from "zod";
import { SignInDTO } from "./signin.dto";

export const signInValidator = (body: any): SignInDTO => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });
  return schema.parse(body);
};
