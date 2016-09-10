/**
 * Created by Kristian Nielsen on 08-09-2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//add your content here

app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/calculator/:operation/:n1/:n2", function (req, res, next) {
    var calculatorRequest = {
        operation: req.params.operation,
        n1: Number(req.params.n1),
        n2: Number(req.params.n2)
    }

    req.calcualtorRequest = calculatorRequest;

    next()
})


app.get("/api/calculator/*", function (req, res) {
    if(req.calcualtorRequest.operation == 'add'){
        res.write(Number(req.calcualtorRequest.n1 + req.calcualtorRequest.n2).toString())
        res.end()

    }
    else{
        res.write('invalid operation')
        res.end()
    }
})

app.get("/api", function (req, res){
    res.write('Hello')
    res.end()
})




app.listen(3000, function () {
    console.log("Server started, listening on: " + 3000);
})