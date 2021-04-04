const SequelizeDatabaseConnection = require("../SequelizeDatabaseConnection");

const repository = SequelizeDatabaseConnection.repository;

const DataTypes = SequelizeDatabaseConnection.datatypes;

exports.Camera = repository.define("camera", {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    ip: DataTypes.TEXT,
    port: DataTypes.SMALLINT, // maximum port is 65535
    resolution: DataTypes.SMALLINT
});