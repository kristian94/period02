var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var app = express();

var todoItems = [
    {id: 1, desc:'Idk'},
    {id: 2, desc:'more stuff'}]


// configure app

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// use middleware

app.use(function (req, res, next){
    console.log(req.method + " " + req.url + " " + (new Date()))

    next()
})

app.use(express.static(path.join(__dirname, 'bower_components')))

app.use(bodyParser())



// define routes


app.get('/', function(req, res){
    res.render('index', {
        title: 'My App',
        items: todoItems
    })
})

app.post('/add', function(req, res){
    var newItem = req.body.newItem
    todoItems.push({
        id: todoItems.length+1,
        desc: newItem
    })

    res.redirect('/')
})



app.listen(1337, function(){
    console.log('ready on port 1337')
})










// var http = require('http')
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'})
//     res.end('Hello World\n')
// }).listen(1337, '127.0.0.1')
// console.log('Server running at http://127.0.0.1:1337/')


