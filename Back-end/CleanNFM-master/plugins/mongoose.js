const fp = require("fastify-plugin");
const Mongoose = require("mongoose");
const path = require('path');

module.exports = fp(function (fastify, opts, next) {
    Mongoose.set("useFindAndModify", false);
    Mongoose.connect(fastify.config.mongo_connection_string, {
        keepAlive: 1,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        fastify.decorate('mongo', {
            db: Mongoose.connection,
            Types: Mongoose.Types,
            ObjectId: Mongoose.Types.ObjectId,
        });
        fastify.addHook('onClose', function (fastify, done) {
            fastify.mongo.db.close(done)
        });
        require("glob").sync(path.join(__dirname, '..', 'models') + "/**/*.js").forEach((file) => require(path.resolve(file)));
        next();
    });
});