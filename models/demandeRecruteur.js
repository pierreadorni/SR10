const db = require("../database");
const demandeRecruteur = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO demandeRecruteur SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        db.query(
            'SELECT * FROM demandeRecruteur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        db.query(
            'UPDATE demandeRecruteur SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query(
            'DELETE FROM demandeRecruteur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = demandeRecruteur;