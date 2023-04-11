const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur');

/* GET users listing. */
router.get('/users', function (req, res, next) {
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