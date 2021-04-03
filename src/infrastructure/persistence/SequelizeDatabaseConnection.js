// Administrator settings ( will be moved to properties file later )
const port = 3000;
const DB = 'SurvAPI';
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'localhost';

const { Sequelize, DataTypes } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
exports.datatypes = DataTypes;

exports.repository = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
  }
});