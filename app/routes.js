module.exports = function (app, passport, db, fetch, omdb) {

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('pinned').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        movies: result
      })
    })
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/searchMovies', function (req, res) {
    const moviequery = req.query.movieName
    fetch(`https://www.omdbapi.com/?s=${moviequery}&apikey=${omdb.api}`)
      .then(res => res.json())
      .then(data => {
          res.end(JSON.stringify(data));
          console.log(data)
      })
  })

  app.post('/addMovie', (req, res) => {
    db.collection('pinned').save({
      name: req.body.name,
      author: req.body.author,
      image: req.body.image
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })

  app.delete('/deleteMovie', (req, res) => {
    db.collection('pinned').findOneAndDelete({
      name: req.body.name
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  app.get('/login', function (req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function (req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
