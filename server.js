
// Load modules
var http = require('http');
var piccolo = require('piccolo');

// create new project
var project = piccolo();

// setup environment setting
project.configure('development', function () {
  project.set('debug', true);
  project.set('cache', 'none');
});

project.configure('production', function () {
  project.set('cache', (60*60*24));
});

project.use('development');

// build piccolo, ready will emit once done
project.build();

// setup http server
var server = http.createServer();

server.on('request', function (req, res) {
  // skip the favicon.ico it make so much noice
  // Note: this is not necessary
  if (req.url === '/favicon.ico') {
    res.status = 404;
    return res.end();
  }

  // route client request
  project.route(req, res);
});

// when piccolo is ready, start listening on port 8000
project.once('ready', function () {
  server.listen(8000, '127.0.0.1', function () {
    var addr = server.address();

    console.log('piccolo server is ready, listening on ' + addr.address + ':' + addr.port);
  });
});
