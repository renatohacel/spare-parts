import { User } from "../../schemas/user.schema.js";
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from "../config/config.js";

export class UserModel {
    static async getAll() {
        const users = await User.findAll({
            order: [['id', 'DESC']],
            attributes: { exclude: ['password'] }
        });

        return users;
    }

    static async getById({ id }) {
        const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
        if (!user) return false;

        return user;
    }

    static async create({ input }) {
        const {
            username,
            num_employee,
            password,
            email,
        } = input;

        const existUser = await User.findOne({ where: { username } });
        if (existUser) return { error: 'username_exists' };

        const existNumEm = await User.findOne({ where: { num_employee } });
        if (existNumEm) return { error: 'num_employee_exists' };

        if (email) {
            const existEmail = await User.findOne({ where: { email } });
            if (existEmail) return { error: 'email_exists' };
        }

        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await User.create({
            id,
            username,
            num_employee,
            password: hashedPassword,
            email,
            name: input.name,
            shift: input.shift,
            isAdmin: input.isAdmin,
        });

        return { id };
    }

    static async delete({ id }) { }

    static async update({ id, input }) {

    }

}