import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const Inventory = sequelize.define('inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    id_feature: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.TEXT,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    part_num: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    suplier_part_num: {
        type: DataTypes.TEXT,
        unique: true,
    },
    qty_import_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_dashboard: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    ubication: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    damages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    qty_export_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    comments: {
        type: DataTypes.TEXT,
    }

},
    {
        tableName: 'inventory',
        timestamps: false,
        freezeTableName: true,
    })