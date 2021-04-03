const SessionManager = require("../../../security/SessionManager");
const SurvAPIRouter = require("../SurvAPIRouter");
const UserService = require("../../../../domain/model/services/UserService");
const AuthenticationService = require("../../../../domain/model/services/AuthenticationService");

exports.getLogin = function(req, res) {

    if(SessionManager.checkSession(req)) res.redirect("/");
    res.render("login.ejs", {username: "", error: ""});
}

exports.postLogin = SurvAPIRouter.asyncMiddleware(async (req, res, next) => {

    sessionTmp = req.session;
    const { username, password } = req.body;
  
    sessionTmp.username = username;
  
    let user = await UserService.findUser(username);
  
    console.log(user);
  
    // if the username is unknown, set the username to 0 and add an error message
    if(user == null) {
      res.render("login.ejs", {username: 0, error: "This username is unknown."});
      return;
    }
  
    // if the username is known, but the password is wrong, set the username to 0 and add an error message
    let loggedIn = await AuthenticationService.authenticate(password, user.password, res, sessionTmp);
  })