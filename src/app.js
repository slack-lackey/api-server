'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require(`${__dirname}/middleware/500.js`);
const notFound = require(`${__dirname}/middleware/404.js`);
const {router} = require(`${__dirname}/routes/router.js`);


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/docs', express.static('docs'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);


app.use(notFound);
app.use(errorHandler);

/**
 * Start the server at the specified port.
 * @param  {} port
 */
module.exports = {
  server: app,
  start: (port) =>{
    app.listen(port, () => {
      console.log(`Server up on: ${port}`);
    });
  },
};
