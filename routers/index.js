const express = require('express');
var ruut = express.Router();

ruut.get('/',function(req, res){
  res.render('index');
});

module.exports= ruut ;
