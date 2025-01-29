import { Router } from 'express';
import { InventoryController, upload } from '../controllers/inventory.controller.js';

export const inventoryRouter = Router();

//getAll
inventoryRouter.get('/', InventoryController.getAll);

//create
inventoryRouter.post('/', upload.single('image'), InventoryController.create);

//delete
inventoryRouter.delete('/:id', InventoryController.delete)