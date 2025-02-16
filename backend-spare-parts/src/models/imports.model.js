import { Imports } from "../schemas/imports.schema.js";
import { Inventory } from "../schemas/inventory.schema.js";

export class ImportsModel {
    static async getByName(part_num) {
        try {
            const imports = await Imports.findAll({
                where: { part_num },
                order: [['id', 'DESC']]
            });
            return imports
        } catch (error) {
            console.error('Error in ImportsModel.getByName:', error); // Log the error
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
            const { qty, part_num } = input
            const impt = await Imports.create({
                qty,
                part_num,
                date: formattedDate,
            })

            await Inventory.increment('qty_import_total', {
                by: input.qty,
                where: { part_num: input.part_num },
            });

            return impt;
        } catch (error) {
            console.error('Error in ImportsModel.create:', error); // Log the error
            throw error;
        }

    }

    static async update({ id, input }) {
        try {
            const { part_num, qty } = input
            const imp = await Imports.findByPk(id);
            if (!imp) return null

            const difference = qty - imp.qty;
            if (difference !== 0) {
                const method = difference > 0 ? 'increment' : 'decrement';

                await Inventory[method]('qty_import_total', {
                    by: Math.abs(difference),
                    where: { part_num },
                });
            }

            const updatedImp = await imp.update(input);

            return updatedImp;
        } catch (error) {
            console.log('Error in ImportsModel.update:', error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const impt = await Imports.findByPk(id)
            if (!impt) return false

            await Inventory.decrement('qty_import_total', {
                by: impt.qty,
                where: { part_num: impt.part_num }
            })

            await impt.destroy();

            return true
        } catch (error) {
            console.log('Error in ImportModel.delete:', error);
            throw error;
        }
    }
}