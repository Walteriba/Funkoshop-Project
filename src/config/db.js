const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool(
    { 
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 100, 
        idleTimeout: 60000, 
        queueLimit: 0,
      }
);

module.exports = {
    conn: pool.promise()
};

