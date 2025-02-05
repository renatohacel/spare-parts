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

    static async update({ id, input }) {
        try {
            const { status, material, qty_material, receiver, num_employee_receiver } = input;
            const inOut = await InOuts.findByPk(id);
            if (!inOut) return false;

            // Validar que exista la persona receptora
            const findReceiver = await Personal.findOne({ where: { name: receiver } });
            if (findReceiver && findReceiver.num_employee !== null) {
                if (num_employee_receiver !== findReceiver.num_employee) {
                    return null;
                }
            }

            // -----------------------------
            // 1. CASO: CAMBIO DE MATERIAL
            // -----------------------------
            if (material !== inOut.material) {
                if (inOut.status === 'Ingreso') {
                    await Inventory.decrement('qty', {
                        by: inOut.qty_material,
                        where: { material: inOut.material }
                    })
                } else if (inOut.status === 'Salida') {
                    await Inventory.increment('qty', {
                        by: inOut.qty_material,
                        where: { material: inOut.material }
                    })
                }
                if (status === 'Ingreso') {
                    await Inventory.increment('qty', {
                        by: qty_material,
                        where: { material }
                    });
                } else if (status === 'Salida') {
                    await Inventory.decrement('qty', {
                        by: qty_material,
                        where: { material }
                    });
                }
            }

            // ----------------------------
            // 2. CASO: CAMBIO DE STATUS
            // ----------------------------
            if (status !== inOut.status) {
                // Sumamos la cantidad anterior + la nueva, porque “reponemos” o “sacamos” todo de golpe
                const qtyAbs = inOut.qty_material + qty_material;

                if (status === 'Ingreso') {
                    await Inventory.increment('qty', {
                        by: qtyAbs,
                        where: { material }
                    });
                } else if (status === 'Salida') {
                    await Inventory.decrement('qty', {
                        by: qtyAbs,
                        where: { material }
                    });
                }
            }
            // ------------------------------------------------------------
            // 3. CASO: EL STATUS SIGUE SIENDO EL MISMO, SOLO CAMBIA qty
            // ------------------------------------------------------------
            else if (status === inOut.status) {
                const difference = qty_material - inOut.qty_material;
                if (difference !== 0) {
                    if (status === 'Ingreso') {
                        // difference > 0 => incrementa inventario
                        // difference < 0 => decrementa inventario
                        const method = difference > 0 ? 'increment' : 'decrement';
                        await Inventory[method]('qty', {
                            by: Math.abs(difference),
                            where: { material }
                        });
                    } else if (status === 'Salida') {
                        // difference > 0 => estás sacando más => decrement
                        // difference < 0 => sacas menos => increment
                        const method = difference > 0 ? 'decrement' : 'increment';
                        await Inventory[method]('qty', {
                            by: Math.abs(difference),
                            where: { material }
                        });
                    }
                }
            }

            await inOut.update(input);

            return inOut;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}