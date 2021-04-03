const SequelizeDatabaseConnection = require("../SequelizeDatabaseConnection");

const repository = SequelizeDatabaseConnection.repository;

const DataTypes = SequelizeDatabaseConnection.datatypes;

exports.User = repository.define("user", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.INTEGER
  });