import { User } from "../schemas/user.schema.js";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

import { SALT_ROUNDS } from "../config/config.js";

export class UserModel {
    static async getAll() {
        try {
            const users = await User.findAll({
                order: [['id', 'DESC']],
                attributes: { exclude: ['password'] }
            });

            return users;
        } catch (error) {
            console.error('Error in UserModel.getAll:', error); // Log the error
            throw error;
        }
    }

    static async getById({ id }) {
        try {

            const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
            if (!user) return false;

            return user;
        } catch (error) {
            console.error('Error in UserModel.getById:', error); // Log the error
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const existUser = await User.findOne({ where: { username: input.username } });
            if (existUser) return { error: 'username_exists' };

            const existNumEm = await User.findOne({ where: { num_employee: input.num_employee } });
            if (existNumEm) return { error: 'num_employee_exists' };

            input.password = await bcrypt.hash(input.password, SALT_ROUNDS);

            const newUser = await User.create(input);

            // Remove the password from the returned user object
            const userWithoutPassword = newUser.get({ plain: true });
            delete userWithoutPassword.password;

            return userWithoutPassword;
        } catch (error) {
            console.error('Error in UserModel.create:', error); // Log the error
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const user = await User.findByPk(id)
            if (!user) return false;

            await user.destroy();

            return true
        } catch (error) {
            console.error('Error in UserModel.delete:', error); // Log the error
            throw error;
        }
    }

    static async update({ id, input }) {
        //Validar si esta registrado
        const user = await User.findByPk(id);
        if (!user) return null;

        //validar si existe el username en otro registro
        const existingUser = await User.findOne({
            where: {
                username: input.username,
                id: { [Op.ne]: id }
            }
        });
        if (existingUser) return { error: 'username_exists' };

        //validar si existe el num_employee en otro registro
        if (input.num_employee) {
            const existNumEm = await User.findOne({
                where: {
                    num_employee: input.num_employee,
                    id: { [Op.ne]: id }
                }
            });
            if (existNumEm) return { error: 'num_employee_exists' };
        }

        if (input.password) {
            const password = input.password;
            input.password = await bcrypt.hash(password, SALT_ROUNDS);
        }

        const updatedUser = await user.update(input);

        // Remove the password from the returned user object
        const userWithoutPassword = updatedUser.get({ plain: true });
        delete userWithoutPassword.password;

        return userWithoutPassword;
    }

}