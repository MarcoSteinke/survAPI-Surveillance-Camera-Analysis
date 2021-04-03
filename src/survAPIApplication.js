// Administrator settings ( will be moved to properties file later )

// if this is set to true, detections will be deleted on restart
const testing = true;

const express = require('express');
const survAPIApplication = express();

const SurvAPIRouter = require('./infrastructure/web/router/SurvAPIRouter.js');

survAPIApplication.set('views','./infrastructure/web/views');

// enable sessions
const session = require('express-session');
survAPIApplication.use(session({secret: 'ssshhhhh'}));
let sessionTmp;

/*function checkSession(request) {
  sessionTmp = request.session;

  return sessionTmp.username != undefined;
}*/

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require('cors');

// use ejs as rendering (view) engine
survAPIApplication.set('view-engine', 'ejs');
survAPIApplication.use(express.static('./infrastructure/web/static'));
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

// dummy data
const DummyData = require('./test/DummyData.js');
const SequelizeCameraRepository = require("./infrastructure/persistence/sequelize/SequelizeCameraRepository");
const testData = new DummyData(SequelizeCameraRepository.Camera);

// Module imports:
const IMPORTS_PREFIX = './subsystems';

const SessionManager = require("./infrastructure/security/SessionManager");

// enable axios for requests
const axios = require('axios');
  
// Require body-parser to parse requests easily
var bodyParser = require('body-parser');
survAPIApplication.use(express.json());

// Controllers
const LogoutController = require('./infrastructure/web/router/controllers/LogoutController');
const SurvAPIController = require('./infrastructure/web/router/controllers/SurvAPIController');
const LoginController = require('./infrastructure/web/router/controllers/LoginController');
const RegistrationController = require('./infrastructure/web/router/controllers/RegistrationController');
  
survAPIApplication.get('/', SurvAPIController.index);

// Route for testing ejs templates
survAPIApplication.get('/detection', (req, res) => {
  if(SessionManager.checkSession(req))
    res.render("form.ejs", {username: sessionTmp.username});
  else res.redirect("/login");
});

// GET Route for login
survAPIApplication.get('/login', LoginController.getLogin);

// POST Route for login
survAPIApplication.post('/login', LoginController.postLogin);

// LOGOUT
survAPIApplication.get('/logout', LogoutController.logout);

// POST Route for register
// This route is only accessible by the predefined admin user
survAPIApplication.post('/register', RegistrationController.postRegister);

survAPIApplication.get('/camera/:id', SessionManager.asyncMiddleware(async (req, res, next) => {

  if(!SessionManager.checkSession(req)) res.render("login.ejs", {error: "Please login before accessing this page.", username: 0});

  const cameras = await Camera.findAll();

  const selectedCamera = await Camera.findAll({
    attributes: ["id"], 
    where: {id: req.params.id} // Your filters here
  });

  console.log(selectedCamera);

  res.render("camera.ejs", {cameraId: req.params.id, cameras: cameras, selectedCamera: selectedCamera, username: sessionTmp.username});
}));

survAPIApplication.get('/cameras', SessionManager.asyncMiddleware(async (req, res, next) => {

  if(!SessionManager.checkSession(req)) res.render("login.ejs", {error: "Please login before accessing this page.", username: 0});

  const Camera = require("./infrastructure/persistence/sequelize/SequelizeCameraRepository").Camera;
  const cameras = await Camera.findAll();
  console.log(cameras);
  res.render("addCamera.ejs", {cameras: cameras, username: (sessionTmp = req.session).username});
}));

survAPIApplication.post('/cameras/add', SessionManager.asyncMiddleware(async (req, res, next) => {

  if(!SessionManager.checkSession(req)) res.render("login.ejs", {error: "Please login before accessing this page.", username: 0});

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

survAPIApplication.get('/cameras/success', SessionManager.asyncMiddleware(async (req, res, next) => {

  if(!SessionManager.checkSession(req)) res.render("login.ejs", {error: "Please login before accessing this page.", username: 0});

  const cameras = await Camera.findAll();
  console.log(cameras);
  res.render("addCamera.ejs", {cameras: cameras, success: true, username: sessionTmp.username});
}));

// Route used to persist detections inside of the database. Data sent to the server will be validated by Sequelize.
survAPIApplication.post('/detection', SessionManager.asyncMiddleware(async (req, res, next) => {

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

const SequelizeDatabaseConnection = require("./infrastructure/persistence/SequelizeDatabaseConnection");

survAPIApplication.listen(SequelizeDatabaseConnection.port, () =>  SequelizeDatabaseConnection.checkDatabaseConnection());

//The 404 Route (ALWAYS Keep this as the last route)
survAPIApplication.get('*', SurvAPIRouter.error);
