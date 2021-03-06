const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
  secret: 'anggraito',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}));

var Index = require('./models/index');
var Teacher = require('./models/teacher');
var Subject = require('./models/subject');
var Student = require('./models/students');

const index = require('./routers/index');
const teacher = require('./routers/teachers');
const subject = require('./routers/subjects');
const students = require('./routers/students');


app.use('/', index);
// app.use((req, res, next) => {
//   if (req.session.users) { // undefined
//     next()
//   } else {
//     res.render('index', {msg: 'anda harus login'})
//   }
// });
app.use('/Teachers', teacher);
app.use('/Subjects', subject);
app.use('/Students', students);

app.listen(process.env.PORT||3003);
