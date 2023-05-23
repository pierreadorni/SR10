const db = require("../database");

function create(data) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO Utilisateur SET ?',
            data,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function readByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Utilisateur WHERE email = ?',
            [email],
            (error, results, fields) => {
                if (error) reject(error);
                console.log(results);
                resolve(results[0]);
            }
        );
    })
}

function read(id) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results[0]);
            }
        );
    })
}

function search(query) {
    return new Promise((resolve, reject) => {
        // search through users by nom and prenom
        db.query(
            'SELECT * FROM Utilisateur WHERE Utilisateur.nom LIKE ? OR Utilisateur.prenom LIKE ?',
            ['%' + query + '%', '%' + query + '%'],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function readAll() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Utilisateur',
            [],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function update(data, id) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE Utilisateur SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    })
}

module.exports = {
    create,
    read,
    readByEmail,
    readAll,
    update,
    remove,
    search
}