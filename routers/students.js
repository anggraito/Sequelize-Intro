const express = require('express');
var ruut = express.ruut();

var dbModel = require('../models');

ruut.get('/', function(req, res){
  dbModel.Students.findAll()
  .then (function(rows){
    res.render('Students', {data_students: rows});
  });
});

// ruut.get('/add', function(req, res){
//   res.render('studentAdd');
// });
//
// //add new student req.body
// ruut.post('/add', function(req, res){
//   Model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan })
//   .then( function(){
//     res.redirect('/students');
//   })
// });
//
// //go to the student edit form
// ruut.get('/edit/:id', function(req, res){
//   Model.Student.findById(req.params.id)
//   .then (function (rows){
//     res.render('studentEdit', {data_student: rows});
//   })
//    });
//
// ruut.post('/edit/:id', function(req, res) {
//   Model.Student.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan},
//     {
//       where: {id: req.params.id}
//     }
//   )
//   .then( function(){
//   res.redirect('/students');
//   })
// });
//
// //delete data from student
// ruut.get('/delete/:id', function(req, res){
//     Model.Student.destroy({where: {id : req.params.id}})
//     .then( function(){
//   res.redirect('/students');
//   })
// });

module.exports= ruut ;
