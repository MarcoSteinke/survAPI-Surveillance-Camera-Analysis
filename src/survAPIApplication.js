const express = require('express');
const survAPIApplication = express();
const port = 3000;

const cors = require('cors');

// use ejs as rendering (view) engine
survAPIApplication.set('view-engine', 'ejs');
survAPIApplication.use(express.static('public'));
var bodyParser = require('body-parser');
// handle form data
var multer = require('multer');
var upload = multer();

// for parsing application/json
survAPIApplication.use(bodyParser.json()); 

// for parsing application/xwww-
survAPIApplication.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
survAPIApplication.use(upload.array()); 
survAPIApplication.use(express.static('public'));
survAPIApplication.use(express.static('subsystems'));

survAPIApplication.use(cors());

// enable MIME
const mime = require('mime');

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'

mime.getExtension('text/plain');               // ⇨ 'txt'
mime.getExtension('application/json');         // ⇨ 'json'
mime.getExtension('text/html; charset=utf8');  // ⇨ 'html'
mime.getExtension('text/html');  // ⇨ 'html'


const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('SurvAPI', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql'
});

// Module imports:
const IMPORTS_PREFIX = './subsystems';
const Detection = require(IMPORTS_PREFIX + '/Detection/Detection.js');




survAPIApplication.get('/', (req, res) => res.render("index.ejs", {data: new Detection(1, ['person'])}));
survAPIApplication.listen(port, () => checkDatabaseConnection());

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(new Date().toUTCString());
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}