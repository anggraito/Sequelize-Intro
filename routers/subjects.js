const express = require('express');
var theRout = express.Router();

var dbModel = require('../models');

const score = require('../helpers/score')


// theRout.use((req, res, next) => {
//   if (req.session.users.role == 'academic' || req.session.users.role == 'headmaster') {
//     next()
//   } else {
//     res.send("Teacher can't acces this page!!")
//   }
// });

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
        subject.getTeachers()
        .then(teacher => {
          subject.full_name =[];
          teacher.forEach(t => {
            subject.full_name.push(t.dataValues.first_name+' '+t.dataValues.last_name)
          })
          return resolve(subject.full_name);
        })
        .catch(err => reject (err));
      });
    });

    Promise.all(promiseSubject)
      .then( subject => {
        res.render('Subjects', {data_subjects: subject});
    });
    //.catch(err => { console.log(err);});
  });
});

theRout.get('/:id/enrolledstudents/', function(req, res){
  dbModel.StudentSubject.findAll({ order: [['Students', 'first_name']],
    where: {
      SubjectId: req.params.id
    },
    include: [{all:true}]
  })
  .then(function (rows){
    let enrol = score(rows);
    res.render('enrolledStudent', {data_subjectstudent:rows, scoreLetter: enrol})
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
