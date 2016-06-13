'use strict';
const Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(
    () => {
        console.log('Sequelize initialized!');
    },
    (errors) => {
        console.log(errors);
        sequelize = null;
    }
);

module.exports = sequelize;