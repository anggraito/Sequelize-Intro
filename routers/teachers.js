var express = require('express');
var routing = express.Router();

var dbModel = require('../models');


routing.get('/', function(req, res){
  dbModel.Teacher.findAll({order: [['first_name']]})
  .then (arrTeacher => {
    let promise = arrTeacher.map(teacher => {
      return new Promise (function (resolve, reject){
        teacher.getSubject()
        .then(subject => {
          if(teacher.SubjectId == null){
            teacher.subject_name = 'unnasigned';
          } else {
            teacher.subject_name = subject.subject_name;
          }
          return resolve(teacher);
        })
        .catch(err => reject (err));
      });
    });
    Promise.all(promise)
    .then(teacher =>{
      res.render('Teachers', {data_teachers: teacher});
    });
    //res.render('Teachers', {data_teachers: rows});
  });
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
});

//edit form
routing.get('/edit/:id', function(req, res){
  dbModel.Teacher.findById(req.params.id)
  .then (function (rows){
    dbModel.Subject.findAll()
    .then(function (rows2){
      res.render('teachersEdit', {data_teachers2: rows, data_subject2: rows2});
    })
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


module.exports = routing;
