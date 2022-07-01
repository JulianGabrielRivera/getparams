// app.js
const express = require('express');
const app = express();
const hbs = require('hbs');

// app.js

// 1. require the body-parser
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const req = require('express/lib/request');
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// ...
app.use(myFakeMiddleware);
// ...
function myFakeMiddleware(req, res, next) {
  console.log('myFakeMiddleware was called!');
  // new key called secret key and value will be asdf, now we can use this req.secretKey on our test route.
  req.secretKey = 'asdf';

  next();
}

app.get('/test', (req, res) => {
  console.log(req.secretKey);
  res.send('We made it to test! ' + req.secretKey);
});

app.get('/', (req, res) => {
  console.log(req);
  res.send('hi');
});

// app.get('/users/:username', (req, res) => {
//   res.send(req.params);
// });

// the first two can be whatever you call it

// app.get('/books/:bookId', (req, res, next) => {
//   res.send(req.params);
// });

app.get('/users/:username/books/:bookId', (req, res, next) => {
  res.send(req.params);
});
app.get('/search', (req, res, next) => {
  res.send(req.query);
});
/* app.js */
app.get('/get-user-info', (req, res) => {
  res.render('user-info-form');
});
app.get('/display-user-info', (req, res) => {
  // const name = req.query.name;
  // const age = req.query.age;
  // const superhero = req.query.superhero;

  // the same as 3 lines above
  const { name, age, superhero } = req.query;

  res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
  `);
});

app.get('/login', (req, res) => res.render('login'));

// app.js
app.post('/login', (req, res) => {
  // What ES6 feature could we use to clean these two lines up?
  let email = req.body.email;
  let password = req.body.password;

  // these are strings!!!
  if (email === 'ironhacker@gmail.com' && password === 'password') {
    res.send('Welcome');
    // render "Welcome"
  } else {
    res.send('Go Away');
    // render go away
  }
});

// app.post('/login', (req, res) => {
//   // What ES6 feature could we use to clean these two lines up?
//   let email    = req.body.email;
//   let password = req.body.password;

//   if ( email === ironhacker@gmail.com && pasword === password)/* fill in this condition*/){

//   } else {
//     // render go away
//   }

// });

app.listen(3000, () => console.log('App listening on port 3000!'));
