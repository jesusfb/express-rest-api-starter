//require dependencies
const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routesV1 = require('./src/routesV1');
const port = process.env.PORT || 4200;



app.use('/v1', routesV1);


const options = {    
    "swaggerDefinition": require('./src/swagger.json'),
    "apis": [
        "src/controllers/*.js"
    ]
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));




//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Kushy API server started on: ' + port);