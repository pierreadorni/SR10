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

function readAllValidated() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Organisation WHERE validated = ?',
            [true],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function readAllUnValidated() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Organisation WHERE validated = ?',
            [false],
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

function remove(siren) {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM Organisation WHERE siren = ?',
            [siren],
            (error, results, fields) => {
                if (error) reject(error);
                return resolve(results);
            }
        );
    })
}

module.exports = {
    create,
    read,
    readAll,
    readAllValidated,
    readAllUnValidated,
    update,
    remove
}
