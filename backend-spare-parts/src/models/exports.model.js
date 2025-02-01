
import { Exports } from "../schemas/exports.schema.js";
import { Inventory } from "../schemas/inventory.schema.js";

export class ExportsModel {
    static async getByName(part_num) {
        try {
            const exports = await Exports.findAll({
                where: { part_num },
                order: [['id', 'DESC']]
            });
            return exports
        } catch (error) {
            console.error('Error in ExportsModel.getByName:', error); // Log the error
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
            const { qty, part_num, receiver_location } = input
            const exp = await Exports.create({
                qty,
                part_num,
                receiver_location,
                date: formattedDate,
            })

            await Inventory.increment('qty_export_total', {
                by: input.qty,
                where: { part_num: input.part_num },
            });

            return exp;
        } catch (error) {
            console.error('Error in ExportsModel.create:', error); // Log the error
            throw error;
        }

    }

    static async update({ id, input }) {
        try {
            const { part_num, qty } = input
            const exp = await Exports.findByPk(id);
            if (!exp) return null

            const difference = qty - exp.qty;
            if (difference !== 0) {
                const method = difference > 0 ? 'increment' : 'decrement';

                await Inventory[method]('qty_export_total', {
                    by: Math.abs(difference),
                    where: { part_num },
                });
            }

            const updatedExp = await exp.update(input);

            return updatedExp;
        } catch (error) {
            console.log('Error in ExportsModel.update:', error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const exp = await Exports.findByPk(id)
            if (!exp) return false

            await Inventory.decrement('qty_export_total', {
                by: exp.qty,
                where: { part_num: exp.part_num }
            })

            await exp.destroy();

            return true
        } catch (error) {
            console.log('Error in ExportsModel.delete:', error);
            throw error;
        }
    }
}