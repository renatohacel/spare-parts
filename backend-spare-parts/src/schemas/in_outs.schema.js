import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const InOuts = sequelize.define('in_out', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    responsible: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    num_employee_responsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    num_employee_receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shift: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    time: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    area: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tester: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    reason_scrap: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    qty_scrap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    sn_scrap: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    material: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    qty_material: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sn_material: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'in_outs',
    timestamps: false,
    freezeTableName: true,
});