import { Tokenizer } from "../../ports/tokenizer";
import jwt from "jsonwebtoken";

export const tokenizer: Tokenizer = {
  sign: async (payload, secretKey, options) =>
    jwt.sign(payload, secretKey, options),
  verify: async (token, secretKey) => jwt.verify(token, secretKey),
};
