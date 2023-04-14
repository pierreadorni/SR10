const express = require('express');
const router = express.Router();
const FichePoste = require('../models/fichePoste');

router.get('/', (req, res) => {
    res.redirect('/candidat/offres')
})
router.get('/offres', (req, res) => {
    // if url parameter 'sforsearch' is not empty, then search for offers
    if(req.query.sforsearch){
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

module.exports = router;
