var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.all( '*', function ( req, res ) {
  res.send( '\
  <!DOCTYPE html>\
  <html>\
    <head>\
      <meta charset="utf-8">\
      <title>MEAN APP</title>\
    </head>\
    <body>\
      <h1>Hello from MEAN app!</h1>\
    </body>\
    <script src="./public/bin/bundle.js"></script>\
  </html>\
  ' )
} );

app.listen( port, function () {
  console.log( 'server running on port: ' + port );
} );
