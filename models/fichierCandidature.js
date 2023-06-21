const db = require("../database");

const FichierCandidature = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO FichierCandidature SET ?',
                data,
                (error, results, fields) => {
                    if (error) reject(error);
                    return resolve(results);
                }
            );
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM FichierCandidature WHERE id = ?',
                [id],
                (error, results, fields) => {
                    if (error) reject(error);
                    return resolve(results);
                }
            );
        })
    },
    read: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM FichierCandidature WHERE id = ?',
                [id],
                (error, results, fields) => {
                    if (error) reject(error);
                    if (results.length === 0) return resolve(null);
                    return resolve(results[0]);
                }
            );
        })
    }
}

module.exports = FichierCandidature;