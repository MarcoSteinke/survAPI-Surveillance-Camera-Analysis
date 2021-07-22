const UserRepository = require("../../../infrastructure/persistence/sequelize/SequelizeUserRepository");
const User = UserRepository.User;

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findUser = async function(username: String) {
    let user = await User.findOne({where: { username: username}});

    return user;
}

async function createUser(username: String, hash: String) {
  User.create(
      {
        username: username,
        password: hash
      }
    );
}

exports.createUser = createUser;

/**
 * Hash the received password and create a new user with both the username and the hashed password.
 * @param {String} username The username received from any form
 * @param {String} password The rawPassword received from any form
 * @param {Integer} saltRounds Amount of hashes applied to the password
 */
exports.generateHashedPasswordAndCreateUser = function(username: String, password :String, saltRounds: Number) {

  bcrypt.genSalt(saltRounds, function(err: Object, salt: String) {
  
    bcrypt.hash(password, salt, function(err: Object, hash: String) {

        createUser(username, hash);
    });
  });
}