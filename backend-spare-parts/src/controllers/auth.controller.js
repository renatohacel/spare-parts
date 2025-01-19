import { AuthModel } from "../models/auth.model.js";
import { validateAuth } from "../validate_schemas/authValidate.schema.js";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config/config.js";


export class AuthController {

    static async login(req, res) {
        // Validaciones
        const result = validateAuth(req.body);
        if (result.error) {
            return res.status(400).json(JSON.parse(result.error.message));
        }

        const { username, password } = req.body;

        try {
            const user = await AuthModel.login({ username, password });


            if (user === null) return res.status(401).send({ message: 'El usuario no esta registrado' });
            if (!user) return res.status(401).send({ message: 'Contraseña incorrecta' });

            const token = jwt.sign(
                {
                    user: {
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        num_employee: user.num_employee,
                        email: user.email,
                        shift: user.shift,
                        isAdmin: user.isAdmin,
                    }
                },
                SECRET_JWT_KEY,
                { expiresIn: '8h' }
            );

            res
                .cookie('acces-token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 * 8,
                })
                .send({ user, token });

        } catch (e) {
            res.status(401).send(e.message);
        }
    }

    static async logout(req, res) {
        res.clearCookie('access_token').json({ message: 'Cerrado sesión con exito' })
    }
}