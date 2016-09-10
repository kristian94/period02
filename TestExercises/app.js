/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var operations = require(path.join(__dirname, './modules/operations.js'))


var app = express()

function performOperation(operation, n1, n2){

    switch (operation){
        case 'add':
            return operations.add(n1, n2)
            break;
        case 'subtract':
            return operations.subtract(n1, n2)
            break;
        case 'multiply':
            return operations.multiply(n1, n2)
            break;
        case 'divide':
            return operations.divide(n1, n2)
            break;
        default:
            return 'invalid operation'
            break;

    }
}

app.use(bodyParser())


app.get('/api/calc/:operation/:n1/:n2', function(req, res){
    var operation = req.params.operation
    var n1 = req.params.n1
    var n2 = req.params.n2
    var result = performOperation(operation, n1, n2)
    res.write(result.toString())
    res.end()
})

app.listen('3000', function(){
    console.log("Server started, listening on: " + 3000);
})




