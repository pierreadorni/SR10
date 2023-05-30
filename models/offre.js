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
    },
    read: (numeroOffre, callback) => {
        db.query(
            'SELECT * FROM Offre WHERE numeroOffre = ?',
            [numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    readall: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `
                        SELECT 
                            Offre.numeroOffre, 
                            Offre.dateUpload, 
                            Offre.type, 
                            FP.intitule, 
                            FP.description, 
                            FP.fourchetteBasse,
                            FP.fourchetteHaute,
                            FP.typeMetier,
                            FP.rythme,
                            Organisation.nom AS nomOrganisation,
                            FP.organisation AS sirenOrganisation
                        FROM Offre 
                        INNER JOIN FichePoste FP 
                            ON Offre.fichePoste = FP.id
                        INNER JOIN Organisation 
                            ON Organisation.siren = FP.organisation
                `
                ,
                (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        });
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