const express = require('express');
const router = express.Router();
const FichePoste = require('../models/fichePoste');
const demandeRecruteur = require('../models/demandeRecruteur');
const utilisateur = require('../models/utilisateur');
// limit access to authenticated Recruteur users
router.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    if (req.session.user.typeUtilisateur !== 'Recruteur') {
        res.redirect('/');
        return;
    }
    next();
})

router.get('/offres', (req, res) => {
    FichePoste.readAllForOrganisation(req.session.user.organisation, (err, result) => {
        res.render('recruteur/offers', {fichesPostes: result});
    })
})

router.get('/offres/:id', (req, res) => {
    FichePoste.read(req.params.id, (err, result) => {
        res.render('recruteur/offer', {fichePoste: result});
    })
})
router.get('/requests', (req, res) => {

    demandeRecruteur.readAllForOrganisation(req.session.user.organisation, (err, result) => {
        res.render('recruteur/requests', {demandesRecruteurs: result});
    })
})

router.put('/requests/', (req, res) => {
    let updateVal = {}
    updateVal.statut = req.body.statut
    updateVal.id = req.body.idDemande
    demandeRecruteur.update(updateVal)
        .then(result => {
            console.log(req.body);
            // Modification is effective, proceed with the redirection
            if (req.body.statut === 'accepte') {
                utilisateur.update({typeUtilisateur: 'Recruteur', organisation: req.body.organisation}, req.body.idUtilisateur)
            }
            res.redirect('back');
        })
        .catch(err => {
            // Handle the error appropriately
            res.status(500).send('An error occurred');
        });

});
module.exports = router;
