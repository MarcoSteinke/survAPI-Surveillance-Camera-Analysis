const UserRepository = require("../../../infrastructure/persistence/sequelize/SequelizeUserRepository");
const User = UserRepository.User;

exports.findUser = async function(username) {
    let user = await User.findOne({where: { username: username}});

    return user;
}