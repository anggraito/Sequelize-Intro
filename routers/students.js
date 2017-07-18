const express = require('express');
var ruut = express.Router();

var dbModel = require('../models');

// ruut.use((req, res, next) => {
//   console.log(req.session)
//   if (req.session.users.role == 'academic' || req.session.users.role == 'headmaster' || req.session.users.role == 'teacher') {
//     next()
//   } else {
//     res.send("You are not the part of this academic!!");
//   }
// });


ruut.get('/', function(req, res){
  dbModel.Students.findAll({order: [['first_name']]})
  .then (function(rows){
    res.render('Students', {data_students: rows});
  });
});

ruut.get('/add', function(req, res){
  res.render('studentsAdd');
});

//add student req.body
ruut.post('/add', function(req, res){
  dbModel.Students.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email})
  .then( function(){
    res.redirect('/students');
  })
  // .catch(err =>{
  //   res.render('studentsAdd',{title :'Add Students Data', errorMsg: err.message})
  // });
});

//edit form
ruut.get('/edit/:id', function(req, res){
  dbModel.Students.findById(req.params.id)
  .then (function (rows){
    res.render('studentsEdit', {data_students: rows});
  });
});

ruut.post('/edit/:id', function(req, res) {
  dbModel.Students.update({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email},
    {where:
      {id: req.params.id}
    }
  )
  .then(function(){
    res.redirect('/students');
  });
});

//delete
ruut.get('/delete/:id', function(req, res){
  dbModel.Students.destroy({where: {id : req.params.id}})
  .then( function(){
    res.redirect('/students');
  })
});
//add subject
ruut.get('/addsubject/:id', function(req, res){
  dbModel.Student.findById(req.params.id)
  .then (function (rows){
    Model.Subject.findAll()
    .then (function (rows2){
    res.render('studentAddSub', {data_student: rows, data_subject: rows2});
  })
   })
 });

ruut.post('/addsubject/:id', function(req, res) {
  dbModel.StudentSubject.create({ StudentId: req.params.id, SubjectId: req.body.SubjectId})
  .then( function(){
  res.redirect('/students');
  })
});

module.exports= ruut ;
