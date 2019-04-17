'use strict';
const superagent = require('superagent');

const express = require('express');
const errorHandler = require(`../middleware/500.js`);
const modelFinder = require(`../middleware/model-finder.js`);

const router = express.Router();

router.use(modelFinder);

// router.get('/getAll', handleGetAll);
// router.get('/gistCategory', gistCategory);
router.post('/createGist', createGist);
// router.post('/test', testPost);

// function testPost(request, response){
//   request.model.post(request.body);
//   response.status(200).send('ok');
// }

// function gistCategory(request, response){
//   request.model.get()
//     .then(res => {
//       let result = [];
//       res.forEach(item => {
//         if(item.keywords.includes(request.query.check)){
//           result.push(item.url);
//         }
//       });
//       return result;
//     })
//     .then(result => {
//       console.log(result);
//       response.status(200).send(result);
//     });
// }

function createGist(request, response){
  // console.log(request.body);
  // let username = request.body.username.replace(/\s+/g, '-').toLowerCase()+ '-' + Date.now() + '.js';
  // let content = request.body.text;
  // let gistContent = content.slice(content.indexOf('```')+3, content.lastIndexOf('```'));
  // let date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

  console.log(request.body);
  let filename = request.body.filename;

  return superagent.post('https://api.github.com/gists')
    .set('Authorization', `token ${process.env.GIST_TOKEN}`)
    .send({
      'description': request.body.description,
      'public': true,
      'files': {
        [filename] : {
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

// function handleGetAll(request, response, next) {
//   return superagent.get('https://api.github.com/users/SlackLackey/gists')
//     .then(res => {
//       console.log(res.body[0].url);
//       response.status(200).json(res.body[0].url);
//     });
// }

module.exports = router;
