const express = require('express');
const router = express.Router();
const User = require('./controllers/User');



//define a route, usually this would be a bunch of routes imported from another file
router.get('/', function (req, res, next) {
    res.send('Welcome to the Kushy API');
});

router.get('/users', User.getAllUsers);



module.exports = router;