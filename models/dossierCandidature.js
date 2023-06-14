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
    readAllUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = `
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
                FP.localisation,
                Organisation.nom AS nomOrganisation,
                FP.organisation AS sirenOrganisation,
                DC.dateCandidature,
                DC.statut,
                DC.id
            FROM Offre 
            INNER JOIN FichePoste FP 
                ON Offre.fichePoste = FP.id
            INNER JOIN Organisation 
                ON Organisation.siren = FP.organisation
            INNER JOIN DossierCandidature DC
                ON DC.offre = Offre.numeroOffre
            WHERE DC.utilisateur = ?`;
            db.query(query, [user], (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    },
    readAllOffre: (offerId) => {
        return new Promise((resolve, reject) => {
            console.log("ici");
            const query = `
        SELECT 
            DC.*,
            Utilisateur.nom AS nomUtilisateur,
            Utilisateur.prenom AS prenomUtilisateur,
            Utilisateur.email AS emailUtilisateur
        FROM DossierCandidature DC
        INNER JOIN Utilisateur
            ON DC.utilisateur = Utilisateur.id
        WHERE DC.offre = ?`;
            db.query(query, [offerId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
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
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM DossierCandidature WHERE id = ?',
                [id],
                (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        });
    }
};

module.exports = DossierCandidature;