// set up ========================
var cors = require('cors');
var express  = require('express');
var app      = express();                               // create our app w/ express
// var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var session = require('express-session');

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// configuration =================
// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

console.log(__dirname);
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

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    function(req, res, next) {
        next();
    },
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

app.get('/auth/vkontakte/callback',
    function(req, res, next) {
        next();
    },
    passport.authenticate('vkontakte', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/api/auth', 
    function (req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).send();
        }
        res.send(req.user);
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");