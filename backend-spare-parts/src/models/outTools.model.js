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
            console.log('Error in OutToolsModel.getAll:', error);
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const { receiver, tool } = input;

            if (!receiver || !tool) {
                throw new Error('Receiver or tool is undefined');
            }

            const receiverExist = await Personal.findOne({ where: { name: receiver } });
            if (!receiverExist) return { error: 'receiver_no_exists' };

            const toolExist = await Tools.findOne({ where: { name: tool } });
            if (!toolExist) return { error: 'tool_no_exists' };

            const outTool = await OutTool.create(input);
            // Update the tool status to 0
            await Tools.update({ status: 0 }, { where: { name: tool } });

            return outTool;
        } catch (error) {
            console.log('Error in OutToolsModel.create:', error);
            throw error;
        }
    }

    static async delete({ id, tool }) {
        try {
            if (!tool) {
                throw new Error('Tool is undefined');
            }

            const outTool = await OutTool.findByPk(id);
            if (!outTool) return false;
            await outTool.destroy();
            await Tools.update({ status: 1 }, { where: { name: tool } });
            return true;
        } catch (error) {
            console.log('Error in OutToolsModel.delete:', error);
            throw error;
        }
    }

    static async update({ id, input }) {
        try {
            const { receiver, tool } = input;

            if (!receiver || !tool) {
                throw new Error('Receiver or tool is undefined');
            }

            const receiverExist = await Personal.findOne({ where: { name: receiver } });
            if (!receiverExist) return { error: 'receiver_no_exists' };

            const toolExist = await Tools.findOne({ where: { name: tool } });
            if (!toolExist) return { error: 'tool_no_exists' };

            const outTool = await OutTool.findByPk(id);
            if (!outTool) return null;

            const updateOutTool = await outTool.update(input);

            return updateOutTool;
        } catch (error) {
            console.log('Error in OutToolsModel.update:', error);
            throw error;
        }
    }

    static async check_return({ id, input }) {
        try {
            const { tool } = input;

            if (!tool) {
                throw new Error('Tool is undefined');
            }

            const outTool = await OutTool.findByPk(id);
            if (!outTool) return null;

            await Tools.update({ status: 1 }, { where: { name: tool } });

            const updateOutTool = await outTool.update({
                is_returned: input.is_returned,
                date_return: input.date_return,
                time_return: input.time_return,
                comments: input.comments
            });

            return updateOutTool;
        } catch (error) {
            console.log('Error in OutToolsModel.check_return:', error);
            throw error;
        }
    }
}