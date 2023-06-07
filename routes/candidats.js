const express = require('express');
const router = express.Router();
const FichePoste = require('../models/fichePoste');
const Utilisateur = require("../models/utilisateur");
const Organisation = require("../models/organisation");
const demandeRecruteur = require("../models/demandeRecruteur");
const dossierCandidature = require("../models/dossierCandidature");

// limit access to authenticated candidate users
router.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    if (req.session.user.typeUtilisateur !== 'Candidat') {
        res.redirect('/');
        return;
    }
    next();
})
router.get('/', (req, res) => {
    res.redirect('/candidat/offres')
})
router.get('/offres', (req, res) => {
    // if url parameter 'sforsearch' is not empty, then search for offers
    if (req.query.sforsearch) {
        FichePoste.search(req.query.sforsearch, (err, result) => {
            res.render('candidat/offersList', {fichesPostes: result, query: req.query.sforsearch});
        })
    }
    FichePoste.readAll((err, result) => {
        res.render('candidat/offersList', {fichesPostes: result});
    })
})

router.get('/offres/:id', (req, res) => {
    FichePoste.read(req.params.id, (err, result) => {
        console.log(result)
        res.render('candidat/offer', {fichePoste: result});
    })
})

router.get('/request', (req, res) => {
    Organisation.readAll().then(result => {
        res.render('candidat/request', {
            title: 'Liste des organisations', organisations: result
        });
    }).catch(err => {
        console.log(err);
    })
})

router.get('/applications', (req, res) => {
    dossierCandidature.readAllUser(req.session.user.id).then(result => {
        res.render('candidat/applications', {
            title: 'Liste des candidatures', candidatures: result
        });
    }).catch(err => {
        console.log(err);
    })
})

router.post('/request', (req, res) => {
    let data = req.body;
    data.utilisateur = req.session.user.id;
    demandeRecruteur.create(data, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
            return;
        }
        res.redirect('/');
    })
})


module.exports = router;
