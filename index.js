const express = require('express');
const request = require('request');

const appA = express();

appA.use('/', function(req, res) {
  const url = `http://0.0.0.0:7701${req.url}`;

  req.pipe(request(url)).pipe(res);
});

appA.listen(7700);

const appB = express();

appB.all('/no_redirect', (req, res) => {
  res.send('This loads without changing the url all seems fine');
});

appB.all('/redirect', (req, res) => {
  res.redirect('https://www.google.com');
});

appB.listen(7701)

console.log(`
  visit http://127.0.0.1:7700/no_redirect
  or
  visit http://127.0.0.1:7700/redirect
  The redirect will load google without images

  In both cases the domain in the browser is not changed.
`);
