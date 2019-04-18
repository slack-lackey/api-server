'use strict';
let {createBody} = require('../src/routes/router.js');
let {createUrl} = require('../src/routes/router.js');
let {createGist} = require('../src/routes/router.js');
let errorHandler = require('../src/middleware/500.js');
describe('Router.js', ()=> {

  let request = { body: { 
    title: 'chris-merritt-1555612075949.js',
    description: 'Created by Chris Merritt on Thursday, April 18th 2019, 11:27:55 am',
    content: 'hi',
  }};

  let res = {
    'description': request.body.description,
    'public': true,
    'files': {
      [request.body.title] : {
        'content': request.body.content,
      },
    },
  };

  it('should create the body object', () => {
    expect(createBody(request)).toEqual(res);
  });
  it('should return a url', ()=> {
    let res2 = {'text':'{"url":"https://api.github.com/gists/a079433696c2096eb7efecba7ca7e6f5","forks_url":"https://api.github.com/gists/a079433696c2096eb7efecba7ca7e6f5/forks","commits_url":"https://api.github.com/gists/a079433696c2096eb7efecba7ca7e6f5/commits","id":"a079433696c2096eb7efecba7ca7e6f5","node_id":"MDQ6R2lzdGEwNzk0MzM2OTZjMjA5NmViN2VmZWNiYTdjYTdlNmY1","git_pull_url":"https://gist.github.com/a079433696c2096eb7efecba7ca7e6f5.git","git_push_url":"https://gist.github.com/a079433696c2096eb7efecba7ca7e6f5.git","html_url":"https://gist.github.com/a079433696c2096eb7efecba7ca7e6f5","files":{"chris-merritt-1555612075949.js":{"filename":"chris-merritt-1555612075949.js","type":"application/javascript","language":"JavaScript","raw_url":"https://gist.githubusercontent.com/SlackLackey/a079433696c2096eb7efecba7ca7e6f5/raw/32f95c0d1244a78b2be1bab8de17906fabb2c4a8/chris-merritt-1555612075949.js","size":2,"truncated":false,"content":"hi"}},"public":true,"created_at":"2019-04-18T18:58:28Z","updated_at":"2019-04-18T18:58:28Z","description":"Created by Chris Merritt on Thursday, April 18th 2019, 11:27:55 am","comments":0,"user":null,"comments_url":"https://api.github.com/gists/a079433696c2096eb7efecba7ca7e6f5/comments","owner":{"login":"SlackLackey","id":49653422,"node_id":"MDQ6VXNlcjQ5NjUzNDIy","avatar_url":"https://avatars1.githubusercontent.com/u/49653422?v=4","gravatar_id":"","url":"https://api.github.com/users/SlackLackey","html_url":"https://github.com/SlackLackey","followers_url":"https://api.github.com/users/SlackLackey/followers","following_url":"https://api.github.com/users/SlackLackey/following{/other_user}","gists_url":"https://api.github.com/users/SlackLackey/gists{/gist_id}","starred_url":"https://api.github.com/users/SlackLackey/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SlackLackey/subscriptions","organizations_url":"https://api.github.com/users/SlackLackey/orgs","repos_url":"https://api.github.com/users/SlackLackey/repos","events_url":"https://api.github.com/users/SlackLackey/events{/privacy}","received_events_url":"https://api.github.com/users/SlackLackey/received_events","type":"User","site_admin":false},"forks":[],"history":[{"user":{"login":"SlackLackey","id":49653422,"node_id":"MDQ6VXNlcjQ5NjUzNDIy","avatar_url":"https://avatars1.githubusercontent.com/u/49653422?v=4","gravatar_id":"","url":"https://api.github.com/users/SlackLackey","html_url":"https://github.com/SlackLackey","followers_url":"https://api.github.com/users/SlackLackey/followers","following_url":"https://api.github.com/users/SlackLackey/following{/other_user}","gists_url":"https://api.github.com/users/SlackLackey/gists{/gist_id}","starred_url":"https://api.github.com/users/SlackLackey/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/SlackLackey/subscriptions","organizations_url":"https://api.github.com/users/SlackLackey/orgs","repos_url":"https://api.github.com/users/SlackLackey/repos","events_url":"https://api.github.com/users/SlackLackey/events{/privacy}","received_events_url":"https://api.github.com/users/SlackLackey/received_events","type":"User","site_admin":false},"version":"8077e11676474b6266a4a56649060bd6b363de06","committed_at":"2019-04-18T18:58:27Z","change_status":{"total":1,"additions":1,"deletions":0},"url":"https://api.github.com/gists/a079433696c2096eb7efecba7ca7e6f5/8077e11676474b6266a4a56649060bd6b363de06"}],"truncated":false}' };
    expect(createUrl(res2)).toEqual('https://gist.github.com/SlackLackey/a079433696c2096eb7efecba7ca7e6f5');
  });
  it('Should return null with no request', ()=> {
    expect(createGist()).toBeNull();
  });
});



global.console = {log: jest.fn()};
describe('Error handler', ()=> {
  it('Should return an error', ()=> {
    expect(errorHandler()).toBeNull();
  });
  it('Should return 500', () => {
    let res = '';
    errorHandler('Error', res);
    expect(console.log).toBeCalledWith('*****Server Error.*****');
  });
});
