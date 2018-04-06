'use strict';

const fs = require('fs');
var express = require('express')
var app = express()

let rawdata = fs.readFileSync('logs.json');
let student = JSON.parse(rawdata);
var d = new Date();

app.set('port', (process.env.PORT || 5000))


app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write('<h1>Log entradas laboratorio</h1>');
  response.write('<ul>');
  for (var i = 0; i < student.length; i++)
  {
    response.write('<li>' + student[i].name + ',  '+ student[i].timeh + ':' + student[i].timem  + ' , ' + student[i].dia + '/' + student[i].mes + '/' + student[i].año +'</li>');
  }
  response.write('</ul>');
  response.end()
})

app.post('/', function(request, response) {
  let body = {};
request.on('data', (chunk) => {
  body = JSON.parse(chunk);
}).on('end', () => {
  //console.log(body)
  if (typeof(body['name']) == 'string' && body['password'] == 'robotica')
  {
    console.log(body['name'] + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' , ' + d.getHours() + ':' + d.getMinutes())
    student.push({
          "name": body['name'],
          "timeh": d.getHours(),
          "timem": d.getMinutes(),
          "dia": d.getDate(),
          "mes": d.getMonth(),
          "año": d.getFullYear()
      });
      fs.writeFileSync('logs.json', JSON.stringify(student));
  }
});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
