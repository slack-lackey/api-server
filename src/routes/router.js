'use strict';
const superagent = require('superagent');

const express = require('express');



const router = express.Router();

router.use('/getAll', handleGetAll);


function handleGetAll(request, response, next) {
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
  .then(res => {
    console.log(res.body[0].url);
    response.status(200).json(res.body[0].url);
  })
}



module.exports = router;
