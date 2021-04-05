const UserRepository = require("../../../infrastructure/persistence/sequelize/SequelizeUserRepository");
const User = UserRepository.User;

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findUser = async function(username) {
    let user = await User.findOne({where: { username: username}});

    return user;
}

async function createUser(username, hash) {
  User.create(
      {
        username: username,
        password: hash
      }
    );
}

exports.createUser = createUser;

exports.generateHashedPasswordAndCreateUser = function(username, password, saltRounds) {

  bcrypt.genSalt(saltRounds, function(err, salt) {
  
    bcrypt.hash(password, salt, function(err, hash) {

        createUser(username, hash);
    });
  });
}