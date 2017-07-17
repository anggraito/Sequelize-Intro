const express = require('express');
var ruut = express.Router();

var session = require('express-session');

ruut.get('/',function(req, res){
  res.render('index');
});

ruut.get('/login',function(req, res){
  res.render('login');
});


ruut.get('/login_user', (req, res, next) => {
  let username = req.query.username;
  let password = req.query.password;

  if(username === '' && password === ''){
    req.session.users = {
      username: req.params.username,
      password: req.params.password,
      role: ''
    }
    res.redirect('/users');
  } else{
    res.send('user and password got be wrong!!');
  }
});

ruut.use((req, res, next) => {
  req.session.users = {};
  if(req.session.users){
    next();
  } else{
    res.sendStatus(404);
  }
});

ruut.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.send('succes for logout')
  })
});

module.exports= ruut ;
