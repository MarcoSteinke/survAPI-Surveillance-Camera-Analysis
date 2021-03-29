// Administrator settings ( will be moved to properties file later )
const port = 3000;
const DB = 'SurvAPI';
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'localhost';
// if this is set to true, detections will be deleted on restart
const testing = true;

const express = require('express');
const survAPIApplication = express();

// enable sessions
const session = require('express-session');
survAPIApplication.use(session({secret: 'ssshhhhh'}));
let sessionTmp;

function checkSession(request) {
  sessionTmp = request.session;

  return sessionTmp.username != undefined;
}

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: DataTypes.TEXT,
  password: DataTypes.TEXT,
  role: DataTypes.INTEGER
});

const Camera = sequelize.define("camera", {
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

// dummy data
const DummyData = require('./test/DummyData.js');
const testData = new DummyData(Camera);

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

  
  // Require body-parser to parse requests easily
  var bodyParser = require('body-parser');
  survAPIApplication.use(express.json());
  
survAPIApplication.get('/', (req, res) => {

  // if the user is not logged in, the username will be set to 0.
  res.render("index.ejs", {username: (checkSession(req)) ? sessionTmp.username : 0});

});

// Route for testing ejs templates
survAPIApplication.get('/detection', (req, res) => {
  if(checkSession(req))
    res.render("form.ejs", {username: sessionTmp.username});
  else res.redirect("/login");
});

// GET Route for login
survAPIApplication.get('/login', (req, res) => {

  if(checkSession(req)) res.redirect("/");
  res.render("login.ejs", {username: ""});

});

// POST Route for login
survAPIApplication.post('/login', asyncMiddleware(async (req, res, next) => {

  sessionTmp = req.session;
  const { username, password } = req.body;

  sessionTmp.username = username;

  let user = await User.findOne({where: { username: username}});

  console.log(user);

  // if the username is unknown, set the username to 0 and add an error message
  if(user == null) {
    res.render("login.ejs", {username: 0, error: "This username is unknown."});
    return;
  }

  // if the username is known, but the password is wrong, set the username to 0 and add an error message
  bcrypt.compare(password, user.password, function(err, result) {
      if(err) {
        res.render("login.ejs", {username: 0, error: "This password is wrong."});
        return;
      }
      else console.log(result);
  });

  console.log(sessionTmp.username);

  res.render("login.ejs", {username: sessionTmp.username, error: ""});
}));

// LOGOUT
survAPIApplication.get('/logout', (req, res) => {
  if(!checkSession(req)) res.redirect("/");

  const sessionTmp = req.session;
  sessionTmp.destroy();
  res.render('index.ejs', {username: -1});
});

// POST Route for register
// This route is only accessible by the predefined admin user
survAPIApplication.post('/register', asyncMiddleware(async (req, res, next) => {

  sessionTmp = req.session;
  const { username, password } = req.body;

  sessionTmp.username = username;

  let user = await User.findOne({where: { username: username}});

  if(!user) {
    bcrypt.genSalt(saltRounds, function(err, salt) {

      bcrypt.hash(password, salt, function(err, hash) {

          User.create(
            {
              username: username,
              password: hash
            }
          );
      });
    });
  }

  console.log(sessionTmp.username);

  res.render("index.ejs", {username: sessionTmp.username});
}));

survAPIApplication.get('/camera/:id', asyncMiddleware(async (req, res, next) => {

  if(!checkSession(req)) res.redirect("/login");

  const cameras = await Camera.findAll();

  const selectedCamera = await Camera.findAll({
    attributes: ["id"], 
    where: {id: req.params.id} // Your filters here
  });

  console.log(selectedCamera);

  res.render("camera.ejs", {cameraId: req.params.id, cameras: cameras, selectedCamera: selectedCamera, username: sessionTmp.username});
}));

survAPIApplication.get('/cameras', asyncMiddleware(async (req, res, next) => {

  if(!checkSession(req)) res.redirect("/login");

  const cameras = await Camera.findAll();
  console.log(cameras);
  res.render("addCamera.ejs", {cameras: cameras, username: sessionTmp.username});
}));

survAPIApplication.post('/cameras/add', asyncMiddleware(async (req, res, next) => {

  if(!checkSession(req)) res.redirect("/login");

  // TODO validation
  const { name, description, ip, port, resolution} = req.body;

  const camera = await Camera.create(
    {
      name: name,
      description: description,
      ip: ip,
      port: port,
      resolution: resolution
    }
  );

  res.redirect('/cameras/success', {username: sessionTmp.username});
})
);

survAPIApplication.get('/cameras/success', asyncMiddleware(async (req, res, next) => {

  if(!checkSession(req)) res.redirect("/login");

  const cameras = await Camera.findAll();
  console.log(cameras);
  res.render("addCamera.ejs", {cameras: cameras, success: true, username: sessionTmp.username});
}));

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

          Camera.destroy({
            truncate: true
          });

          // Add some dummy data
          testData.cameras();
          
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//The 404 Route (ALWAYS Keep this as the last route)
survAPIApplication.get('*', function(req, res){
  res.status(404).render("error.ejs", {username: (checkSession(req)) ? sessionTmp.username : 0});
});
