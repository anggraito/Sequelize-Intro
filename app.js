const express = require('express');
var path = require('path');
//var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(req, res){
  res.send('hallo');
});

var Teacher = require('./models/teacher');
var Subject = require('./models/subject');
var Student = require('./models/students');


const teacher = require('./routers/teachers');
const subject = require('./routers/subjects');
const students = require('./routers/students');
//
app.use('/teachers', teacher);
app.use('/subjects', subject);
app.use('/Students', students);

app.listen(3002);
