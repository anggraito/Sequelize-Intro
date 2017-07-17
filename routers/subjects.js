const express = require('express');
var theRout = express.Router();

var dbModel = require('../models');

// theRout.get('/', function(req, res){
//   dbModel.Subject.findAll()
//   .then (function(rows){
//     // dbModel.Teacher.findAll(){
//     //   .then(function(rowses){
//         res.render('Subjects', {data_subjects: rows});
//     //   })
//     // }
//   });
// });

theRout.get('/', function(req, res){
  dbModel.Subject.findAll()
  .then (arrSubject => {
    let promiseSubject = arrSubject.map( subject => {
      return new Promise( function (resolve, reject) {
        subject.getTeacher()
        .then( teacher => {
          subject.first_name =[];
          teacher.forEach(teachers => {
            subject.first_name.push(teachers.dataValues.first_name+' '+teachers.dataValues.last_name)
          })
          return resolve(subject);
        })
        .catch(err => reject (err));
      });
    });

    Promise.all(promiseSubject)
    .then( subject => {
      console.log(subject);
      res.render('Subjects', {data_subjects: subject});
    })
    .catch(err => {
      console.log(err);
    })
  })
});

theRout.get('/enrolledstudents/:id', function(req, res){
  dbModel.StudentSubject.findAll({ order: [['Students', 'first_name']],
    where: {
      SubjectId: req.params.id
    },
    include: [{all:true}]
  })
  .then(function (rows){
    res.render('enrolledstudent', {data_subjectstudent:rows})
  })
});

theRout.get('/givescore/:id/:ids', function(req, res){
  dbModel.StudentSubject.findAll({
    where: {
      StudentId: req.params.id,
      $and: {
        SubjectId: req.params.ids
      }
    },
    include: [{all:true}]
  })
  .then(function (rows){
    res.render('givescore', {data:rows})
  })
});

theRout.post('/givescore/:id/:ids', function(req, res){
  dbModel.StudentSubject.update({ Score: req.body.score}, {
    where: {
      StudentId: req.params.id,
      $and: {
        SubjectId: req.params.ids
      }
    }
  })
  .then(function (rows){
    res.redirect(`/subjects/enrolledstudents/${req.params.ids}`);
  })
});




module.exports= theRout;
