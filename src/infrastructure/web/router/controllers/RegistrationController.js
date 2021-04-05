const SessionManager = require("../../../security/SessionManager");
const UserService = require("../../../../domain/model/services/UserService");
const AuthenticationService = require("../../../../domain/model/services/AuthenticationService");

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postRegister = SessionManager.asyncMiddleware(async (req, res, next) => {

    sessionTmp = req.session;
    const { username, password } = req.body;
  
    sessionTmp.username = username;
  
    let user = await UserService.findUser(username);
  
    if(!user) {
      UserService.generateHashedPasswordAndCreateUser(username, password, saltRounds);
    }
  
    console.log(sessionTmp.username);
  
    res.render("index.ejs", {username: sessionTmp.username});
});

exports.getRegister = function(req, res) {

    if(SessionManager.checkSession(req)) res.redirect("/");
    res.render("register.ejs", {username: "", error: ""});
}