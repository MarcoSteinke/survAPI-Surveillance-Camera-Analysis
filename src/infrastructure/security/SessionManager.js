exports.checkSession = function checkSession(request) {
    sessionTmp = request.session;

    return sessionTmp.username != undefined;
}