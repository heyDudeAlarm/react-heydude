const mariadb = require('mariadb');
require('dotenv').config({
    path: '../.env'
});

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 5
});

module.exports = pool;