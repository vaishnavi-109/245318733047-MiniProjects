const express = require('express');
const { db } = require('../models/Hospital');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Ventilator = require('../models/Ventilators');
const middleware = require('../middleware');



//details of hospital
router.get('/getH',middleware.checkToken,(req,res,next)=>{
    db.collection("hospitals").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});


//details of ventilators
router.get('/getV',middleware.checkToken,(req,res,next)=>{
    db.collection("ventilators").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});


//add new hospitals
router.post('/addH',middleware.checkToken,(req,res,next)=>{
    Hospital.create(req.body).then(function(hospital){
          res.send(hospital);
      }).catch(next);
});


//add new ventilators
router.post('/addV',middleware.checkToken,(req,res,next)=>{
    Ventilator.create(req.body).then(function(ventilator){
            res.send(ventilator);
         }).catch(next);
});



//update ventilator details
router.put('/update/:id',middleware.checkToken,(req,res,next)=>{
   Ventilator.updateOne({ventilatorId: req.params.id},req.body).then((ventilator)=>{
       res.send({ventilator});
    }).catch(next);
});



//search hospital by name
router.get('/get/:name',middleware.checkToken,(req,res,next)=>{
    db.collection("hospitals").findOne({name: req.params.name}).then(function(hospital){
        res.send(hospital);
    });
});



//search ventilators by status and hospital name
router.get('/get/:name/:status',middleware.checkToken,(req,res,next)=>{
     db.collection("ventilators").find({name: req.params.name,status: req.params.status}).toArray().then(function(ventilator){
          res.send(ventilator);
      });
});



//delete ventilator by id
router.delete('/delete/:id',middleware.checkToken,(req,res,next)=>{
    db.collection("ventilators").deleteOne({ventilatorId: req.params.id}).then(function(ventilator){
        res.send(ventilator);
    });
});



module.exports = router;