'use strict';
const superagent = require('superagent');

const express = require('express');

const Q = require('@nmq/q/client');
const errorHandler = require(`..//middleware/500.js`);

const router = express.Router();

router.get('/getAll', handleGetAll);

router.post('/createGist', createGist);

function createGist(request, response){
  console.log('got request');
  return superagent.post('https://api.github.com/gists')
      .set('Authorization', `token ${process.env.GIST_TOKEN}`)
      .send({
        "description": "Hello World Examples",
        "public": true,
        "files": {
          "hello_world.rb": {
            "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
          },
          "hello_world.py": {
            "content": "class HelloWorld:\n\n    def __init__(self, name):\n        self.name = name.capitalize()\n       \n    def sayHi(self):\n        print \"Hello \" + self.name + \"!\"\n\nhello = HelloWorld(\"world\")\nhello.sayHi()"
          },
          "hello_world_ruby.txt": {
            "content": "Run `ruby hello_world.rb` to print Hello World"
          },
          "hello_world_python.txt": {
            "content": "Run `python hello_world.py` to print Hello World"
          }
        }
      })
      .then(res => {
        console.log('response:', JSON.parse(res.text));
        const data = JSON.parse(res.text);
        // Send a link pointing to the new gist
        const url = `https://gist.github.com/${data.owner.login}/${data.id}`;
        console.log(url);
        // return url;
        response.status(200).send(url);
      })
      .catch(errorHandler)
}



function handleGetAll(request, response, next) {
  return superagent.get('https://api.github.com/users/SlackLackey/gists')
  .then(res => {
    console.log(res.body[0].url);
    response.status(200).json(res.body[0].url);
  })
}

module.exports = router;
