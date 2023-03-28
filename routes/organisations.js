import db from '../database.js';


export function getOrganisations(req, res) {
    const request = "SELECT * FROM Organisation"
    db.query(request, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
}


export function insertOrganisation(req, res) {
    res.send(req.body)
    // const request = ""
}