'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        var table = queryInterface.createTable('users', {
            id: {
                type:           Sequelize.INTEGER(11),
                primaryKey:     true,
                autoIncrement:  true
            },
            name:               Sequelize.STRING(100),
            email: {
                type:           Sequelize.STRING(255),
                unique:         true
            },
            password:           Sequelize.STRING(255),
            salt:               Sequelize.STRING(255),
            created_at: {
                allowNull:      false,
                type:           Sequelize.INTEGER(11),
            },
            updated_at: {
                allowNull:      false,
                type:           Sequelize.INTEGER(11),
            }
        });

        return table;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};