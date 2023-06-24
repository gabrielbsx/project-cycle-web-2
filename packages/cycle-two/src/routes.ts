import { Express } from "express";
import { createUserController } from "./modules/create-user/create-user.controller";
import { signInController } from "./modules/sign-in/signin.controller";
import { guestUser } from "./middlewares/guest-user";

export const routesFactory = (app: Express) => {
  app.post("/users", guestUser, createUserController);
  app.post("/auth", guestUser, signInController);
};
