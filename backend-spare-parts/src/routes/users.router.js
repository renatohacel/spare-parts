import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const usersRouter = Router();

//getAll
usersRouter.get('/', UserController.getAll);

//getOnce
usersRouter.get('/:id', UserController.getById);

//create
usersRouter.post('/', UserController.create);

//delete
usersRouter.delete('/:id', UserController.delete);

//update
usersRouter.patch('/:id', UserController.update);