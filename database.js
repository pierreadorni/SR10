import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "SR10"
});



export default con;