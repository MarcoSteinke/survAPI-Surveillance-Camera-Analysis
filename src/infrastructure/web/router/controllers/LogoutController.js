// LOGOUT
const SessionManager = require("../../../security/SessionManager");

exports.logout = function(req, res) {
    if(!SessionManager.checkSession(req)) res.redirect("/");

    const sessionTmp = req.session;
    sessionTmp.destroy();
    res.render('index.ejs', {username: -1});
};