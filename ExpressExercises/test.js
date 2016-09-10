/**
 * Created by Kristian Nielsen on 09-09-2016.
 */
var assert = require('assert')
var path = require('path')
var http = require('http')
var request = require('request')
var jokes = require(path.join(__dirname, './models/jokes.js'))
var app = require('./problem02.js')

var server;

var prefix = 'http://localhost:'
var port = 3000;

describe('Joke API', function () {

    describe('/api/joke/random', function () {
        it('Should return a random joke', function () {
            http.get((prefix + port + '/api/joke/random'), function (res) {
                var matches = false;
                var resJoke = res.read();
                jokes.allJokes.forEach(function (entry) {
                    if (resJoke == entry) matches = true;
                })

                assert.equal(matches, true)
                res.end()
            })
        })
    })
    describe('api/jokes', function(){
        it('Should return all jokes', function(){
            http.get((prefix + port + '/api/jokes'), function (res) {

                assert.equal(res.read(), jokes.allJokes)
                res.end()
            })
        })
    })
    describe('api/joke', function(){
        it('Should post a joke', function(done){
            console.log('hnng')
            var lengthBefore = jokes.allJokes.length
            var postOptions = {
                url: prefix + port + '/api/joke',
                form: {joke: 'hi mum'},
                json: true
            }
            request.post(postOptions, function(err, res, body){

                assert.equal(body, 'joke added')
                assert.equal(lengthBefore+1,jokes.allJokes.length)
                done()
            })
        })
    })
})