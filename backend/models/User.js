'use strict';
const Sequelize = require('sequelize');
const orm = require('./orm');

var User = orm.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.INTEGER,
            defaultValue: () => { return Math.floor(Date.now() / 1000); },
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.INTEGER,
            defaultValue: () => { return Math.floor(Date.now() / 1000); },
            allowNull: false
        }
    },
    {
        tableName: 'users',
        timestamps: false
    }
);

/***
 * Finds a user by email
 *
 * @param email
 * @returns {*}
 */
User.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            attributes: [ 'id', 'facebookUserId', 'name', 'email', 'password', 'salt', 'photoPath', 'thumbnailPath', 'role', 'status' ],
            where: {
                email: email
            }
        }).then(
            (result) => {
                if (result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

module.exports = User;