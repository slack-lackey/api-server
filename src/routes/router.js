'use strict';
const superagent = require('superagent');

const express = require('express');
const errorHandler = require(`../middleware/500.js`);

const router = express.Router();

router.post('/createGist', createGist);

/**Create a new gist using a superagent post.
 * @param  {} request - The http request object
 * @param  {} response - The http response object
 * @param  {} data - create the body of the Gist.
 * @param  {} superagent.post - Send the Gist info to the github api.
 * @param  {} url - Create the url from the response.
 * @returns Sends the url to the bot.
 */
function createGist(request, response){
  if(!request || !response){return null;}
  else{
    let data = createBody(request);
    return superagent.post('https://api.github.com/gists')
      .set('Authorization', `token ${process.env.GIST_TOKEN}`)
      .send(data)
      .then(res => {
        let url = createUrl(res);
        response.status(200).send(url);
      })
      .catch(errorHandler);
  }}

/**Creates the body of the Gist that will be sent through superagent.
 * @param  {} request - Takes in the request object from the http request.
 * @returns the object that is built out of the parameters from the request.
 */
function createBody(request){
  if(!request)return null;
  else{
    return {
      'description': request.body.description,
      'public': true,
      'files': {
        [request.body.title] : {
          'content': request.body.content,
        },
      },
    };
  }}

/** Creates the url that gets returned to the bot.
 * @param  {} res - the result from the superagent post.
 * @param  {} data - the parsed result from the superagent result.
 * @param  {} url - Using the parameters, put the url together that points to the location of the new gist.
 * @returns url
 */
function createUrl(res){
  const data = JSON.parse(res.text);
  let url = `https://gist.github.com/${data.owner.login}/${data.id}`;
  return url;
}

module.exports = {router, createBody, createUrl, createGist};
