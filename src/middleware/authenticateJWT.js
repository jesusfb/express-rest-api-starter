const passport = require('passport');
require('./passport')(passport);
const {ErrorResponse} = require('../services/util.service');

module.exports = authenticateJWT = (req, res, next) => {
    return passport.authenticate('jwt', {
        session: false,
        failWithError: false
    }, function (err, user, info) {
        if (!user) {
            return ErrorResponse(res, info, 401);
        }
        req.user = user;
        return next();
    })(req, res, next)
};
