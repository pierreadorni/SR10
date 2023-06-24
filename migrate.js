const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

// secrets are in the .env file
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
});

console.log(`migrating to database ${process.env.MYSQL_DB} on ${process.env.MYSQL_HOST} as ${process.env.MYSQL_USER}`)
// execute the createDb.sql file
pool.getConnection((err, connection) =>{
    if (err) {
        if (err.code === "ECONNREFUSED") {
            console.error("\033[31;1m"+"Could not connect to Database, exiting..."+"\033[0m");
            process.exit(1);
        }
    }
    if (connection) {
        connection.release();
    }

    const fs = require('fs');
    const path = require('path');
    const createDb = fs.readFileSync(path.join(__dirname, 'createDb.sql'), 'utf8');
    pool.query(createDb, (error, results, fields) => {
        if (error) throw error;
        console.log("\033[32;1m"+"Database created"+"\033[0m")
        // if --test-data is passed as an argument, execute the testData.sql file
        if (process.argv[2] === "--test-data") {
            const testData = fs.readFileSync(path.join(__dirname, 'testData.sql'), 'utf8');
            pool.query(testData, (error, results, fields) => {
                if (error) throw error;
                console.log("\033[32;1m"+"Test data added"+"\033[0m")
                process.exit(0)
            });
        } else {
            process.exit(0)
        }
    });

})
