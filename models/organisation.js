import db from "../database";

export function create(data) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO Organisation SET ?',
            data,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
}


export function read (siren) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM Organisation WHERE siren = ?',
            [siren],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results[0]);
            }
        );
    })
}

export function update(data, siren) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE Organisation SET ? WHERE siren = ?',
            [data, siren],
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    })
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