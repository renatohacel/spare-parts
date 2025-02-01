import { Router } from "express";
import { ExportsController } from "../controllers/exports.controller.js";

export const exportsRouter = Router();

//getByName
exportsRouter.get('/:part_num', ExportsController.getByName);

//create
exportsRouter.post('/', ExportsController.create);

//delete
exportsRouter.delete('/:id', ExportsController.delete);

//update
exportsRouter.patch('/:id', ExportsController.update);
