'use strict';
const superagent = require('superagent');

const express = require('express');

const Q = require('@nmq/q/client');
const errorHandler = require(`..//middleware/500.js`);

const router = express.Router();

router.get('/getAll', handleGetAll);

router.post('/createGist', createGist);

router.get('/test', testRoute);

function createGist(request, response){
  console.log('got request');
  console.log(request.body);
  let content = request.body.text;
  let username = request.body.username + '.js';
  


  content = content.substring(3, (content.length-3));
  return superagent.post('https://api.github.com/gists')
      .set('Authorization', `token ${process.env.GIST_TOKEN}`)
      .send({
        "description": request.body.user,
        "public": true,
        "files": {
          [username] : {
            "content": content
          }
        }
      })
      .then(res => {
        const data = JSON.parse(res.text);
        // Send a link pointing to the new gist
        res.body.url = `https://gist.github.com/${data.owner.login}/${data.id}`;
        response.status(200).send(res.body.url);
      })
      .catch(errorHandler)
}

function testRoute(request, response){
  console.log('someone hit the route');
  console.log(request.body);
}

function handleGetAll(request, response, next) {
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
  .then(res => {
    console.log(res.body[0].url);
    response.status(200).json(res.body[0].url);
  })
}

module.exports = router;
