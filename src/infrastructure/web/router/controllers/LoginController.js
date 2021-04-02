const SessionManager = require("../../../security/SessionManager");

exports.getLogin = function(req, res) {

    if(SessionManager.checkSession(req)) res.redirect("/");
    res.render("login.ejs", {username: "", error: ""});
}