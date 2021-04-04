var express = require('express');
const SessionManager = require("../../security/SessionManager");
var survAPIRouter = express.Router();

exports.error = function(req, res){
    res.status(404).render("error.ejs", {username: (SessionManager.checkSession(req)) ? sessionTmp.username : 0});
}


