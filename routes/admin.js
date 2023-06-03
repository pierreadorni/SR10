const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur');
const FichePoste = require("../models/fichePoste");
const Organisation = require("../models/organisation");
const sha256 = require('sha256');

// limit access to authenticated Administrator users
router.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    if (req.session.user.typeUtilisateur !== 'Administrateur') {
        res.redirect('/');
        return;
    }
    next();
})

/* GET users listing. */
router.get('/users', function (req, res, next) {
    if (req.query.sforsearch) {
        Utilisateur.search(req.query.sforsearch).then(result => {
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
    Promise.all([
        Utilisateur.read(req.params.id),
        Organisation.readAll()
    ]).then(([user, organizations]) => {
        res.render('admin/user', {
            title: 'Utilisateur',
            user: user,
            organisations: organizations
        });
    }).catch(error => {
        // Handle the error
        next(error);
    });
});


router.delete('/users/:id', function (req, res, next) {
    Utilisateur.remove(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

router.put('/users/:id', function (req, res, next) {
    const formData = req.body;
    // for each entry in formData, if the value is empty, delete the key
    for (let key in formData) {
        if (formData[key] === '') {
            delete formData[key];
        }
    }
    // if the password is not empty, hash it
    if (formData.password) {
        formData.mdpHash = sha256(formData.password);
        delete formData.password;
    }
    Utilisateur.update(formData, parseInt(req.params.id)).then(result => {
        // return updated code
        res.status(200).json(result);
    });
})

module.exports = router;