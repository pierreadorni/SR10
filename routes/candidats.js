const express = require('express');
const router = express.Router();
const FichePoste = require('../models/fichePoste');

router.get('/', (req, res) => {
    res.redirect('/candidat/offres')
})
router.get('/offres', (req, res) => {
    FichePoste.readAll((err, result) => {
        res.render('candidat/offersList', {fichesPostes: result});
    })
})

router.get('/offres/:id', (req, res) => {
    FichePoste.read(req.params.id, (err, result) => {
        res.render('candidat/offer', {fichePoste: result});
    })
})

module.exports = router;
