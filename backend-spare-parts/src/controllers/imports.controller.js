import { ImportsModel } from "../models/imports.model.js"


export class ImportsController {
    static async getByName(req, res) {
        try {
            const { part_num } = req.params
            const imports = await ImportsModel.getByName(part_num);
            res.status(201).send(imports);
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        try {
            const result = await ImportsModel.create({ input: req.body })
            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error adding import:', error);
            return res.status(500).send({ message: 'Error adding import' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            const result = await ImportsModel.delete({ id })
            if (!result) {
                return res.status(404).json({ message: 'Import not found' })
            }
            return res.send({ message: 'Import deleted successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        const { id } = req.params
        try {
            const result = await ImportsModel.update({
                id,
                input: req.body
            })
            if (result === null) return res.status(404).send({ message: 'Import Not Found' })

            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error update import:', error);
            return res.status(500).send({ message: 'Error update import' });
        }
    }
}