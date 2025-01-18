import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('db_spare_parts', 'root', 'calymayor1', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});


try {
    await sequelize.authenticate();
    console.log('-------------------DATABASE------------------');
    console.log('Connection has been established successfully.');
    console.log('---------------------------------------------');
} catch (error) {
    console.log('-------------------DATABASE------------------');
    console.error('Unable to connect to the database:', error);
    console.log('---------------------------------------------');
}