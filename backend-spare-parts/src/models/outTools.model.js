
import { OutTool } from "../schemas/in_out_tools.schema.js";
import { Personal } from "../schemas/personal.schema.js";
import { Tools } from "../schemas/tools.schema.js";
import { Op } from "sequelize";

export class OutToolsModel {
    static async getAll() {
        try {
            const outTools = await OutTool.findAll({
                order: [['id', 'DESC']]
            });
            return outTools;
        } catch (error) {
            console.log('Error in OutToolsModel.update:', error);
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const { receiver, tool } = input

            const receiverExist = Personal.findOne({ where: { name: receiver } })
            if (!receiverExist) return { error: 'receiver_no_exists' };

            const toolExist = Tools.findOne({ where: { name: tool } })
            if (!toolExist) return { error: 'tool_no_exists' }

            const outTool = await OutTool.create(input);
            // Update the tool status to 0
            await Tools.update({ status: 0 }, { where: { name: tool } });

            return outTool;
        } catch (error) {

        }
    }

    static async delete({ id, tool }) {
        try {
            const outTool = await OutTool.findByPk(id);
            if (!outTool) return false;
            await outTool.destroy();
            await Tools.update({ status: 1 }, { where: { name: tool } });
            return true;
        } catch (error) {
            console.log('Error in OutToolsModel.update:', error);
            throw error;
        }
    }

    static async update({ id, input }) {
        try {
            const { receiver, tool } = input
            const receiverExist = await Personal.findOne({ where: { name: receiver } })
            if (!receiverExist) return { error: 'receiver_no_exists' };

            const toolExist = await Tools.findOne({ where: { name: tool } })
            if (!toolExist) return { error: 'tool_no_exists' }

            const outTool = await OutTool.findByPk(id);
            if (!outTool) return null

            const updateOutTool = await outTool.update(input)

            return updateOutTool;
        } catch (error) {
            console.log('Error in OutToolsModel.update:', error);
            throw error;
        }
    }
}