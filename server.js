var express  = require('express');
var app      = express();
var PORT     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./config/database.js');






require('./config/passport')(passport); 

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) 

app.set('view engine', 'ejs'); 

app.use(session({
    secret: 'admin1234',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
// listener ===============

app.listen(PORT, function(){
  console.log(`Ready For Your Order: ${PORT}`)
})