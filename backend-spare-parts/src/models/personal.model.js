
import { Personal } from "../../schemas/personal.schema.js";
import { Op } from "sequelize";

export class PersonalModel {
    static async getAll() {
        const personal = await Personal.findAll({
            order: [['id', 'DESC']]
        });
        return personal;
    }

    static async getById({ id }) {
        const employee = await Personal.findOne({ where: { id } });
        if (!employee) return false;

        return employee;
    }

    static async create({ input }) {
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
    }

    static async delete({ id }) {
        const employee = await Personal.findByPk(id)
        if (!employee) return false;

        await employee.destroy();

        return true
    }

    static async update({ id, input }) {
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
    }

}