const db = require("../database");
const Utilisateur = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO Utilisateur SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        db.query(
            'SELECT * FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    readall: (callback) => {
        db.query(
            'SELECT * FROM Utilisateur',
            [],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    update: (data, id, callback) => {
        db.query(
            'UPDATE Utilisateur SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query(
            'DELETE FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = Utilisateur;