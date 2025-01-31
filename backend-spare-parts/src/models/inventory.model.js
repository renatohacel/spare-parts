import { Inventory } from "../schemas/inventory.schema.js";
import { Op } from 'sequelize'
import fs from 'node:fs'
import path from 'node:path'

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
            console.log('Error in InventoryModel.create:', error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const material = await Inventory.findByPk(id)
            if (!material) return false;

            const image = material.image

            fs.unlink(path.join('uploads', image), (err) => {
                if (err) {
                    console.error('Error deleting the file:', err);
                }
            })

            await material.destroy();
            return true
        } catch (error) {
            console.log('Error in InventoryModel.delete:', error);
            throw error;
        }
    }

    static async update({ id, input }) {
        try {
            const material = await Inventory.findByPk(id);
            if (!material) return null;

            const { image } = input

            if (image === null) {
                if (material.image !== null) {
                    delete input.image
                }
            }

            const existIdFeature = await Inventory.findOne({ where: { id_feature: input.id_feature, id: { [Op.ne]: id } } })
            if (existIdFeature) return { error: 'id_feature_exists' }

            const existName = await Inventory.findOne({ where: { name: input.name, id: { [Op.ne]: id } } })
            if (existName) return { error: 'name_exists' }

            const existPN = await Inventory.findOne({ where: { part_num: input.part_num, id: { [Op.ne]: id } } })
            if (existPN) return { error: 'part_num_exists' }

            if (input.suplier_part_num) {
                const existSPN = await Inventory.findOne({ where: { suplier_part_num: input.suplier_part_num, id: { [Op.ne]: id } } })
                if (existSPN) return { error: 'suplier_part_num_exists' }
            }

            const updatedMaterial = await material.update(input)
            return updatedMaterial;
        } catch (error) {
            console.log('Error in InventoryModel.update:', error);
            throw error;
        }
    }

    static async check_dashboard({ id }) {
        try {
            const material = await Inventory.findByPk(id);
            if (!material) return null;

            const materialDash = await material.update({ is_dashboard: 1 });
            return materialDash;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}