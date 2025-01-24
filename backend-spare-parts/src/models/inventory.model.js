import { Inventory } from "../schemas/inventory.schema.js";
import { Op } from 'sequelize'

export class InventoryModel {
    static async getAll() {
        try {
            const inventory = await Inventory.findAll({
                order: [['id', 'DESC']]
            });
            return inventory
        } catch (error) {
            console.error('Error in InventoryModel.getAll:', error); // Log the error
            throw error;
        }
    }
}