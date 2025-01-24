import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const Tools = sequelize.define('tool', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER, // Cambiar de TINYINT(1) a INTEGER
        allowNull: false,
    },
}, {
    tableName: 'tools',
    timestamps: false,
    freezeTableName: true,
});