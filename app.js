var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var indexRouter = require('./routes');
var candidatsRouter = require('./routes/candidats');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session with 32 chars random secret
app.use(session({
    secret: require('crypto').randomBytes(32).toString('hex'),
    resave: false,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make sure any unauthenticated user is redirected to login page
app.use((req, res, next) => {
    if (!req.session.user && req.url !== '/login' && req.url !== '/register') {
        res.redirect('/login')
    } else {
        next()
    }
})

app.use('/', indexRouter);
app.use('/candidat', candidatsRouter);
app.use('/admin', require('./routes/admin'));
app.use('/recruteur', require('./routes/recruteur'));

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
