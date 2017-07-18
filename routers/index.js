const express = require('express');
var ruut = express.Router();
var dbModel = require('../models');

ruut.get('/',function(req, res){
  res.render('index');
});
// --------------------------------------------------------------------
// ruut.get('/', function(req,res){
//     if(req.session.users){
//       res.redirect('/Students')
//     }else {
//       res.render('index', {msg: '', role: ''})
//     }
// })
//
// ruut.post('/', function(req,res){
//   if(!req.body.username || !req.body.password)
//   {
//     res.send('please enter username and password')
//   }
//   else
//   {
//     dbModel.users.findOne({
//       where: {
//         username:req.body.username
//       }
//     })
//     .then(function(row){
//       if(row.password == req.body.password)
//       {
//         req.session.users = {
//           username: req.body.username,
//           role: row.role
//         }
//         if(row.role == 'teacher'){
//           res.redirect('/Students')
//         }else if (row.role == 'academic') {
//           res.redirect('/Subjects')
//         }else {
//           res.redirect('/Students')
//         }
//         console.log(req.session.users.role);
//       } else{
//           res.send('worng password')
//       }
//     })
//     .catch(function(err){
//       res.send('user cannot found')
//     })
//   }
// });
// --------------------------------------------------------------------
// ruut.get('/login_user', (req, res, next) => {
//   let username = req.query.username;
//   let password = req.query.password;
//
//   if(username === '' && password === ''){
//     req.session.users = {
//       username: req.params.username,
//       password: req.params.password,
//       role: ''
//     }
//     res.redirect('/users');
//   } else{
//     res.send('user and password got be wrong!!');
//   }
// });
//
// ruut.use((req, res, next) => {
//   req.session.users = {};
//   if(req.session.users){
//     next();
//   } else{
//     res.sendStatus(404);
//   }
// });
//
// ruut.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     console.log(err);
//     res.send('succes for logout')
//   })
// });

module.exports= ruut ;
