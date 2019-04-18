'use strict';

function createGist(req, res){
  if(res && res){ res.send(200);}
  else{return null;}
}


module.exports = {createGist};