const express = require('express');
var ruut = express.Router();

var dbModel = require('../models');

ruut.get('/', function(req, res){
  dbModel.Students.findAll()
  .then (function(rows){
    res.render('Students', {data_students: rows});
  });
});

module.exports= ruut ;
