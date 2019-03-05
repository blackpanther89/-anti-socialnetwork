const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
// const bodyParser = require('body-parser');
//============================================================================//

app.use(
  cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  }),
);

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
  req.session.userId == true;
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
  console.log("I'm listening.");
});
