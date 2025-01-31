import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const Imports = sequelize.define('_import', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    part_num: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'imports',
    timestamps: false,
    freezeTableName: true,
})