const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur');
const FichePoste = require("../models/fichePoste");

/* GET users listing. */
router.get('/users', function (req, res, next) {
    if (req.query.sforsearch) {
        Utilisateur.search(req.query.sforsearch, (err, result) => {
                res.render('admin/usersList', {users: result, query: req.query.sforsearch});
            }
        )
    }

    Utilisateur.readAll(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        res.render('admin/usersList', {
            title: 'Liste des utilisateurs', users: result
        });
    });
});

router.get('/users/:id', function (req, res, next) {
    Utilisateur.read(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/user', {
            title: 'Utilisateur', user: result
        });
    });
})

module.exports = router;