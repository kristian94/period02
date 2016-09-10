/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
var express = require("express");
var path = require('path')
var bodyParser = require("body-parser");
var app = express();
var jokes = require('./models/jokes.js')
var session = require('express-session')

var title = 'JokeCentral: The #1 Source For Lame Jokes ;-)'

session.rndJokeVisistedCount = 0
session.allJokesVisitedeCount = 0
session.addJokeVisistedCount = 0

// SETTINGS

app.set('view engine', 'ejs')
app.set('vews', path.join(__dirname, 'views'))
app.set('models', path.join(__dirname, 'models'))

// MIDDLEWARE

app.use(bodyParser())
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

// API

app.get('/api/joke/random', function(req, res){
    res.write(jokes.getRandomJoke())
    res.end()
})

app.get('/api/jokes', function(req, res){
    res.write(JSON.stringify(jokes.allJokes))
    res.end()
})

app.post('/api/joke', function(req, res){
    jokes.addJoke(req.read())
    res.write('joke added')
    res.end()
})



// API END

app.use(function(req, res, next){

    if(req.session.username){
        next()
    }else if(req.body.username){
        req.session.username = req.body.username
        res.redirect('/')
    }else{
        req.url = '/login'
        next()
    }





})



// ROUTES

app.get('/randomjoke', function(req, res){
    res.render('randomjoke', {
        title: title,
        jokes: jokes
    })
    req.session.rndJokeVisistedCount++

})

app.get('/login', function(req, res){
    res.render('login', {
        title: title
    })
})

app.get('/', function(req, res){
    res.render('index', {
        title: title,
        username: req.session.username
    })
})

app.get('/randomjoke', function(req, res){
    res.render('randomjoke', {
        title: title,
        jokes: jokes
    })
    req.session.rndJokeVisistedCount++

})

app.get('/alljokes', function(req, res){
    res.render('alljokes', {
        title: title,
        jokes: jokes
    })
    req.session.allJokesVisitedeCount++

})

app.get('/addjoke', function(req, res){
    res.render('addjoke', {
        title: title,
        jokes: jokes
    })
})

app.post('/add', function(req, res){
    var newJoke = req.body.newJoke;
    jokes.addJoke(newJoke)
    res.redirect('/alljokes')
    req.session.addJokeVisistedCount++
})

app.listen(3000, function () {
    console.log("Server started, listening on: " + 3000);
})