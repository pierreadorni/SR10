const express = require('express');
const router = express.Router();
const demandeRecruteur = require('../models/demandeRecruteur');
const utilisateur = require('../models/utilisateur');
const dossierCandidature = require('../models/dossierCandidature');
const offre = require('../models/offre');
const sha256 = require("sha256");
const Utilisateur = require("../models/utilisateur");
// limit access to authenticated Recruteur users
const fichierCandidature = require("../models/fichierCandidature");
const FichePoste = require("../models/fichePoste");


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
    if (req.query.sforsearch) {
        offre.searchForOrganisation(req.query.sforsearch, req.session.user.organisation, (err, result) => {
            res.render('candidat/offersList', {offres: result, query: req.query.sforsearch});
        })
    } else {
        offre.readAllForOrganisation(req.session.user.organisation, (err, result) => {
            res.render('recruteur/offers', {offres: result});
        })
    }
})

router.get('/offre/:id', (req, res) => {
    offre.read(req.params.id).then(result => {
        // Check that session org is the same as the org of the offer
        if (result[0].sirenOrganisation !== req.session.user.organisation) {
            if (!res.headersSent) { // Check if headers have already been sent
                // Display an alert message
                res.send('<script>alert("You are not authorized to access this offer."); window.location.href="/recruteur/offres";</script>');
            }
            return;
        }
        res.render('recruteur/offer', { req: req, offre: result[0] });
    });
});
router.get('/applications/:id/', (req, res) => {
    dossierCandidature.readAllOffre(req.params.id)
        .then(result => {
            // Check that result is not empty
            if (result.length === 0) {
                // Handle the case where result is empty
                // For example, you could send an error message to the client
                res.status(404).send('No offer found with the given ID');
                return;
            }
            // Check that session org is the same as the org of the offer
            if (result[0].organisation !== req.session.user.organisation) {
                if (!res.headersSent) { // Check if headers have already been sent
                    // Display an alert message
                    res.send('<script>alert("You are not authorized to access this offer."); window.location.href="/recruteur/offres";</script>');
                }
                return;
            }
            res.render('recruteur/applications', { req: req, candidatures: result });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500); // or handle the error appropriately
        });
});

router.get('/application/:id', (req, res) => {
    dossierCandidature.read(req.params.id)
        .then(result => {
            // Check that session org is the same as the org of the offer
            if (result.organisation !== req.session.user.organisation) {
                if (!res.headersSent) { // Check if headers have already been sent
                    // Display an alert message
                    res.send('<script>alert("You are not authorized to access this offer."); window.location.href="/recruteur/offres";</script>');
                }
                return;
            }
            offre.read(result.offre).then(offreResult => {
                dossierCandidature.fichiers(req.params.id).then(files => {
                    res.render('recruteur/application', {
                        offre: offreResult[0],
                        application: result,
                        fichiers: files
                    });
                })
            })
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500); // or handle the error appropriately
        });
})

router.put('/application/:id', (req, res) => {
    // check if the user is allowed to access this application
    dossierCandidature.read(req.params.id).then(result => {
        if (result.organisation !== req.session.user.organisation) {
            res.sendStatus(403);
            return;
        }
        // check if the application is in accepté or refusé
        if (result.statut === 'accepté' || result.statut === 'refusé') {
            res.sendStatus(403);
            return;
        }
        dossierCandidature.update(req.body,req.params.id).then(result => {
            res.status(200).send('OK');
        }).catch(err => {
            console.error(err);
            res.sendStatus(500); // or handle the error appropriately
        });
    })
})
router.get('/requests', (req, res) => {
    demandeRecruteur.readAllForOrganisation(req.session.user.organisation, (err, result) => {
        res.render('recruteur/requests', {demandesRecruteurs: result});
    })
})

router.put('/requests/', (req, res) => {
    let updateVal = {};
    updateVal.statut = req.body.statut;
    updateVal.id = req.body.idDemande;
    demandeRecruteur.update(updateVal)
        .then(result => {
            // Modification is effective, proceed with the redirection
            if (req.body.statut === 'accepte') {
                utilisateur.update({ typeUtilisateur: 'Recruteur', organisation: req.body.organisation }, req.body.idUtilisateur);
            }
            res.status(200).send('OK');
        })
        .catch(err => {
            // Handle the error appropriately
            res.status(500).send('An error occurred');
        });
});

router.get('/createOffer', (req, res) => {
    FichePoste.readAllForOrganisation(req.session.user.organisation, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            res.render('recruteur/createOffer', { fichesPoste: result });
        }
    });
});

router.post('/createOffer', (req, res) => {
    const formData = req.body;
    offre.create(formData, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/recruteur/offres');
        }
    });
});

router.get('/createFiche', (req, res) => {
    res.render('recruteur/createFiche');
});

router.post('/createFiche', (req, res) => {
    const formData = req.body;
    formData.organisation = req.session.user.organisation;
    FichePoste.create(formData, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/recruteur/createOffer');
        }
    });
});


router.get('/account', (req, res) => {
    res.render('recruteur/account', { title: 'Mon compte', user: req.session.user });
});
router.put('/account', function (req, res, next) {
    const formData = req.body;

    formData.typeUtilisateur = "Recruteur"
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
    Utilisateur.update(formData, parseInt(req.session.user.id)).then(result => {
        //update session user
        req.session.user = Object.assign(req.session.user, formData);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;
