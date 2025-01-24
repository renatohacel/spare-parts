import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.TEXT, // Cambiar de UUID a TEXT
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.TEXT, // Cambiar de STRING(100) a TEXT
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT, // Cambiar de STRING(100) a TEXT
        allowNull: false,
    },
    num_employee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT, // Cambiar de STRING(255) a TEXT
        allowNull: false,
    },
    shift: {
        type: DataTypes.INTEGER, // Cambiar de TINYINT a INTEGER
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.INTEGER, // Cambiar de TINYINT a INTEGER
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
});