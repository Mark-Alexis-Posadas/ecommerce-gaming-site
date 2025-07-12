require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('./environment');

//connection pool
const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    port: config.DB_PORT,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000
});

module.exports = pool;