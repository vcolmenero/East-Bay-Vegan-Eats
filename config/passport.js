// config/passport.js
// creates a collection in Mongo with all users information

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User       		= require('../app/models/user');

// expose this function to our app using module.exports
// exports a fucntion
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with employee id
        usernameField : 'employee id',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, employeeid, password, done) {

		// find a user whose employee id is the same as the forms employee id
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.employee id' :  employeeid }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that employee id
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That employee id is already taken.'));
            } else {

				// if there is no user with that employee id
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.employeeid    = employeeid;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model

				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with employee id
        usernameField : 'employee id',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, employeeid, password, done) { // callback with employee id and password from our form

        // find a user whose employee id is the same as the forms employee id
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.employeeid' :  employeeid }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
