const db = require("../database");
const Offre = {
    create: (data, callback) => {
        db.query(
            'INSERT INTO Offre SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },     read: (numeroOffre, callback) => {
        db.query(
            'SELECT * FROM Offre WHERE numeroOffre = ?',
            [numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, numeroOffre, callback) => {
        db.query(
            'UPDATE Offre SET ? WHERE numeroOffre = ?',
            [data, numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (numeroOffre, callback) => {
        db.query(
            'DELETE FROM Offre WHERE numeroOffre = ?',
            [numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = Offre;