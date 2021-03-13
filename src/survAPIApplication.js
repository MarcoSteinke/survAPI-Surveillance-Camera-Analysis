// Administrator settings
const port = 3000;
const DB = 'SurvAPI';
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'localhost';
// if this is set to true, detections will be deleted on restart
const testing = true;

const express = require('express');
const survAPIApplication = express();

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
survAPIApplication.use(express.static(__dirname));

survAPIApplication.use(cors());

// enable MIME
const mime = require('mime');

// fs
const fs = require('fs');

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'

mime.getExtension('text/plain');               // ⇨ 'txt'
mime.getExtension('application/json');         // ⇨ 'json'
mime.getExtension('text/html; charset=utf8');  // ⇨ 'html'
mime.getExtension('text/html');  // ⇨ 'html'


const { Sequelize, DataTypes } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
  }
});

const Detection = sequelize.define("detection", {
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
})

// Module imports:
const IMPORTS_PREFIX = './subsystems';

// enable axios for requests
const axios = require('axios');

// use for persistence
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

survAPIApplication.get('/', (req, res) => res.render("index.ejs", {data: 1}));

// Require body-parser to parse requests easily
var bodyParser = require('body-parser');
survAPIApplication.use(express.json());

// Route for testing ejs templates
survAPIApplication.get('/detection', (req, res) => {
  res.render("form.ejs", {});
})

// Route used to persist detections inside of the database. Data sent to the server will be validated by Sequelize.
survAPIApplication.post('/detection', asyncMiddleware(async (req, res, next) => {

  // parse fields from body
  const { camera, objects } = req.body;

  // persist as detection
  const detection = await Detection.create(
    {
      camera: camera,
      objects: objects, 
      date: new Date(), 
      time: new Date().toString().split(new Date().getFullYear())[1].split("GMT")[0].trim()
    }
  );
})
);

// Thanks @https://betterprogramming.pub/video-stream-with-node-js-and-html5-320b3191a6b6
survAPIApplication.get('/video', function(req, res) {

    // place any video to test this streaming route.
    const path = 'assets/video.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {

      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)

      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1

      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      // Define header for the packages sent to the browser
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head);
      file.pipe(res);

    } else {

      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

survAPIApplication.listen(port, () => checkDatabaseConnection());

/* Checks the database connection each time the application is run.
 * Uses Sequelize's "authenticate()" to do so.
 */
async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(new Date().toUTCString());

        // clear database on startup (only for testing)
        if(testing) {
          Detection.destroy({
            truncate: true
          });
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
