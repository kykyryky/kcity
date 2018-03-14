// set up ========================
const cors = require('cors');
const express  = require('express');
const app      = express();                               // create our app w/ express
const http = require('http');
const https = require('https');
const fs = require('fs');

const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const session = require('express-session');
const passport = require('passport');
const multer  = require('multer');

const privateKey  = fs.readFileSync('./server/server.key', 'utf8');
const certificate = fs.readFileSync('./server/server.crt', 'utf8');

const router = express.Router();

const mongoose = require('mongoose');                     // mongoose for mongodb
mongoose.connect('mongodb://localhost:27017/kirovsk');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/../dist'));                // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

// passport
app.use(session({
        secret: "enter custom sessions secret here",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new VKontakteStrategy(
    {
        clientID:     '6343828', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: 'tGS682hVEeHVIkWX5sNr',
        callbackURL:  "http://localhost:8080/auth/vkontakte/callback"
    },
    function (accessToken, refreshToken, params, profile, cb) {
        return cb(null, profile);
    }
));

passport.use(new FacebookStrategy({
        clientID: '168094067146230',
        clientSecret: '95f55a04f7f2902430cb85c9ee1be418',
        callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    return done(null, {username, password});
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
    function(req, res, next) {
        next();
    },
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback',
    function(req, res, next) {
        next();
    },
    passport.authenticate('vkontakte', { failureRedirect: '/' }),
    function(req, res) {        
        res.redirect('/');
    });

router.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        res.send(req.user);
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/api/auth', function (req, res) {
    if (!req.isAuthenticated()) {
        res.status(401).send();
    }
    res.send(req.user);
});

app.use(router);
app.use(require('./topic'));
app.use(require('./upload'));

// listen (start app with node server.js) ======================================
http.createServer(app).listen(8080);

https.createServer({key: privateKey, cert: certificate}, app).listen(8081);