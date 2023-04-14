const mysql = require("mysql2");

// secrets are in the .env file
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

console.log(`connecting to database ${process.env.MYSQL_DB} on ${process.env.MYSQL_HOST} as ${process.env.MYSQL_USER}`)
module.exports = pool;
