const db = require("../database");

function create(data, callback) {
    db.query(
        'INSERT INTO Utilisateur SET ?',
        data,
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

function read(email, callback) {
    db.query(
        'SELECT * FROM Utilisateur WHERE email = ?',
        [email],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results[0]);
        }
    );
}

function search(query, callback) {
    // search through users by nom and prenom
    db.query(
        'SELECT * FROM Utilisateur WHERE Utilisateur.nom LIKE ? OR Utilisateur.prenom LIKE ?',
        ['%' + query + '%', '%' + query + '%'],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

function readAll(callback) {
    db.query(
        'SELECT * FROM Utilisateur',
        [],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

function update(data, id, callback) {
    db.query(
        'UPDATE Utilisateur SET ? WHERE id = ?',
        [data, id],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

function remove(id, callback) {
    db.query(
        'DELETE FROM Utilisateur WHERE id = ?',
        [id],
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
    remove,
    search
}