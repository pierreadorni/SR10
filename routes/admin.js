const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur');
const FichePoste = require("../models/fichePoste");

/* GET users listing. */
router.get('/users', function (req, res, next) {
    if (req.query.sforsearch) {
        Utilisateur.search.then(result => {
            res.render('admin/usersList', {users: result, query: req.query.sforsearch});
        })
    }

    Utilisateur.readAll().then(result => {
        res.render('admin/usersList', {
            title: 'Liste des utilisateurs', users: result
        });
    }).catch(err => {
        console.log(err);
    })
});

router.get('/users/:id', function (req, res, next) {
    Utilisateur.read(req.params.id).then(result => {
        res.render('admin/user', {
            title: 'Utilisateur', user: result
        });
    });
})

router.put('/users/:id', function (req, res, next) {
    const formData = req.body;
    console.log()
    Utilisateur.update(req.body, parseInt(req.params.id)).then(result => {
        res.redirect('/admin/users');
    });
})

module.exports = router;