import { Express } from "express";
import { createUserController } from "./modules/create-user/create-user.controller";
import { signInController } from "./modules/sign-in/signin.controller";
import { guestUser } from "./middlewares/guest-user";
import { authUser } from "./middlewares/auth-user";
import { abstractCRUDController } from "./modules/abstract-crud/abstract-crud.controller";

export const routesFactory = (app: Express) => {
  app.post("/users", guestUser, createUserController);
  app.post("/auth", guestUser, signInController);
  app.post("/abstract-crud/:entity", authUser, abstractCRUDController);
  app.get("/abstract-crud/:entity", authUser, abstractCRUDController);
  app.get("/abstract-crud/:entity/:id", authUser, abstractCRUDController);
  app.delete("/abstract-crud/:entity", authUser, abstractCRUDController);
  app.put("/abstract-crud/:entity", authUser, abstractCRUDController);
};
