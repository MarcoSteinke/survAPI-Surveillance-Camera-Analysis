var express = require('express');
var survAPIRouter = express.Router();

module.exports = class SurvAPIRouter {

    // use for persistence
    static asyncMiddleware = fn =>
        (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(next);
    }
}


