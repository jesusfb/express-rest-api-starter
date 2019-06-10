const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController = require('../controllers/home.controller');

const custom = require('./../middleware/custom');

const passport = require('passport');


require('./../middleware/passport')(passport);


/**
 * @swagger
 * /users:
 *    post:
 *      tags:
 *        - Users
 *      summary: Create user
 *      description: Creates user that can now be used for authentication
 *      operationId: createUser
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Creates user
 *          required: true
 *          schema:
 *            "$ref": "#/definitions/CreateUser"
 *      responses:
 *        '201':
 *          description: successful operation
 *          schema:
 *            "$ref": "#/definitions/CreateUserResponse"
 *        '422':
 *          description: Invalid operation
 *          schema:
 *            "$ref": "#/definitions/ApiErrorResponse"
 */
router.post('/users', UserController.create);// C

/**
 * @swagger
 * /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get User Info
 *      responses:
 *        '201':
 *          description: successful operation
 *          schema:
 *            "$ref": "#/definitions/CreateUserResponse"
 *        '422':
 *          description: Invalid operation
 *          schema:
 *            "$ref": "#/definitions/ApiErrorResponse"
 */
router.get('/users', passport.authenticate('jwt', {session: false}, null), UserController.get);        // R

/**
 * @swagger
 * /users:
 *    put:
 *      tags:
 *        - Users
 *      summary: Update User Info
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Update user Info
 *          required: true
 *          schema:
 *            "$ref": "#/definitions/UpdateUserBody"
 *      responses:
 *        '201':
 *          description: successful operation
 *          schema:
 *            "$ref": "#/definitions/CreateUserResponse"
 *        '422':
 *          description: Invalid operation
 *          schema:
 *            "$ref": "#/definitions/ApiErrorResponse"
 */
router.put('/users', passport.authenticate('jwt', {session: false}, null), UserController.update);     // U

/**
 * @swagger
 * /users:
 *    delete:
 *      tags:
 *        - Users
 *      summary: Delete current user
 *      responses:
 *        '201':
 *          description: successful operation
 *          schema:
 *            "$ref": "#/definitions/CreateUserResponse"
 *        '422':
 *          description: Invalid operation
 *          schema:
 *            "$ref": "#/definitions/ApiErrorResponse"
 */
router.delete('/users', passport.authenticate('jwt', {session: false}, null), UserController.remove);     // D

/**
 * @swagger
 * /users/login:
 *    post:
 *      tags:
 *        - Users
 *      summary: User Login
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Creates user
 *          required: true
 *          schema:
 *            "$ref": "#/definitions/CreateUser"
 *      responses:
 *        '201':
 *          description: successful operation
 *          schema:
 *            "$ref": "#/definitions/LoginUserResponse"
 *        '422':
 *          description: Invalid operation
 *          schema:
 *            "$ref": "#/definitions/ApiErrorResponse"
 */
router.post('/users/login', UserController.login);

router.post('/companies', passport.authenticate('jwt', {session: false}, null), CompanyController.create);                  // C
router.get('/companies', passport.authenticate('jwt', {session: false}, null), CompanyController.getAll);                  // R

router.get('/companies/:company_id', passport.authenticate('jwt', {session: false}, null), custom.company, CompanyController.get);     // R
router.put('/companies/:company_id', passport.authenticate('jwt', {session: false}, null), custom.company, CompanyController.update);  // U
router.delete('/companies/:company_id', passport.authenticate('jwt', {session: false}, null), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session: false}, null), HomeController.Dashboard);

module.exports = router;
