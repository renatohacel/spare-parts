import { InventoryModel } from "../models/inventory.model.js";

export class InventoryController {
    static async getAll(req, res) {
        const inventory = await InventoryModel.getAll();
        return res.status(200).send(inventory)
    }
}