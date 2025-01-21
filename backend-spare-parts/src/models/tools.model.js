import { Tools } from "../schemas/tools.schema.js";

export class ToolsModel {
    static async getAll() {
        try {
            const tools = await Tools.findAll({
                order: [['id', 'DESC']]
            });
            return tools;
        } catch (error) {
            console.log('Error in ToolsModel.getAll:', error)
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const tool = await Tools.create(input);
            return tool;

        } catch (error) {
            console.error('Error in ToolsModel.create:', error); // Log the error
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const tool = await Tools.findByPk(id)
            if (!tool) return false;

            await tool.destroy();

            return true;
        } catch (error) {
            console.log('Error in ToolsModel.delete:', error);
            throw error;
        }
    }

    static async update({ id, input }) {
        try {
            const tool = await Tools.findByPk(id);
            if (!tool) return null

            const updatedTool = await tool.update(input);
            return updatedTool;
        } catch (error) {
            console.error('Error in PersonalModel.update:', error); // Log the error
            throw error;
        }
    }
}