import { InOuts } from "../schemas/in_outs.schema.js";
import { Inventory } from "../schemas/inventory.schema.js";
import { Personal } from "../schemas/personal.schema.js";

export class InOutsModel {
    static async getAll() {
        try {
            const inOuts = await InOuts.findAll({
                order: [['id', 'DESC']]
            });
            return inOuts;
        } catch (error) {
            console.log('Error in InOutsModel.getALl:', error)
            throw error
        }
    }

    static async create({ input }) {
        try {

            delete input.id;

            const { status, material, qty_material, receiver, num_employee_receiver } = input

            const findReceiver = await Personal.findOne({ where: { name: receiver } })

            if (findReceiver.num_employee !== null) {
                if (num_employee_receiver !== findReceiver.num_employee) {
                    return null;
                }
            }

            const inOut = await InOuts.create(input);

            if (status === 'Ingreso') {
                await Inventory.increment('qty', {
                    by: qty_material,
                    where: { name: material }
                })
            } else if (status === 'Salida') {
                await Inventory.decrement('qty', {
                    by: qty_material,
                    where: { name: material }
                })
            }

            return inOut;

        } catch (error) {
            console.log('Error in InOutsModel.create:', error)
            throw error
        }
    }

    static async update({ id, input }) {
        try {
            const {
                status,
                material,
                qty_material,
                receiver,
                num_employee_receiver,
            } = input;

            // 1) Obtenemos el registro anterior
            const inOut = await InOuts.findByPk(id);
            if (!inOut) return false;

            // 2) Validar la persona receptora
            const findReceiver = await Personal.findOne({ where: { name: receiver } });
            if (findReceiver && findReceiver.num_employee !== null) {
                if (num_employee_receiver !== findReceiver.num_employee) {
                    return null;
                }
            }

            // 3) REVERTIMOS el valor anterior
            if (inOut.status === "Ingreso") {
                // Si el registro anterior era "Ingreso", restamos la cantidad al material antiguo
                await Inventory.decrement("qty", {
                    by: inOut.qty_material,
                    where: { name: inOut.material },
                });
            } else if (inOut.status === "Salida") {
                // Si el registro anterior era "Salida", sumamos la cantidad al material antiguo
                await Inventory.increment("qty", {
                    by: inOut.qty_material,
                    where: { name: inOut.material },
                });
            }

            // 4) APLICAMOS el valor nuevo
            if (status === "Ingreso") {
                // Para el nuevo registro como "Ingreso", sumamos la cantidad al material nuevo
                await Inventory.increment("qty", {
                    by: qty_material,
                    where: { name: material },
                });
            } else if (status === "Salida") {
                // Para el nuevo registro como "Salida", restamos la cantidad al material nuevo
                await Inventory.decrement("qty", {
                    by: qty_material,
                    where: { name: material },
                });
            }

            // 5) Actualizamos la información del registro
            await inOut.update(input);

            return inOut;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static async delete({ id }) {
        try {
            const inOut = await InOuts.findByPk(id);
            if (!inOut) return false;

            const { status } = inOut

            if (status === 'Ingreso') {
                await Inventory.decrement('qty', {
                    by: inOut.qty_material,
                    where: { name: inOut.material }
                })
            } else if (status === 'Salida') {
                await Inventory.increment('qty', {
                    by: inOut.qty_material,
                    where: { name: inOut.material }
                })
            }


            await inOut.destroy();
            return true
        } catch (error) {
            console.log('Error in InOutsModel.delete', error);
            throw error
        }
    }



}