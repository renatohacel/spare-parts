import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller.js';

export const inventoryRouter = Router();

//getAll
inventoryRouter.get('/', InventoryController.getAll);