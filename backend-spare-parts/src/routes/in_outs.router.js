import { Router } from "express";
import { InOutsController } from "../controllers/in_outs.controller.js";

export const inOutsRouter = Router();

//getAll
inOutsRouter.get('/', InOutsController.getAll);

//create
inOutsRouter.post('/', InOutsController.create);

//delete
inOutsRouter.delete('/:id', InOutsController.delete);

//update
inOutsRouter.patch('/:id', InOutsController.update);
