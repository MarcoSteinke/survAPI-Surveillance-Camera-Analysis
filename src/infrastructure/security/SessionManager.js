exports.checkSession = function checkSession(request) {
    sessionTmp = request.session;

    return sessionTmp.username != undefined;
}

exports.asyncMiddleware = fn =>
    (req, res, next) => {
    Promise.resolve(fn(req, res, next))
    .catch(next);
}