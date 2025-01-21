import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

export const Tools = sequelize.define('tool', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
    },
}, {
    tableName: 'tools',
    timestamps: false,
    freezeTableName: true,
}
)