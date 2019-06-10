const express = require('express');
const router = express.Router();
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const options = {
    "swaggerDefinition": require('./swagger.json'),
    "apis": [
        "src/routes/*.js"
    ]
};
const specs = swaggerJsdoc(options);
//********* API DOCUMENTATION **********

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;