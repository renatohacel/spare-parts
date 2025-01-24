import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const OutTool = sequelize.define('out_tool', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    responsible: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false,
    },
    num_employee_responsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false,
    },
    num_employee_receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tool: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false,
    },
    date_out: {
        type: DataTypes.TEXT, // Cambiar de DATE a TEXT
        allowNull: false
    },
    time_out: {
        type: DataTypes.TEXT, // Cambiar de TIME a TEXT
        allowNull: false
    },
    area: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_returned: {
        type: DataTypes.INTEGER, // Cambiar de TINYINT(1) a INTEGER
        defaultValue: 0,
        allowNull: false
    },
    date_return: {
        type: DataTypes.TEXT, // Cambiar de DATE a TEXT
        allowNull: true,
    },
    time_return: {
        type: DataTypes.TEXT, // Cambiar de TIME a TEXT
        allowNull: true,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'in_outs_tools',
    timestamps: false,
    freezeTableName: true,
});