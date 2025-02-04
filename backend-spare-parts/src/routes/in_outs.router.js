import { Router } from "express";
import { InOutsController } from "../controllers/in_outs.controller.js";

export const inOutsRouter = Router();


//getAll
inOutsRouter.get('/', InOutsController.getAll);

// //create
// outToolsRouter.post('/', InOutsController.create);

// //delete
// outToolsRouter.delete('/:id', InOutsController.delete);

// //update
// outToolsRouter.patch('/:id', InOutsController.update);

// //check
// outToolsRouter.patch('/check-return/:id', InOutsController.check_return);

