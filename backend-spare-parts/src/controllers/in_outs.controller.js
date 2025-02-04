import { InOutsModel } from "../models/in_outs.model.js";

export class InOutsController {
    static async getAll(req, res) {
        try {
            const inOuts = await InOutsModel.getAll();
            return res.status(200).send(inOuts);
        } catch (error) {
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }
}