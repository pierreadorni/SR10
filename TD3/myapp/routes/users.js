var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    result = userModel.readall(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('usersList', {
            title: 'Liste des utilisateurs', users: result
        });
    });
});

module.exports = router;
