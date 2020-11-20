
var LocalStrategy = require('passport-local').Strategy;

var User = require('../controllers/user');


module.exports = function(passport) {

	
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	

    passport.use('local-signup', new LocalStrategy({
        
        usernameField : 'employee id',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, employeeid, password, done) {

		
<<<<<<< HEAD
        User.findOne({ 'local.employee id' : employeeid }, function(err, user) {
=======
        User.findOne({ 'local.employee id' :  employeeid }, function(err, user) {
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497
            if (err)
                return done(err);

            
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That employee id is already taken.'));
            } else {

				
<<<<<<< HEAD
                var newUser = new User();

                newUser.local.employeeid = employeeid;
=======
                var newUser            = new User();

                newUser.local.employeeid    = employeeid;
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497
                newUser.local.password = newUser.generateHash(password); 

                newUser.save(function(err) {
                    if (err)
<<<<<<< HEAD
                    throw err;
=======
                        throw err;
>>>>>>> 131e70396cde9860d4865e5d7a18f20015020497
                    return done(null, newUser);
                });
            }

        });

    }));

    

    passport.use('local-login', new LocalStrategy({
        
        usernameField : 'employee id',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, employeeid, password, done) { 
        
        User.findOne({ 'local.employeeid' :  employeeid }, function(err, user) {
            
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); 

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password.')); 

            return done(null, user);
        });

    }));

};
