import { User } from "./user";

export interface Server {
  id: string;
  name: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
