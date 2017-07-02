exports.register= (server, options, next) => {
  server.route([{
    method: 'GET', 
    path: '/{params*}',
    handler: {
      directory: {
        path: '.', 
        redirectToSlash: true, 
        listing: false,
        index: true,
      }
    }
  }])
  server.ext('onPostHandler', (req, res) => {
    const response = req.response;
    if (response.isBoom && response.output.statusCode >=404) {
      return res.file('index.html');
    }
    return res.continue();
  })
  next();
}

exports.register.attributes = {
  name: 'static-route', 
  version: '1.0.0'
}
