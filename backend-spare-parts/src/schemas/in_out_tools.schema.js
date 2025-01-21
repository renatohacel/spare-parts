import { DataTypes, TINYINT } from 'sequelize'
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
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    num_employee_responsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    num_employee_receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tool: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date_out: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time_out: {
        type: DataTypes.TIME,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_returned: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        allowNull: false
    },
    date_return: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    time_return: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
    }

},
    {
        tableName: 'in_outs_tools',
        timestamps: false,
        freezeTableName: true,
    })