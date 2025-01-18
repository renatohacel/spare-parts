import { PersonalModel } from "../models/personal.model.js";
import { validatePartialPersonal, validatePersonal } from "../validate_schemas/personalValidate.schema.js";


export class PersonalController {

    static async getAll(req, res) {
        const personal = await PersonalModel.getAll();
        return res.status(200).send(personal);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const employee = await PersonalModel.getById({ id });
        if (employee) return res.status(200).send(employee);

        return res.status(404).send({ message: 'Empleado no encontrado' });
    }

    static async create(req, res) {
        // Validar los datos
        const input = validatePartialPersonal(req.body);

        if (input.error) {
            return res.status(400).json({ error: JSON.parse(input.error.message) });
        }

        try {
            const result = await PersonalModel.create({ input: req.body });

            if (!result) {
                return res.status(409).send({ message: 'El número de empleado ya está registrado' });
            }
            return res.status(201).send({ result });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await PersonalModel.delete({ id });
            if (!result) {
                return res.status(404).json({ message: 'No se encontro el empleado' });
            }
            return res.json({ message: 'Empleado eliminado correctamente' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' })
        }

    }

    static async update(req, res) {
        const { id } = req.params;
        // Validar los datos del usuario
        const input = validatePartialPersonal(req.body);

        if (input.error) return res.status(400).json({ error: JSON.parse(input.error.message) });

        try {
            const result = await PersonalModel.update({ id: id, input: req.body });

            //si no existe
            if (result === null) return res.status(404).json({ message: 'No se encontro el empleado' });

            //si hay otro empleado con el num_employee
            if (!result) return res.status(409).send({ message: 'El número de empleado ya está registrado' });

            return res.status(201).send({ result });

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' })
        }

    }

}