var express  = require('express');
var app      = express();
<<<<<<< HEAD
var PORT     = process.env.PORT || 3000;
=======
var port     = process.env.PORT || 3000;
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

<<<<<<< HEAD
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
=======
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497

var configDB = require('./config/database.js');

var db


<<<<<<< HEAD
=======
mongoose.connect(configDB.url, { useMongoClient: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  
  require('./app/routes.js')(app, passport, db);
}); 
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497


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
<<<<<<< HEAD
// listener ===============

app.listen(PORT, function(){
  console.log(`Ready For Your Order: ${PORT}`)
=======





app.listen(port, function(){
  console.log(`Ready For Your Order: ${port}`)
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497
})