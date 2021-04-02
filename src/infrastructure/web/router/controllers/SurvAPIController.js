const SessionManager = require("../../../security/SessionManager");

exports.index = function(req, res) {

    // if the user is not logged in, the username will be set to 0.
    res.render("index.ejs", {username: (SessionManager.checkSession(req)) ? sessionTmp.username : 0});
}  