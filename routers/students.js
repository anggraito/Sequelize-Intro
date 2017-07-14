const express = require('express');
var ruut = express.Router();

var dbModel = require('../models');

ruut.get('/', function(req, res){
  dbModel.Students.findAll()
  .then (function(rows){
    res.render('Students', {data_students: rows});
  });
});

ruut.get('/add', function(req, res){
  res.render('studentsAdd');
});

//add student req.body
ruut.post('/add', function(req, res){
  dbModel.Students.create(req.body)
  .then( function(){
    res.redirect('/students');
  })
  .catch(err =>{
    res.render('studentsAdd',{title :'Add Students Data', errorMsg: err.message})
  });
});

//edit form
ruut.get('/edit/:id', function(req, res){
  dbModel.Students.findById(req.params.id)
  .then (function (rows){
    res.render('studentsEdit', {data_students: rows});
  });
});

ruut.post('/edit/:id', function(req, res) {
  dbModel.Students.update(req.body ,{where: {id: req.params.id}});
  .then( function(){
    res.redirect('/students');
  });
  .catch(err =>{
    res.render('studentsEdit',{title :'Input Data Students Not Succes', errorMsg: err.message})
  });
});


//delete
ruut.get('/delete/:id', function(req, res){
    dbModel.Students.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/Students');
  })
});

module.exports= ruut ;
