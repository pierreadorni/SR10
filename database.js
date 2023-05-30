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
// test the connection
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "ECONNREFUSED") {
            // console.error("\033[31;1m"+"Could not connect to Database, exiting..."+"\033[0m");
            process.exit(1);
        }
    }
    if (connection) connection.release();
    // console.log("\033[32;1m"+"Connected to Database"+"\033[0m")
});
module.exports = pool;
