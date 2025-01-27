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

    static async create({ input }) {
        try {
            const existIdFeature = await Inventory.findOne({ where: { id_feature: input.id_feature } })
            if (existIdFeature) return { error: 'id_feature_exists' }

            const existName = await Inventory.findOne({ where: { name: input.name } })
            if (existName) return { error: 'name_exists' }

            const existPN = await Inventory.findOne({ where: { part_num: input.part_num } })
            if (existPN) return { error: 'part_num_exists' }

            if (input.suplier_part_num) {
                const existSPN = await Inventory.findOne({ where: { suplier_part_num: input.suplier_part_num } })
                if (existSPN) return { error: 'suplier_part_num_exists' }
            }

            const newMaterial = await Inventory.create(input)

            return newMaterial

            //CREAR IMPORTACION

        } catch (error) {

        }
    }
}