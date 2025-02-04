import { InOuts } from "../schemas/in_outs.schema.js";

export class InOutsModel {
    static async getAll() {
        try {
            const inOuts = await InOuts.findAll({
                order: [['id', 'DESC']]
            });
            return inOuts;
        } catch (error) {
            console.log('Error in InOutsModel.getALl:', error)
            throw error
        }
    }
}