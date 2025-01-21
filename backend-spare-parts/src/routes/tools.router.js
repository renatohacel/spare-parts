import { Router } from "express";
import { ToolsController } from "../controllers/tools.controller.js";

export const toolsRouter = Router();

//getAll
toolsRouter.get('/', ToolsController.getAll);

//create
toolsRouter.post('/', ToolsController.create);

//delete
toolsRouter.delete('/:id', ToolsController.delete);

//update
toolsRouter.put('/:id', ToolsController.update);