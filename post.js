var querystring = require('querystring');
var http = require('http');

function PostCode() {
  var post_data = JSON.stringify({
      'type': 'entrada',
      'name': 'El ladron de huesos',
      'password': 'robotica'
  });

  var post_options = {
      host: '127.0.0.1',
      port: '5000',
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
