'use strict';
const superagent = require('superagent');

const express = require('express');
const errorHandler = require(`../middleware/500.js`);

const router = express.Router();

router.post('/createGist', createGist);

function createGist(request, response){

  console.log(request.body);
 
  return superagent.post('https://api.github.com/gists')
    .set('Authorization', `token ${process.env.GIST_TOKEN}`)
    .send({
      'description': request.body.description,
      'public': true,
      'files': {
        [request.body.title] : {
          'content': request.body.content,
        },
      },
    })
    .then(res => {
      const data = JSON.parse(res.text);
      // Send a link pointing to the new gist
      res.body.url = `https://gist.github.com/${data.owner.login}/${data.id}`;
      response.status(200).send(res.body.url);
    })
    .catch(errorHandler);
}

module.exports = router;
