const express = require('express');
const router = express.Router();
const demandeRecruteur = require('../models/demandeRecruteur');
const utilisateur = require('../models/utilisateur');
const dossierCandidature = require('../models/dossierCandidature');
const offre = require('../models/offre');
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
    offre.readAllForOrganisation(req.session.user.organisation, (err, result) => {
        res.render('recruteur/offers', {offres: result});
    })
})

router.get('/offre/:id', (req, res) => {
    offre.read(req.params.id, (err, result) => {
        res.render('recruteur/offer', {req: req, offre: result[0]});
    })
})

router.get('/applications/:id/', (req, res) => {
    dossierCandidature.readAllOffre(req.params.id)
        .then(result => {
            console.log(result);
            res.render('recruteur/applications', { req: req, candidatures: result });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500); // or handle the error appropriately
        });
});
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
