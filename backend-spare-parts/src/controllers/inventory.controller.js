import { InventoryModel } from "../models/inventory.model.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Las imágenes se guardan en la carpeta 'uploads'
    },
    filename: function (req, file, cb) {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`; // Nombre único con extensión
        cb(null, uniqueName);
    }
});

export const upload = multer({ storage: storage });

export class InventoryController {
    static async getAll(req, res) {
        const inventory = await InventoryModel.getAll();
        return res.status(200).send(inventory)
    }

    static async create(req, res) {
        try {
            const {
                id_feature,
                name,
                part_num,
                suplier_part_num,
                qty_import_total,
                qty,
                ubication,
                comments
            } = req.body;

            const image = req.file ? req.file.filename : null;

            const processedSuplierPartNum = suplier_part_num === '' ? null : suplier_part_num;

            const processedComments = comments === '' ? null : comments;
            const parsedQtyImportTotal = parseInt(qty_import_total, 10);
            const parsedQty = parseInt(qty, 10);

            const result = await InventoryModel.create({
                input: {
                    id_feature,
                    name,
                    part_num,
                    suplier_part_num: processedSuplierPartNum,
                    qty_import_total: parsedQtyImportTotal,
                    qty: parsedQty,
                    ubication,
                    comments: processedComments,
                    image,
                }
            });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'id_feature_exists':
                        errorMessage = 'id_feature_exists';
                        break;
                    case 'name_exists':
                        errorMessage = 'name_exists';
                        break;
                    case 'part_num_exists':
                        errorMessage = 'part_num_exists';
                        break;
                    case 'suplier_part_num_exists':
                        errorMessage = 'suplier_part_num_exists';
                        break;
                    default:
                        errorMessage = 'Error desconocido'
                }
                return res.status(409).send({ error: errorMessage });
            }
            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error adding material:', error);
            return res.status(500).send({ message: 'Error adding material' });
        }
    }


    static async delete(req, res) {
        const { id } = req.params
        try {
            const result = await InventoryModel.delete({ id });
            if (!result) {
                return res.status(404).json({ message: 'Material not found' })
            }
            return res.send({ message: 'Material deleted successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error en el servidor' });
        }
    }

    static async update(req, res) {
        try {

            const { id } = req.params
            const {
                suplier_part_num,
                qty_import_total,
                qty,
                comments
            } = req.body;

            const image = req.file ? req.file.filename : null;

            const processedSuplierPartNum = suplier_part_num === '' ? null : suplier_part_num;

            const processedComments = comments === '' ? null : comments;
            const parsedQtyImportTotal = parseInt(qty_import_total, 10);
            const parsedQty = parseInt(qty, 10);

            const result = await InventoryModel.update({
                id,
                input: {
                    ...req.body,
                    suplier_part_num: processedSuplierPartNum,
                    qty_import_total: parsedQtyImportTotal,
                    qty: parsedQty,
                    comments: processedComments,
                    image,
                }
            });

            if (result.error) {
                let errorMessage;

                switch (result.error) {
                    case 'id_feature_exists':
                        errorMessage = 'id_feature_exists';
                        break;
                    case 'name_exists':
                        errorMessage = 'name_exists';
                        break;
                    case 'part_num_exists':
                        errorMessage = 'part_num_exists';
                        break;
                    case 'suplier_part_num_exists':
                        errorMessage = 'suplier_part_num_exists';
                        break;
                    default:
                        errorMessage = 'Error desconocido'
                }
                return res.status(409).send({ error: errorMessage });
            }
            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error update material:', error);
            return res.status(500).send({ message: 'Error update material' });
        }
    }

    static async check_dashboard(req, res) {
        const { id } = req.params
        try {
            const result = await InventoryModel.check_dashboard({ id });
            if (result === null) return res.status(404).json({ message: 'Material not found' });

            return res.status(201).send({ result });
        } catch (error) {
            console.error('Error check_dash material:', error);
            return res.status(500).send({ message: 'Error check_dash material' });
        }
    }

}