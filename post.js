var querystring = require('querystring');
var http = require('http');

function PostCode() {
  var post_data = JSON.stringify({
      'type': 'temp',
      'name': '0 Kelvin',
      'password': 'robotica'
  });

  var post_options = {
      host: 'utn-log.herokuapp.com',
      method: 'POST'
  };

  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

PostCode();
