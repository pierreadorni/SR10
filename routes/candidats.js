const express = require('express');
const router = express.Router();
const Utilisateur = require("../models/utilisateur");
const Organisation = require("../models/organisation");
const demandeRecruteur = require("../models/demandeRecruteur");
const dossierCandidature = require("../models/dossierCandidature");
const offre = require("../models/offre");
const sha256 = require("sha256");
const multer = require("multer");
const {application} = require("express");
const FichierCandidature = require("../models/fichierCandidature");
const uuid = require("uuid").v4;
const fs = require("fs");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, uuid() + '.' + extension)
    }
})
const upload = multer({storage: storage})

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
    } else {
        offre.readall().then(result => {
            res.render('candidat/offersList', {
                title: 'Liste des offres', offres: result
            });
        }).catch(err => {
            console.log(err);
        })
    }
})

router.get('/offre/:id', (req, res) => {
    offre.read(req.params.id).then(result => {
        dossierCandidature.getFromUserAndOffer(req.session.user.id, req.params.id).then(resultDossier => {
            res.render('candidat/offer', {offre: result[0], application: resultDossier});
        })
    })
})


router.post('/apply/:offerId', (req, res) => {
    dossierCandidature.create({
        utilisateur: req.session.user.id,
        offre: req.params.offerId,
        dateCandidature: new Date(),
        statut: 'brouillon'
    }).then(result => {
        res.redirect('/candidat/apply/' + result.insertId);
    })
})

router.get('/apply/:applicationId', (req, res) => {
    dossierCandidature.read(req.params.applicationId).then(resultDossier => {
        switch (resultDossier.statut) {
            case 'brouillon':
                dossierCandidature.fichiers(req.params.applicationId).then(resultFichiers => {
                    offre.read(resultDossier.offre).then(result => {
                        res.render('candidat/application-brouillon', {
                            offre: result[0],
                            application: resultDossier,
                            fichiers: resultFichiers
                        });
                    })
                })
                break;
            case 'en attente de traitement':
                dossierCandidature.fichiers(req.params.applicationId).then(resultFichiers => {
                    offre.read(resultDossier.offre).then(result => {
                        res.render('candidat/application-en-attente', {
                            offre: result[0],
                            application: resultDossier,
                            fichiers: resultFichiers
                        });
                    })
                })
                break;
            case 'refusé':
                offre.read(resultDossier.offre).then(result => {
                    res.render('candidat/application-refuse', {offre: result[0], application: resultDossier});
                })
                break;
            case 'accepté':
                offre.read(resultDossier.offre).then(result => {
                    res.render('candidat/application-accepte', {offre: result[0], application: resultDossier});
                })
                break;
            default:
                res.redirect('/candidat/offres');
        }
    })
})
router.post('/apply/:applicationId/upload', upload.single('file'), (req, res) => {
    FichierCandidature.create({
        dossierCandidature: req.params.applicationId,
        dateUpload: new Date(),
        path: req.file.path,
        originalname: req.file.originalname,
    }).then(result => {
        res.status(201).json({
            path: req.file.path,
            originalName: req.file.originalname,
        });
    }).catch(err => {
        res.status(500).json({error: err});
    })
})

router.delete('/apply/:applicationId/file/:fileId', (req, res) => {
    FichierCandidature.read(req.params.fileId).then(result => {
        fs.unlink(result.path, (err) => {
            if (err) res.status(500).json({error: err});
            FichierCandidature.delete(req.params.fileId).then(result => {
                console.log(result);
                res.status(204).json({});
            }).catch(err => {
                res.status(500).json({error: err});
            })
        })
    })
})

router.post('/apply/:applicationId/validate', (req, res) => {
    console.log(req.params)
    dossierCandidature.update({statut: 'en attente de traitement'}, req.params.applicationId).then(result => {
        res.redirect('/candidat/applications');
    }).catch(err => {
        console.log(err);
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
    res.render('candidat/account', {title: 'Mon compte', user: req.session.user});
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
