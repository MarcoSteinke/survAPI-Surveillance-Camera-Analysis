const express = require('express');
const survAPIApplication = express();
const port = 3000;

const cors = require('cors');

survAPIApplication.use(cors());

const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('SurvAPI', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql'
});



survAPIApplication.get('/', (req, res) => res.json(1));
survAPIApplication.listen(port, () => checkDatabaseConnection());

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}