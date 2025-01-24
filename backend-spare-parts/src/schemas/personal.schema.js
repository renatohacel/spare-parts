import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const Personal = sequelize.define('personal', {
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
    role: {
        type: DataTypes.TEXT, // Cambiar de STRING(100) a TEXT
        allowNull: true,
    },
    num_employee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    shift: {
        type: DataTypes.INTEGER, // Cambiar de TINYINT a INTEGER
        allowNull: true,
    },
    area: {
        type: DataTypes.TEXT, // Cambiar de STRING(100) a TEXT
        allowNull: true,
    },
    manager: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: true,
    },
}, {
    tableName: 'personal',
    timestamps: false,
    freezeTableName: true,
});