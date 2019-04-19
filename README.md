
<img src="https://i.imgur.com/ISexB0U.png=50x" width="50">  Slack-Lackey API Server
=================================================

[![Build Status](https://travis-ci.com/slack-lackey/api-server.svg?branch=development)](https://travis-ci.com/slack-lackey/api-server)

## API Server for Slack Lackey
### Billy Bunn, Chris Merritt, Vanessa Wei, Erin Trainor

* [back-end: Hosted on Heroku](https://slack-bot-api-server.herokuapp.com/)

#### Documentation

* [swagger][5] - coming soon.

* [jsdoc][6] - coming soon.


### Modules
```
.
├── README.md
├── __test__
│   ├── __mocks__
│   │   └── router-mock.js
│   └── router.test.js
├── docs
│   ├── app.js.html
│   ├── config
│   │   └── jsdoc.config.json
│   ├── fonts
│   │   ├── OpenSans-Bold-webfont.eot
│   │   ├── OpenSans-Bold-webfont.svg
│   │   ├── OpenSans-Bold-webfont.woff
│   │   ├── OpenSans-BoldItalic-webfont.eot
│   │   ├── OpenSans-BoldItalic-webfont.svg
│   │   ├── OpenSans-BoldItalic-webfont.woff
│   │   ├── OpenSans-Italic-webfont.eot
│   │   ├── OpenSans-Italic-webfont.svg
│   │   ├── OpenSans-Italic-webfont.woff
│   │   ├── OpenSans-Light-webfont.eot
│   │   ├── OpenSans-Light-webfont.svg
│   │   ├── OpenSans-Light-webfont.woff
│   │   ├── OpenSans-LightItalic-webfont.eot
│   │   ├── OpenSans-LightItalic-webfont.svg
│   │   ├── OpenSans-LightItalic-webfont.woff
│   │   ├── OpenSans-Regular-webfont.eot
│   │   ├── OpenSans-Regular-webfont.svg
│   │   └── OpenSans-Regular-webfont.woff
│   ├── global.html
│   ├── index.html
│   ├── routes_router.js.html
│   ├── scripts
│   │   ├── linenumber.js
│   │   └── prettify
│   │       ├── Apache-License-2.0.txt
│   │       ├── lang-css.js
│   │       └── prettify.js
│   └── styles
│       ├── jsdoc-default.css
│       ├── prettify-jsdoc.css
│       └── prettify-tomorrow.css
├── index.js
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── middleware
    │   ├── 404.js
    │   └── 500.js
    └── routes
        └── router.js
```
 
#### Tests
  * `npm run test`
  * `npm run lint`

