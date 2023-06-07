const express = require('express');
const Utilisateur = require("../models/utilisateur");
const router = express.Router();
const sha256 = require('sha256');

// home page.
router.get('/', function (req, res, next) {
    // if the user is not authenticated, redirect to login page
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    // if the user type is candidat, redirect to offers page
    if (req.session.user.typeUtilisateur === 'Candidat') {
        res.redirect('/candidat/offres');
        return;
    }
    // if the user type is admin, redirect to users page
    if (req.session.user.typeUtilisateur === 'Administrateur') {
        res.redirect('/admin/users');
        return;
    }
    // if the user type is recruiter, redirect to offers page
    if (req.session.user.typeUtilisateur === 'Recruteur') {
        res.redirect('/recruteur/offres')
    }

});


// Login page
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login', function (req, res, next) {
    // get the user and pass from the post form
    const email = req.body.email;
    const pass = req.body.password;

    Utilisateur.readByEmail(email).then( user=> {
        if (user && user.mdpHash === sha256(pass)){
            req.session.user = user;
            // redirect to the home page
            res.redirect('/');
        } else {
            // if the user is not found or the password is incorrect, redirect to login page with error message
            res.status(401);
            res.render('login', {title: 'Login'});
        }
    })
})


// Register page
router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register'});
})

router.post('/register', function (req, res, next) {
    const data = {
        email: req.body.email,
        mdpHash: sha256(req.body.password),
        nom: req.body.lastname,
        prenom: req.body.firstname,
        statutCompte: 'actif',
        typeUtilisateur: 'candidat',
        dateCreation: new Date(),
    }
    Utilisateur.create(data, (error, user) => {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect('/login');
    })
})

// Logout route
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
})



module.exports = router;
