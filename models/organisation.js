const db = require("../database");

function create(data) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO Organisation SET ?',
            data,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}


function read(siren) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Organisation WHERE siren = ?',
            [siren],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results[0]);
            }
        );
    })
}

function readAll() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Organisation',
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function update(data, siren) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE Organisation SET ? WHERE siren = ?',
            [data, siren],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function remove(siren, callback) {
    db.query(
        'DELETE FROM Organisation WHERE siren = ?',
        [siren],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

module.exports = {
    create,
    read,
    readAll,
    update,
    remove
}
