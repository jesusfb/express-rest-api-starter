require('dotenv').config();

let CONFIG = {
    app: process.env.APP || 'prod',
    port: process.env.PORT || '80',

    db_dialect: process.env.DB_DIALECT || 'mysql',
    db_host: process.env.DB_HOST || '54.215.245.23',
    db_port: process.env.DB_PORT || '3306',
    db_name: process.env.DB_NAME || 'apiapp',
    db_user: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASSWORD || '123qwe#',
    jwt_encryption: process.env.JWT_ENCRYPTION || 'hitddendddjwtsecter',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};

module.exports = CONFIG;
