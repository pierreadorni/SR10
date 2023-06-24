const db = require("../database");
const DossierCandidature = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO DossierCandidature SET ?',
                data,
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
                `
                    SELECT DC.*, FP.organisation, U.nom AS nomUtilisateur, U.prenom AS prenomUtilisateur, U.email AS emailUtilisateur
                    FROM DossierCandidature DC
                    INNER JOIN Offre O on DC.offre = O.numeroOffre
                    INNER JOIN FichePoste FP on O.fichePoste = FP.id
                    INNER JOIN Utilisateur U on DC.utilisateur = U.id
                    WHERE DC.id = ?`,
                [id],
                (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results[0]);
                }
            );
        })
    },
    fichiers: (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM FichierCandidature WHERE dossierCandidature = ?',
                [id],
                (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results);
                }
            );
      })
    },
    readAllUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                Offre.numeroOffre, 
                Offre.dateUpload, 
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
            const query = `
        SELECT 
            DC.*,
            Utilisateur.nom AS nomUtilisateur,
            Utilisateur.prenom AS prenomUtilisateur,
            Utilisateur.email AS emailUtilisateur,
            FP.organisation
        FROM DossierCandidature DC
        INNER JOIN Utilisateur
            ON DC.utilisateur = Utilisateur.id
        INNER JOIN Offre
            ON DC.offre = Offre.numeroOffre
        INNER JOIN FichePoste FP
            ON Offre.fichePoste = FP.id
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
    getFromUserAndOffer: (user, offer) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                DC.*,
                Utilisateur.nom AS nomUtilisateur,
                Utilisateur.prenom AS prenomUtilisateur,
                Utilisateur.email AS emailUtilisateur,
                FP.organisation
            FROM DossierCandidature DC
            INNER JOIN Utilisateur
                ON DC.utilisateur = Utilisateur.id
            INNER JOIN Offre
                ON DC.offre = Offre.numeroOffre
            INNER JOIN FichePoste FP
                ON Offre.fichePoste = FP.id
            WHERE DC.offre = ? AND DC.utilisateur = ?`;
            db.query(query, [offer, user], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(results);
                    resolve(results[0]);
                }
            });
        });
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE DossierCandidature SET ? WHERE id = ?',
                [data, id],
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