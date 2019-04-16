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
  console.log(request);
  return superagent.post('https://api.github.com/gists')
      .set('Authorization', `token ${process.env.GIST_TOKEN}`)
      .send({
        "description": "Hello World Examples",
        "public": true,
        "files": {
          "hello_world.rb": {
            "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
          }
        }
      })
      .then(res => {
        console.log('response:', JSON.parse(res.text));
        const data = JSON.parse(res.text);
        // Send a link pointing to the new gist
        res.body.url = `https://gist.github.com/${data.owner.login}/${data.id}`;
        
        console.log('*****heres the url', res.body.url);
        // return url;
        // return response;
        response.status(200).send(res.body.url);
      })
      .catch(errorHandler)
}

function testRoute(request, response){
  console.log('someone hit the route');
}

function handleGetAll(request, response, next) {
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
  .then(res => {
    console.log(res.body[0].url);
    response.status(200).json(res.body[0].url);
  })
}

module.exports = router;
