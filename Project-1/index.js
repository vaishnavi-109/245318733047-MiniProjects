const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');
mongoose.set('useFindAndModify', false);
mongoose.connect(
    'mongodb://127.0.0.1:27017/p1hospital',
    { useUnifiedTopology: true , useNewUrlParser: true }
    );
mongoose.Promise = global.Promise;


app.use(function(err,req,res,next){
    res.sendStatus(422).send({error:err.message});
    res.sendStatus(403).send({error:err.message});
    res.sendStatus(400).send({error:err.message});
});
