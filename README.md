![Slack Lackey](https://i.imgur.com/ISexB0U.png) Slack-Lackey API Server
=================================================

[![Build Status](https://travis-ci.com/slack-lackey/api-server.svg?branch=development)](https://travis-ci.com/slack-lackey/api-server)

## API Server for Slack Lackey
### Billy Bunn, Chris Merritt, Vanessa Wei, Erin Trainor

* [back-end: Hosted on Heroku](https://slack-bot-api-server.herokuapp.com/)

#### Documentation

* [swagger][5] - coming soon.

* [jsdoc][6] - coming soon.


### Modules
#### `modulename.js`
##### Exported Values and Methods
###### `foo(thing) -> string`
<!-- If you finished everything, you should be able to copy/paste the lab requirements and put them in present tense. -->
Usage Notes or examples
###### `bar(array) -> array`
Usage Notes or examples
### Setup
#### `.env` requirements
* `npm i`
* `PORT` - 3000
* `GIST_TOKEN` - current auth token for the github api.
#### Running the app
* `npm start`
* Endpoint: `/createGist`
  * Posts a new gist to the Slack Lackey github account.
* Endpoint: `/getAll`
  * Returns all the gists from the Slack Lackey github account.
 
#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run lint`
* What assertions were made?
  * Need to use mocks. Check the output of the functions not the wiring. 
