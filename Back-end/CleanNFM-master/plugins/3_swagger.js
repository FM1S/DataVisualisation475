const fp = require("fastify-plugin");
module.exports = fp(function (fastify, opts, next) {
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/api-docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: fastify.config.title,
        description: fastify.config.description,
        version: fastify.config.version,
      },
      host: fastify.config.web_host + ":" + fastify.config.web_port,
      schemes: [fastify.config.web_scheme],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'code', description: 'Code related end-points' }
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        },
      }
    }
  });
  next();
});
