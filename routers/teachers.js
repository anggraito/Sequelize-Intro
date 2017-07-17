var express = require('express');
var routing = express.Router();

var dbModel = require('../models');


routing.get('/', function(req, res){
  dbModel.Teacher.findAll()
  .then (function (rows) {
    res.render('Teachers', {data_teachers: rows});
  });
  // .catch(err => reject(err){
  //   res.render('teachersAdd', {title : 'Add Teacher Data', errorMsg: err.message});
  // });
});

routing.get('/add', function(req, res){
  dbModel.Subject.findAll()
  .then(function(rows){
    res.render('teachersAdd',{data_teachers: rows});
  });
});

routing.post('/add', function(req, res){
  dbModel.Teacher.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email, SubjectId:req.body.SubjectId})
  .then( function(){
    res.redirect('/teachers');
  });
  // .catch(err => {
  //   res.render('teachersAdd', {title : 'Add Teacher Data', errorMsg: err.message});
  // });
});

//edit form
routing.get('/edit/:id', function(req, res){
  dbModel.Teacher.findById(req.params.id)
  .then (function (rows){
    res.render('teachersEdit', {data_teachers2: rows});
  });
});

routing.post('/edit/:id', function(req, res) {
  dbModel.Teacher.update({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email, SubjectId:req.body.SubjectId},
    {where:
      {id: req.params.id}
    }
  )
  .then(function(){
    res.redirect('/teachers');
  });
});

//delete
routing.get('/delete/:id', function(req, res){
  dbModel.Teacher.destroy({where: {id : req.params.id}})
  .then( function(){
    res.redirect('/teachers');
  })
});

// function valid(){
//   db.Teacher
// }


module.exports = routing;
