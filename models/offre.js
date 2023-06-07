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
    read: (offerId, callback) => {
        db.query(
            `
            SELECT Offre.numeroOffre,
                   Offre.dateUpload,
                   Offre.type,
                   COUNT(DC.id) AS nbCandidatures,
                   FP.intitule,
                   FP.description,
                   FP.fourchetteBasse,
                   FP.fourchetteHaute,
                   FP.typeMetier,
                   FP.rythme,
                   FP.localisation,
                   Organisation.nom AS nomOrganisation,
                   FP.organisation AS sirenOrganisation
            FROM Offre
            INNER JOIN FichePoste FP ON Offre.fichePoste = FP.id
            INNER JOIN Organisation ON Organisation.siren = FP.organisation
            INNER JOIN DossierCandidature DC ON Offre.numeroOffre = DC.offre
            WHERE Offre.numeroOffre = ?
            GROUP BY Offre.numeroOffre
        `,
            [offerId],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },

    readAllForOrganisation: (siren, callback) => {
        db.query(
            `
                SELECT Offre.numeroOffre,
                       Offre.dateUpload,
                       Offre.type,
                       COUNT(DC.id) AS nbCandidatures,
                       FP.intitule,
                       FP.description,
                       FP.fourchetteBasse,
                       FP.fourchetteHaute,
                       FP.typeMetier,
                       FP.rythme,
                       FP.localisation,
                       Organisation.nom AS nomOrganisation,
                       FP.organisation  AS sirenOrganisation
                FROM Offre
                         INNER JOIN FichePoste FP
                                    ON Offre.fichePoste = FP.id
                         INNER JOIN Organisation
                                    ON Organisation.siren = FP.organisation
                         INNER JOIN DossierCandidature DC on Offre.numeroOffre = DC.offre
                WHERE FP.organisation = ?
                GROUP BY Offre.numeroOffre
                
            `,
            [siren],
                (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },


    readall: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `
                    SELECT Offre.numeroOffre,
                           Offre.dateUpload,
                           Offre.type,
                           FP.intitule,
                           FP.description,
                           FP.fourchetteBasse,
                           FP.fourchetteHaute,
                           FP.typeMetier,
                           FP.rythme,
                           Organisation.nom AS nomOrganisation,
                           FP.organisation  AS sirenOrganisation
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