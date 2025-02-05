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

    static async create(req, res) {
        try {
            const result = await InOutsModel.create({ input: req.body })

            if (result === null) {
                return res.status(409).send({
                    message: 'The employee number does not match the employee'
                })
            }

            return res.status(201).send({ result })
        } catch (error) {
            console.error('Error adding inOut:', error);
            return res.status(500).send({ message: 'Error adding inOut' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await InOutsModel.delete({ id });
            if (!result) {
                return res.status(404).json({ message: 'In/Out not found' })
            }
            return res.send({ message: 'In/Out deleted successfully' })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        const { id } = req.params
        try {
            const result = await InOutsModel.update({ id, input: req.body })
            if (result === null) {
                return res.status(409).send({
                    message: 'The employee number does not match the employee'
                })
            }

            if (!result) {
                return res.status(404).send({ message: 'In/Out not found' })
            }

            return res.status(201).send({ result })

        } catch (error) {

        }
    }
}