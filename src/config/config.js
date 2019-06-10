require('dotenv').config();

let CONFIG = {
    app: process.env.APP || 'prod',
    port: process.env.PORT || '80',

    db_dialect: process.env.DB_DIALECT || 'mysql',
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || '3306',
    db_name: process.env.DB_NAME || '',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    jwt_encryption: process.env.JWT_ENCRYPTION || 'hitddendddjwtsecter',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};

module.exports = CONFIG;
