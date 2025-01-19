
import { DataTypes } from 'sequelize'
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
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    num_employee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    shift: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    area: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    manager: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'personal',
    timestamps: false,
    freezeTableName: true,
});