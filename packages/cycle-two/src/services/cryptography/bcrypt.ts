import { Cryptography } from "../../ports/cryptography";
import bcrypt from "bcrypt";

export const cryptography: Cryptography = {
  hash: async (value: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  },
  compare: async (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
  },
};
