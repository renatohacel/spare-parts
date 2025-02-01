import { ExportsModel } from "../models/exports.model.js";


export class ExportsController {
    static async getByName(req, res) {
        try {
            const { part_num } = req.params
            const exports = await ExportsModel.getByName(part_num);
            res.status(201).send(exports);
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        try {
            const result = await ExportsModel.create({ input: req.body })
            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error adding export:', error);
            return res.status(500).send({ message: 'Error adding export' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            const result = await ExportsModel.delete({ id })
            if (!result) {
                return res.status(404).json({ message: 'Export not found' })
            }
            return res.send({ message: 'Export deleted successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        const { id } = req.params
        try {
            const result = await ExportsModel.update({
                id,
                input: req.body
            })
            if (result === null) return res.status(404).send({ message: 'Export Not Found' })

            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error update export:', error);
            return res.status(500).send({ message: 'Error update export' });
        }
    }
}