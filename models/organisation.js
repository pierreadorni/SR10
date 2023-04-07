import db from "../database";

export function create(data, callback) {
    db.query(
        'INSERT INTO Organisation SET ?',
        data,
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}


export function read (siren, callback) {
    db.query(
        'SELECT * FROM Organisation WHERE siren = ?',
        [siren],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results[0]);
        }
    );
}

export function update(data, siren, callback) {
    db.query(
        'UPDATE Organisation SET ? WHERE siren = ?',
        [data, siren],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}

export function remove(siren, callback) {
    db.query(
        'DELETE FROM Organisation WHERE siren = ?',
        [siren],
        (error, results, fields) => {
            if (error) throw error;
            return callback(null, results);
        }
    );
}