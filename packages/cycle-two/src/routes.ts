import { Express } from "express";
import { createUserController } from "./modules/create-user/create-user.controller";
import { signInController } from "./modules/sign-in/signin.controller";

export const routesFactory = (app: Express) => {
  app.post("/users", createUserController);
  app.post("/auth", signInController);
};
