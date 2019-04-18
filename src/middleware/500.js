'use strict';

module.exports = (err, req, res, next) => {
  console.log('*****Server Error.*****');
  if(err && res){
    res.status(500).json(err).end();
  }
  else{
    return null;
  }
};
