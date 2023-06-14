const express = require('express');
const router = express.Router();
const Utilisateur = require("../models/utilisateur");
const Organisation = require("../models/organisation");
const demandeRecruteur = require("../models/demandeRecruteur");
const dossierCandidature = require("../models/dossierCandidature");
const offre = require("../models/offre");
const sha256 = require("sha256");

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
        offre.search(req.query.sforsearch, (err, result) => {
            res.render('candidat/offersList', {offres: result, query: req.query.sforsearch});
        })
    }
    offre.readall().then(result => {
        res.render('candidat/offersList', {
            title: 'Liste des offres', offres: result
        });
    }).catch(err => {
        console.log(err);
    })
})

router.get('/offre/:id', (req, res) => {
    offre.read(req.params.id, (err, result) => {
        console.log(result);
        res.render('candidat/offer', {offre: result[0]});
    })
})

router.get('/apply/:id', (req, res) => {
    offre.read(req.params.id, (err, result) => {
        console.log(result);
        res.render('candidat/apply', {offre: result[0]});
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

router.get('/account', (req, res) => {
    res.render('candidat/account', { title: 'Mon compte', user: req.session.user });
});


router.get('/applications', (req, res) => {
    dossierCandidature.readAllUser(req.session.user.id).then(result => {
        res.render('candidat/applications', {
            title: 'Liste des candidatures', candidatures: result
        });
    }).catch(err => {
        console.log(err);
    })
})
//We use a put request to delete the application since delete request does'nt support body
router.delete('/applications', (req, res) => {
    dossierCandidature.delete(req.body.id).then(result => {
        res.status(200).json(result);
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

router.put('/account', function (req, res, next) {
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

    Utilisateur.update(formData, parseInt(req.session.user.id)).then(result => {
        //update session user
        req.session.user = Object.assign(req.session.user, formData);
        res.status(200).json(result);
}).catch(err => {
        console.log(err);
    });
})

module.exports = router;
