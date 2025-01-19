
import { Personal } from "../schemas/personal.schema.js";
import { Op } from "sequelize";

export class PersonalModel {
    static async getAll() {
        try {
            const personal = await Personal.findAll({
                order: [['id', 'DESC']]
            });
            return personal;
        } catch (error) {
            console.error('Error in PersonalModel.getAll:', error); // Log the error
            throw error;
        }
    }

    static async getById({ id }) {
        try {
            const employee = await Personal.findOne({ where: { id } });
            if (!employee) return false;

            return employee;
        } catch (error) {
            console.error('Error in PersonalModel.getById:', error); // Log the error
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const {
                name,
                role,
                num_employee,
                shift,
                area,
                manager,
            } = input;

            // Solo verificar duplicados si num_employee tiene un valor
            if (num_employee !== null) {
                const existNumEm = await Personal.findOne({ where: { num_employee } });
                if (existNumEm) return false;
            }

            const employee = await Personal.create({
                name,
                role,
                num_employee,
                shift,
                area,
                manager,
            });

            return employee;
        } catch (error) {
            console.error('Error in PersonalModel.create:', error); // Log the error
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const employee = await Personal.findByPk(id)
            if (!employee) return false;

            await employee.destroy();

            return true
        } catch (error) {
            console.error('Error in PersonalModel.delete:', error); // Log the error
            throw error;
        }
    }

    static async update({ id, input }) {
        try {
            const employee = await Personal.findByPk(id);
            if (!employee) return null;

            // Verificar si se está intentando actualizar num_employee
            if (input.num_employee) {
                const existingEmployee = await Personal.findOne({
                    where: {
                        num_employee: input.num_employee,
                        id: { [Op.ne]: id } // excluir al empleado actual
                    }
                });

                // Si el número existe para un empleado diferente, retornar false
                if (existingEmployee) return false;
            }

            const updatedEmployee = await employee.update(input);

            return updatedEmployee;
        } catch (error) {
            console.error('Error in PersonalModel.update:', error); // Log the error
            throw error;
        }
    }

}