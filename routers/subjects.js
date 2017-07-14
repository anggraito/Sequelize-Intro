const express = require('express');
var theRout = express.Router();

var dbModel = require('../models');

theRout.get('/', function(req, res){
  dbModel.Subject.findAll()
  .then (function(rows){
    // dbModel.Teacher.findAll(){
    //   .then(function(rowses){
        res.render('Subjects', {data_subjects: rows});
    //   })
    // }
  });
});



module.exports= theRout;
