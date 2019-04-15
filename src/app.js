'use strict';

const Q = require('@nmq/q/client');

const bot = new Q('bot');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require(`${__dirname}/middleware/500.js`);
const notFound = require(`${__dirname}/middleware/404.js`);
const gistRoutes = require(`${__dirname}/routes/router.js`);


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/docs', express.static('docs'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(gistRoutes);

bot.subscribe('getAll'), (payload) => {
  console.log(payload);
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
  .then(res => {
    console.log(payload);
    Q.publish('bot', 'gotAll', {res : res.body[0].url});
    response.status(200).json(res.body);
  })
}



app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) =>{
    app.listen(port, () => {
      console.log(`Server up on: ${port}`);
    })
  }
}