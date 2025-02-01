import { Router } from "express";
import { ImportsController } from "../controllers/imports.controller.js";

export const importsRouter = Router();

//getByName
importsRouter.get('/:part_num', ImportsController.getByName);

//create
importsRouter.post('/', ImportsController.create);

//delete
importsRouter.delete('/:id', ImportsController.delete);

//update
importsRouter.patch('/:id', ImportsController.update);
