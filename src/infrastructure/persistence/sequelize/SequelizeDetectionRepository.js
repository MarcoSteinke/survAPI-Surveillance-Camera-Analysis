const SequelizeDatabaseConnection = require("../SequelizeDatabaseConnection");

const repository = SequelizeDatabaseConnection.repository;

const DataTypes = SequelizeDatabaseConnection.datatypes;

exports.Detection = repository.define("detection", {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    camera: {
      type: DataTypes.INTEGER
    },
    objects: DataTypes.TEXT,
    date: {
      type: DataTypes.DATE,
      //allowNull: false,
      //defaultValue: Sequelize.NOW
    },
    time: DataTypes.TEXT
});