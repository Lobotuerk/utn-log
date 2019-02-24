var querystring = require('querystring');
var http = require('http');

function PostCode() {
  var post_data = JSON.stringify({
      'user number': 1541,
      'content': 'test'
  });

  var post_options = {
      host: 'web.whatsapp.com',
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
