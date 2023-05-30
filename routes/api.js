const express = require("express");

const router = express.Router();
const Offre = require("../models/offre");
const cors = require('cors')

router.get('/offers', cors(), function (req, res, next) {
    const result = Offre.readall()
        .then(result => {
            res.status(200).json(result);
        })
});

module.exports = router;