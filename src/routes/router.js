'use strict';
const superagent = require('superagent');

const express = require('express');
const moment = require('moment');
const errorHandler = require(`../middleware/500.js`);

const router = express.Router();

router.get('/getAll', handleGetAll);

router.post('/createGist', createGist);

router.get('/test', testRoute);

function createGist(request, response){
  let content = request.body.text;
  let username = request.body.username;
  username = username.replace(/\s+/g, '-').toLowerCase()+ '-' + Date.now() + '.js';

  content = content.substring(3, (content.length-3)); //to do: do index of ``` instead of 3.

  return superagent.post('https://api.github.com/gists')
      .set('Authorization', `token ${process.env.GIST_TOKEN}`)
      .send({
        "description": "Gist created by " + request.body.username + " on " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " in Slack.",
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
