const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080,
  routes: {
    cors: true,
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  },
  router: {
    stripTrailingSlash: true
  }
});

server.register(Inert, ()=>{})
server.register(require('./redirect-route'));

/// api route
server.route({
  method: ['GET'],
  path: '/api/data',
  config: {
    handler: function(request, reply) {
      return reply({data:1}).status(201)
    }
  }
})

server.start(err => {
  console.log("Server started at: ", server.info.uri)
})
