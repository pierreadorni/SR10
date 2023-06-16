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
    readAllForOrganisation: (organisation, callback) => {
        db.query(
            `SELECT Utilisateur.nom,
                Utilisateur.prenom,
                Utilisateur.email,
                demandeRecruteur.dateDemande,
                demandeRecruteur.statut,
                demandeRecruteur.id AS idDemande,
                Utilisateur.id AS idUtilisateur,
                demandeRecruteur.organisation
         FROM demandeRecruteur
              INNER JOIN Utilisateur
                     ON demandeRecruteur.utilisateur = Utilisateur.id
         WHERE demandeRecruteur.organisation = ?`,
            [organisation], // Place the array of parameters here, after the query string
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE demandeRecruteur SET statut = ? WHERE id = ?',
                [data.statut, data.id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
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