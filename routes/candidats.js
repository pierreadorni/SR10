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

module.exports = router;
