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
    search: (query, callback) => {
        db.query(
            'SELECT * FROM FichePoste WHERE FichePoste.intitule LIKE ?',
            ['%' + query + '%'],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    readAll: (callback) => {
        db.query(
            // 'SELECT Organisation.nom FROM FichePoste, Organisation WHERE FichePoste.organisation = Organisation..siren',
            'SELECT * FROM FichePoste INNER JOIN Organisation O on FichePoste.organisation = O.siren',
            [],
            (error, results, fields) => {
                if (error) throw error;
                results = results.map(function (result) {
                    result.organisation = {
                        siren: result.siren,
                        nom: result.nom,
                        rue: result.rue,
                        codePostal: result.codePostal,
                        ville: result.ville,
                        region: result.region,
                        pays: result.pays,
                    }
                    delete result.siren;
                    delete result.nom;
                    delete result.rue;
                    delete result.codePostal;
                    delete result.ville;
                    delete result.region;
                    delete result.pays;
                    return result
                })
                console.log(results);
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