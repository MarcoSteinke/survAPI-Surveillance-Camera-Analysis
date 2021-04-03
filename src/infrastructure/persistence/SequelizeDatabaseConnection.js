// Administrator settings ( will be moved to properties file later )
exports.port = 3000;
const DB = 'SurvAPI';
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'localhost';
const testing = true;

const { Sequelize, DataTypes } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
exports.datatypes = DataTypes;

const repository = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
  }
});

exports.repository = repository;

/* Checks the database connection each time the application is run.
 * Uses Sequelize's "authenticate()" to do so.
 */
exports.checkDatabaseConnection = async function() {
    try {

        await repository.authenticate();
        console.log('Connection has been established successfully.');
        console.log(new Date().toUTCString()); 

    } catch (error) {

        console.error('Unable to connect to the database:', error);

    }
}

if(testing) {
    const DummyData = require("../../test/DummyData");

    new DummyData().cameras();
}