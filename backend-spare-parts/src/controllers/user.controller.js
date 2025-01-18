import { UserModel } from "../models/user.model.js";
import { validateUser } from "../validate_schemas/userValida.schema.js";


export class UserController {

    static async getAll(req, res) {
        const users = await UserModel.getAll();
        return res.status(200).send(users);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const user = await UserModel.getById({ id });
        if (user) return res.status(200).send(user);

        return res.status(404).send({ message: 'Usuario no encontrado' });

    }

    static async create(req, res) {
        // Validar los datos del usuario
        const result = validateUser(req.body);

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        try {
            const response = await UserModel.create({ input: req.body });

            if (response.error) {
                let errorMessage;

                switch (response.error) {
                    case 'username_exists':
                        errorMessage = 'El nombre de usuario ya está en uso.';
                        break;
                    case 'num_employee_exists':
                        errorMessage = 'El número de empleado ya está en uso.';
                        break;
                    case 'email_exists':
                        errorMessage = 'El correo electrónico ya está en uso.';
                        break;
                    default:
                        errorMessage = 'Error desconocido.';
                }

                return res.status(409).json({ error: errorMessage });
            }

            return res.status(201).json({ id: response.id });

        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    static async delete(req, res) { }

    static async update(req, res) {

        // Validar los datos del usuario
        const result = validateUser(req.body);

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
    }

}