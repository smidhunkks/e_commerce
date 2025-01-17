var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var busboyparser=require('busboy-body-parser')

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const { extname } = require('path');
var hbs = require('express-handlebars');
//var formidable = require('express-formidable');

// added from stack for body-parser
var bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();

// apply them

//end of section 

// var db = require('./config/connection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname + '/views/layout/',partialsDir:__dirname + '/views/partials'}));

app.use(busboyparser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// db.connect((err)=>{
//   if (err) console.log("Connection error"+err);
//   else console.log("Databse connection successfull");
// })

app.use('/', userRouter);
app.use('/admin', adminRouter);
//app.use(formidable());

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
