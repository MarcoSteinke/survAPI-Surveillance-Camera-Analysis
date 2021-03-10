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


const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('SurvAPI', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql'
});

// Module imports:
const IMPORTS_PREFIX = './subsystems';
const Detection = require(IMPORTS_PREFIX + '/Detection/Detection.js');




survAPIApplication.get('/', (req, res) => res.render("index.ejs", {data: 1}));

var bodyParser = require('body-parser');
survAPIApplication.use(express.json());
survAPIApplication.use(express.urlencoded());
survAPIApplication.use(express.multipart());

app.post('/detection', function(req, res) {
  const { id, objects, date } = req.body;
});

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

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(new Date().toUTCString());
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}