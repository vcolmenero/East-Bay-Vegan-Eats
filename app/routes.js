module.exports = function(app, passport, db) {


    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('orders').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT 
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    app.post('/', (req, res) => {
      db.collection('orders').save({name: req.body.cust, msg: req.body.order, complete: false}, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body);
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/profile', isLoggedIn, function(req, res) {
      db.collection('orders')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          complete:true
        }
      }, {
        
        sort: {_id: 1},
        
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messagesDel', (req, res) => {
      db.collection('orders').remove({complete: true}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })


        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', 

            failureRedirect : '/login', 
            failureFlash : true 
        }));

       
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', 
            failureRedirect : '/signup', 
            failureFlash : true 
        }));


    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.employeeid    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
