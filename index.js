'use strict';

const fs = require('fs');
var express = require('express')
var app = express()
let firebase = require("firebase");
let base = []
let ready = 0

/*let rawdata = fs.readFileSync('logs.json');
let student = JSON.parse(rawdata);*/
var d = new Date();

firebase.initializeApp({
  serviceAccount: "./UTN-LOG.json",
  databaseURL: "https://utn-log.firebaseio.com/"
});
let db = firebase.database()
let ref = db.ref()
ref.on("value", function(snapshot) {
base = snapshot.val();
ready = 1
console.log('nueva base')
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

/*db.ref('partes/' + Object.keys(base).length).set({
      name: '+ 3 sensores',
      timeh: d.getHours(),
      timem: d.getMinutes(),
      dia: d.getDate(),
      mes: d.getMonth(),
      año: d.getFullYear()
  });*/

app.set('port', (process.env.PORT || 5000))


app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  if (ready)
  {
    for (var i = 1; i <= Object.keys(base).length; i++){
      response.write('<h' + i + '>' + Object.keys(base)[i - 1] + '</h' + i +'>');
      response.write('<ul>');
      for (var u = 0; u < Object.keys(base[Object.keys(base)[i - 1]]).length; u++)
      {
        response.write('<li>'
        + base[Object.keys(base)[i - 1]][u].name + ',  '
        + base[Object.keys(base)[i - 1]][u].timeh + ':'
        + base[Object.keys(base)[i - 1]][u].timem
        + ' , ' + base[Object.keys(base)[i - 1]][u].dia
        + '/' + base[Object.keys(base)[i - 1]][u].mes
        + '/' + base[Object.keys(base)[i - 1]][u].año +'</li>');
      }
      response.write('</ul>');
    }
  }
  response.end()
})

app.post('/', function(request, response) {
  let body = {};
request.on('data', (chunk) => {
  body = JSON.parse(chunk);
}).on('end', () => {
  if (typeof(body['type']) == 'string' && typeof(body['name']) == 'string' && typeof(body['password']) == 'string' && body['password'] == 'robotica')
  {
    if (body['type'] == 'entrada')
    {
      console.log(body['name'] + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' , ' + d.getHours() + ':' + d.getMinutes())
      ref = db.ref('entradas/' + (Object.keys(base['entradas']).length))
      ref.set({
            name: body['name'],
            timeh: d.getHours(),
            timem: d.getMinutes(),
            dia: d.getDate(),
            mes: d.getMonth(),
            año: d.getFullYear()
        });
    }
    if (body['type'] == 'temp')
    {
      console.log(body['name'] + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' , ' + d.getHours() + ':' + d.getMinutes())
      ref = db.ref('temps/' + (Object.keys(base['temps']).length))
      ref.set({
            name: body['name'],
            timeh: d.getHours(),
            timem: d.getMinutes(),
            dia: d.getDate(),
            mes: d.getMonth(),
            año: d.getFullYear()
        });
    }
    if (body['type'] == 'partes')
    {
      console.log(body['name'] + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' , ' + d.getHours() + ':' + d.getMinutes())
      ref = db.ref('partes/' + (Object.keys(base['partes']).length))
      ref.set({
            name: body['name'],
            timeh: d.getHours(),
            timem: d.getMinutes(),
            dia: d.getDate(),
            mes: d.getMonth(),
            año: d.getFullYear()
        });
    }
  }
});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
