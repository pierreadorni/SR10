const db = require("../database");
const DossierCandidature = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO DossierCandidature SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        db.query(
            'SELECT * FROM DossierCandidature WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        db.query(
            'UPDATE DossierCandidature SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query(
            'DELETE FROM DossierCandidature WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = DossierCandidature;