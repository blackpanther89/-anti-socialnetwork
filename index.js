const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bcrypt = require('./bcrypt');
const db = require('./db');
const csurf = require('csurf');
//============================================================================//

app.use(bodyParser.json());
app.use(
  cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  }),
);

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie('mytoken', req.csrfToken());
  next();
});
app.use(express.static('./public'));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
  app.use(
    '/bundle.js',
    require('http-proxy-middleware')({
      target: 'http://localhost:8081/',
    }),
  );
} else {
  app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
//============================================================================//

app.get('/welcome', function(req, res) {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
//============================================================================//

app.post('/registration', (req, res) => {
  console.log('req.body:', req.body);
  bcrypt.hashPassword(req.body.password).then(hash => {
    // console.log('hash:', hash);
    db
      .register(req.body.firstName, req.body.lastName, req.body.email, hash)
      .then(results => {
        console.log('results in register', results);

        req.session.firstName = req.body.firstName;
        req.session.lastName = req.body.lastName;
        req.session.email = req.body.email;
        req.session.userId = results.rows[0].id;
        // console.log(req.session);
        res.json({success: true});
      })
      .catch(err => {
        res.json({error: true});
      });
  });

  // console.log('error:', error);
});
//============================================================================//
app.post('/login', (req, res) => {
  console.log('req.body', req.body);
  db.login(req.body.email, req.body.password).then(results => {
    bcrypt
      .checkPassword(req.body.password, results.rows[0].password)
      .then(match => {
        if (match) {
          req.session.userId = results.rows[0].id;
          res.json({success: true});
        } else {
          res.json({error: true});
        }
      })
      .catch(err => {
        res.json({error: true});
      })
      .catch(err => {
        res.json({error: true});
      });
  });
});
//============================================================================//
app.listen(8080, function() {
  console.log("I'm listening.");
});
