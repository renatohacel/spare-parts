import { ToolsModel } from "../models/tools.model.js";
import { validatePartialTools, validateTools } from "../validate_schemas/toolsValidate.shcema.js";

export class ToolsController {
    static async getAll(req, res) {
        const tools = await ToolsModel.getAll();
        return res.status(200).send(tools)
    }

    static async create(req, res) {
        // Validar Datos
        const input = validateTools(req.body);

        if (!input.success) {
            return res.status(400).json({ error: input.error.message });
        }

        try {
            const result = await ToolsModel.create({ input: req.body });
            return res.status(201).send({ result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            const result = await ToolsModel.delete({ id });
            if (!result) {
                return res.status(404).json({ message: 'No se encontro la herramienta' });
            }
            return res.json({ message: 'Herramienta eliminada correctamente' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        const { id } = req.params
        //Validar datos
        const input = validatePartialTools(req.body);

        if (input.error) return res.status(400).json({ error: JSON.parse(input.error.message) });

        try {
            const result = await ToolsModel.update({ id, input: req.body });

            if (result === null) return res.status(404).json({ message: 'No se encontro la herramienta' });

            return res.status(201).send({ result });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' })
        }
    }

}

