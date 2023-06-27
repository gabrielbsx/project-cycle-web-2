import { Express } from "express";
import { createUserController } from "./modules/create-user/create-user.controller";
import { signInController } from "./modules/sign-in/signin.controller";
import { guestUser } from "./middlewares/guest-user";
import { authUser } from "./middlewares/auth-user";
// import { abstractCRUDController } from "./modules/abstract-crud/abstract-crud.controller";
// import { createUserUseCase } from "./modules/create-user/create-user.usecase";
import { createServerUseCase } from "./modules/servers/create.usecase";
import { paginateServerUseCase } from "./modules/servers/paginate.usecase";
import { deleteServerUseCase } from "./modules/servers/delete.usecase";
import { updateServerUseCase } from "./modules/servers/update.usecase";
import { paginateItemUseCase } from "./modules/items/paginate.usecase";
import { deleteItemUseCase } from "./modules/items/delete.usecase";
import { updateItemUseCase } from "./modules/items/update.usecase";
import { createItemUseCase } from "./modules/items/create.usecase";
import { findAllServerUseCase } from "./modules/servers/find-all.usecase";
import { updateUserUseCase } from "./modules/users/update-user.usecase";

export const routesFactory = (app: Express) => {
  app.post("/users", guestUser, createUserController);
  app.post("/auth", guestUser, signInController);
  app.put("/users", authUser, updateUserUseCase);

  app.post('/servers', authUser, createServerUseCase);
  app.get('/servers', paginateServerUseCase);
  app.delete("/servers/:id", authUser, deleteServerUseCase);
  app.put("/servers/:id", authUser, updateServerUseCase);

  app.post('/items', authUser, createItemUseCase);
  app.get('/items', paginateItemUseCase);
  app.get('/findAll/items', findAllServerUseCase);
  app.delete("/items/:id", authUser, deleteItemUseCase);
  app.put("/items/:id", authUser, updateItemUseCase);

  // app.post("/abstract-crud/:entity", authUser, abstractCRUDController);
  // app.get("/abstract-crud/:entity", authUser, abstractCRUDController);
  // app.get("/abstract-crud/:entity/:id", authUser, abstractCRUDController);
  // app.delete("/abstract-crud/:entity", authUser, abstractCRUDController);
  // app.put("/abstract-crud/:entity", authUser, abstractCRUDController);
};
