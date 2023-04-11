var express = require('express');
var router = express.Router();
const Utilisateur = require('../models/utilisateur');

/* GET users listing. */
router.get('/', function (req, res, next) {
    Utilisateur.readAll(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/usersList', {
            title: 'Liste des utilisateurs', users: result
        });
        // res.json(result);
    });
});