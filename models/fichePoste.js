const db = require("../database");
const FichePoste = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO FichePoste SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        db.query(
            'SELECT * FROM FichePoste WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    readAll: (callback) => {
        db.query(
            'SELECT * FROM FichePoste',
            [],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        )
    },
    update: (data, id, callback) => {
        db.query(
            'UPDATE FichePoste SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query(
            'DELETE FROM FichePoste WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = FichePoste;