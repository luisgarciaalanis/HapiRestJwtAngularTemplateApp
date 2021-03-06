'use strict';
var bcrypt = require('bcrypt');
var env = require('node-env-file');
env('../../.env');

/**
 * Generates the user rows to be stored on the users table
 *
 * @param id
 * @param name
 * @param email
 * @param password
 * @returns {{id: *, name: *, email: *, password, salt}}
 */
function generateUserData(id, name, email, password) {
  var salt = bcrypt.genSaltSync(8);
  var secret = process.env.PASSWORD_SECRET;
  var passwordHash = bcrypt.hashSync(password + secret, salt);
  var dateNow = Math.floor(Date.now() / 1000);

  return {
    id: id,
    name: name,
    email: email,
    password: passwordHash,
    salt: salt,
    created_at: dateNow,
    updated_at: dateNow
  };
}

/**
 * Seeds the users table
 *
 * @type {{up: module.exports.up, down: module.exports.down}}
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    users.push(generateUserData(1, 'Luis Garcia', 'luis@fake-gmail.com', 'secret'));
    users.push(generateUserData(2, 'Slash', 'slash@fake-gmail.com ', 'secret'));
    users.push(generateUserData(3, 'Amy Pond', 'amy@fake-gmail.com ', 'secret'));
    users.push(generateUserData(4, 'Rory Williams', 'rory@fake-gmail.com ', 'secret'));
    users.push(generateUserData(5, 'Tupac', 'tupac@fake-gmail.com ', 'secret'));
    users.push(generateUserData(6, 'Axl Rose', 'axl@fake-gmail.com ', 'secret'));
    users.push(generateUserData(7, 'Luke Skywalker', 'luke@fake-gmail.com ', 'secret'));

    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
