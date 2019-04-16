'use strict';
const superagent = require('superagent');

const express = require('express');
const moment = require('moment');
const errorHandler = require(`../middleware/500.js`);

const router = express.Router();

router.get('/getAll', handleGetAll);
router.post('/createGist', createGist);

function createGist(request, response){

  let username = request.body.username.replace(/\s+/g, '-').toLowerCase()+ '-' + Date.now() + '.js';
  let content = request.body.text;
  let gistContent = content.slice(content.indexOf('```')+3, content.lastIndexOf('```'));

  return superagent.post('https://api.github.com/gists')
    .set('Authorization', `token ${process.env.GIST_TOKEN}`)
    .send({
      'description': 'Gist created by ' + request.body.username + ' on ' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a') + ' in Slack.',
      'public': true,
      'files': {
        [username] : {
          'content': gistContent,
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

function handleGetAll(request, response, next) {
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
    .then(res => {
      console.log(res.body[0].url);
      response.status(200).json(res.body[0].url);
    });
}

module.exports = router;
