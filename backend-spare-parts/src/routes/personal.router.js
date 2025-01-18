import { Router } from "express";
import { PersonalController } from "../controllers/personal.controller.js";

export const personalRouter = Router();

//getAll
personalRouter.get('/', PersonalController.getAll);

// //getOnce
personalRouter.get('/:id', PersonalController.getById);

//create
personalRouter.post('/', PersonalController.create);

//delete
personalRouter.delete('/:id', PersonalController.delete);

//update
personalRouter.put('/:id', PersonalController.update);