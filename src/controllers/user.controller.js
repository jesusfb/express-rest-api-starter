const authService = require('../services/auth.service');
const {to, ErrorResponse, SuccessResponse} = require('../services/util.service');

module.exports = class UserController {

    static async create(req, res) {
        const body = req.body;

        if (!body.unique_key && !body.email && !body.phone) {
            return ErrorResponse(res, 'Please enter an email or phone number to register.');
        } else if (!body.password) {
            return ErrorResponse(res, 'Please enter a password to register.');
        } else {
            let err, user;

            [err, user] = await to(authService.createUser(body));

            if (err) return ErrorResponse(res, err, 422);
            return SuccessResponse(res, {
                message: 'Successfully created new user.',
                user: user.toWeb(),
                token: user.getJWT()
            }, 201);
        }
    };

    static async get(req, res) {
        let user = req.user;
        return SuccessResponse(res, {user: user.toWeb()});
    };

    static async update(req, res) {
        let err, user, data;
        user = req.user;
        data = req.body;
        user.set(data);

        [err, user] = await to(user.save());
        if (err) {
            if (err.message === 'Validation error') err = 'The email address or phone number is already in use';
            return ErrorResponse(res, err);
        }
        return SuccessResponse(res, {message: 'Updated User: ' + user.email});
    };

    static async remove(req, res) {
        let user, err;
        user = req.user;

        [err, user] = await to(user.destroy());
        if (err) return ErrorResponse(res, 'error occured trying to delete user');

        return SuccessResponse(res, {message: 'Deleted User'}, 204);
    };

    static async login(req, res) {
        const body = req.body;
        let err, user;

        [err, user] = await to(authService.authUser(body));
        if (err) return ErrorResponse(res, err, 422);

        return SuccessResponse(res, {token: user.getJWT(), user: user.toWeb()});
    };

};