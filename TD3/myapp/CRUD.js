var db = require("./database.js");
const Organisation = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO Organisation SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (siren, callback) => {
        connection.query(
            'SELECT * FROM Organisation WHERE siren = ?',
            [siren],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, siren, callback) => {
        connection.query(
            'UPDATE Organisation SET ? WHERE siren = ?',
            [data, siren],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (siren, callback) => {
        connection.query(
            'DELETE FROM Organisation WHERE siren = ?',
            [siren],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = Organisation;

const FichePoste = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO FichePoste SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        connection.query(
            'SELECT * FROM FichePoste WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        connection.query(
            'UPDATE FichePoste SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        connection.query(
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

const Utilisateur = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO Utilisateur SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        connection.query(
            'SELECT * FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        connection.query(
            'UPDATE Utilisateur SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        connection.query(
            'DELETE FROM Utilisateur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = Utilisateur;


const Offre = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO Offre SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (numeroOffre, callback) => {
        connection.query(
            'SELECT * FROM Offre WHERE numeroOffre = ?',
            [numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, numeroOffre, callback) => {
        connection.query(
            'UPDATE Offre SET ? WHERE numeroOffre = ?',
            [data, numeroOffre],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (numeroOffre, callback) => {
        connection.query(
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

const DossierCandidature = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO DossierCandidature SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        connection.query(
            'SELECT * FROM DossierCandidature WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        connection.query(
            'UPDATE DossierCandidature SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        connection.query(
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

const Document = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO Document SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        connection.query(
            'SELECT * FROM Document WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        connection.query(
            'UPDATE Document SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        connection.query(
            'DELETE FROM Document WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    }
};

module.exports = Document;


const demandeRecruteur = {
    create: (data, callback) => {
        connection.query(
            'INSERT INTO demandeRecruteur SET ?',
            data,
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    read: (id, callback) => {
        connection.query(
            'SELECT * FROM demandeRecruteur WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results[0]);
            }
        );
    },
    update: (data, id, callback) => {
        connection.query(
            'UPDATE demandeRecruteur SET ? WHERE id = ?',
            [data, id],
            (error, results, fields) => {
                if (error) throw error;
                return callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        connection.query(
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