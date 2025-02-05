import { OutToolsModel } from "../models/outTools.model.js";
import { validateOutTools, validatePartialOutTools } from "../validate_schemas/outToolsValidate.schema.js";

export class OutToolsController {
    static async getAll(req, res) {
        const outTools = await OutToolsModel.getAll();
        return res.status(200).send(outTools);
    }

    static async create(req, res) {
        // Validar Datos
        const input = validateOutTools(req.body);

        if (input.error) {
            return res.status(400).json({ error: input.error.message });
        }

        try {
            console.log('Creating out tool with input:', req.body);
            const result = await OutToolsModel.create({ input: req.body });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'receiver_no_exists':
                        errorMessage = 'receiver_no_exists';
                        break;
                    case 'tool_no_exists':
                        errorMessage = 'tool_no_exists';
                        break;
                    default:
                        errorMessage = 'Error desconocido.';
                }

                return res.status(409).send({ error: errorMessage });
            }

            return res.status(201).send({ result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        const tool = req.headers['tool-name'];
        try {
            console.log('Deleting out tool with id:', id, 'and tool:', tool);
            const result = await OutToolsModel.delete({ id, tool });
            if (!result) {
                return res.status(404).json({ message: 'No se encontró la herramienta' });
            }
            return res.json({ message: 'Herramienta eliminada correctamente' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        // Validar datos
        const input = validatePartialOutTools(req.body);

        if (input.error) return res.status(400).json({ error: JSON.parse(input.error.message) });

        try {
            
            const result = await OutToolsModel.update({ id, input: req.body });

            if (result === null) return res.status(404).json({ message: 'No se encontro el préstamo de herramienta' });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'receiver_no_exists':
                        errorMessage = 'receiver_no_exists';
                        break;
                    case 'tool_no_exists':
                        errorMessage = 'tool_no_exists';
                        break;
                    default:
                        errorMessage = 'Error desconocido.';
                }

                return res.status(409).send({ error: errorMessage });
            }

            return res.status(201).send({ result });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async check_return(req, res) {
        const { id } = req.params;
        // Validar datos
        const input = validatePartialOutTools(req.body);

        if (input.error) return res.status(400).json({ error: JSON.parse(input.error.message) });

        try {
            const result = await OutToolsModel.check_return({ id, input: req.body });

            if (result === null) return res.status(404).json({ message: 'No se encontro el préstamo de herramienta' });

            return res.status(201).send({ result });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }
}

