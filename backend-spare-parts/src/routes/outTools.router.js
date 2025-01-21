import { Router } from "express";
import { OutToolsController } from "../controllers/outTools.controller.js";

export const outToolsRouter = Router();


//getAll
outToolsRouter.get('/', OutToolsController.getAll);

//create
outToolsRouter.post('/', OutToolsController.create);

//delete
outToolsRouter.delete('/:id', OutToolsController.delete);

//update
outToolsRouter.patch('/:id', OutToolsController.update);

//check
outToolsRouter.patch('/check-return/:id', OutToolsController.check_return);

