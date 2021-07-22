// bcrypt_
let bcrypt_ = require("./UserService.ts").bcrypt();
let saltRounds_ = require("./UserService.ts").saltRounds();
import {Req, Response, Session} from "@tsed/common";
import "@tsed/platform-express";

/**
 * 
 * @param {String} password entered password
 * @param {String} userPassword persisted user password
 * @param {Response} res Response in which the website will be rendered
 * @param {Session} sessionTmp current user session
 */
//                                                                                                               v to be refactored
exports.authenticate = async function(password: String, userPassword: String, res: Response, sessionTmp: Req, username: String) { 
    
    bcrypt_.compare(password, userPassword, function(err: Object, result: String) {

        console.log([password, userPassword].join(','));

        if(!err && result) {
        res.render("login.ejs", {username: username, error: ""});
        } else {
        res.render("login.ejs", {username: 0, error: "This password is wrong."});
        sessionTmp.destroy();
        return;
    }
})};