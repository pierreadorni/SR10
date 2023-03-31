var mysql = require("mysql");
var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "ai16pxxxx",
    password: "**********",
    database: "ai16pxxx"
});
module.exports = pool;
