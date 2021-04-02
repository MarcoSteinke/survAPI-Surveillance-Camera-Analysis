// LOGOUT
exports.logout = function(req, res) {
    if(!checkSession(req)) res.redirect("/");

    const sessionTmp = req.session;
    sessionTmp.destroy();
    res.render('index.ejs', {username: -1});
};