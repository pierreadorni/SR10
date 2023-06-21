const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes');
const candidatsRouter = require('./routes/candidats');
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    // secret: require('crypto').randomBytes(32).toString('hex'),
    secret: "chèvre", // same secret after restart to keep sessions alive during development
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static('uploads'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// make sure any unauthenticated user is redirected to login page unless the url is prefixed with /api
app.use((req, res, next) => {
    if (!req.session.user && req.url !== '/login' && req.url !== '/register' && !req.url.startsWith('/api')) {
        res.redirect('/login')
    } else {
        next()
    }
})

app.use('/', indexRouter);
app.use('/candidat', candidatsRouter);
app.use('/admin', require('./routes/admin'));
app.use('/recruteur', require('./routes/recruteur'));
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
