
// Load modules
var http = require('http');
var piccolo = require('piccolo');

var mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// create new project
var project = piccolo();

// setup environment setting
project.configure(function () {
  project.set('debug', true);
});

project.configure('development', function () {
  project.set('cache', 'none');
});

project.configure('production', function () {
  project.set('cache', (60*60*24));
});

project.use(mode);

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
  var port = mode === 'production' ? 80 : 8000;

  server.listen(port, '127.0.0.1', function () {
    var addr = server.address();

    console.log('piccolo server is ready');
    console.log('listening on ' + addr.address + ':' + addr.port);
    console.log('running in ' + mode);
  });
});
